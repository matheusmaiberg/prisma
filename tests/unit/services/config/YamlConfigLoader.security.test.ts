import * as vscode from 'vscode';
import * as path from 'path';
import { YamlConfigLoader } from '../../../../src/services/config/YamlConfigLoader';

// Mock vscode
jest.mock('vscode');

/**
 * Security Tests for YamlConfigLoader (ADR-001)
 *
 * These tests validate path traversal protection and path sanitization
 * as per security requirements RS001-RS003.
 */
describe('YamlConfigLoader - Security (ADR-001)', () => {
    let loader: YamlConfigLoader;
    let mockWorkspaceRoot: string;

    beforeEach(() => {
        jest.clearAllMocks();

        mockWorkspaceRoot = '/home/user/workspace';
        loader = YamlConfigLoader.getInstance();
        loader.clearCache();

        // Mock vscode.Uri
        (vscode.Uri as any) = {
            file: jest.fn((path) => ({ fsPath: path }))
        };

        // Mock vscode.workspace.fs
        (vscode.workspace as any) = {
            fs: {
                stat: jest.fn(),
                readFile: jest.fn(),
                createDirectory: jest.fn().mockResolvedValue(undefined),
                writeFile: jest.fn().mockResolvedValue(undefined)
            }
        };
    });

    afterEach(() => {
        loader.clearCache();
        jest.restoreAllMocks();
    });

    describe('validatePath', () => {
        it('should reject path traversal attacks with ../', () => {
            // Given: Path traversal attempts usando ../
            const maliciousPaths = [
                '../../../etc/passwd',
                '../../.ssh/id_rsa',
                '../sensitive/config',
                'valid/../../etc/passwd',
                './../../../root/.bashrc'
            ];

            maliciousPaths.forEach(maliciousPath => {
                // When: validatePath
                const isValid = (loader as any).validatePath(maliciousPath, mockWorkspaceRoot);

                // Then: Rejeita path traversal
                expect(isValid).toBe(false);
            });
        });

        it('should reject path traversal attacks with ..\\', () => {
            // Given: Path traversal attempts usando ..\\ (Windows)
            const maliciousPaths = [
                '..\\..\\..\\Windows\\System32',
                '..\\..\\..\\etc\\passwd',
                'folder\\..\\..\\sensitive',
                '..\\sensitive\\config'
            ];

            maliciousPaths.forEach(maliciousPath => {
                // When: validatePath
                const isValid = (loader as any).validatePath(maliciousPath, mockWorkspaceRoot);

                // Then: Rejeita path traversal
                expect(isValid).toBe(false);
            });
        });

        it('should reject Unix absolute paths', () => {
            // Given: Unix absolute paths
            const absolutePaths = [
                '/etc/passwd',
                '/home/user/.ssh/id_rsa',
                '/root/.bashrc',
                '/var/log/sensitive.log',
                '/tmp/malicious'
            ];

            absolutePaths.forEach(absolutePath => {
                // When: validatePath
                const isValid = (loader as any).validatePath(absolutePath, mockWorkspaceRoot);

                // Then: Rejeita absolute paths
                expect(isValid).toBe(false);
            });
        });

        it('should reject Windows absolute paths', () => {
            // Given: Windows absolute paths
            const absolutePaths = [
                'C:\\Windows\\System32',
                'D:\\secrets\\config.txt',
                'C:\\Users\\Admin\\passwords.txt',
                'E:\\sensitive\\data',
                'C:\\Program Files\\config'
            ];

            absolutePaths.forEach(absolutePath => {
                // When: validatePath
                const isValid = (loader as any).validatePath(absolutePath, mockWorkspaceRoot);

                // Then: Rejeita absolute paths
                expect(isValid).toBe(false);
            });
        });

        it('should accept valid relative paths', () => {
            // Given: Valid relative paths
            const validPaths = [
                '.claude/agents',
                'src/config',
                './relative/path',
                '.custom/settings',
                'folder/subfolder/file'
            ];

            validPaths.forEach(validPath => {
                // When: validatePath
                const isValid = (loader as any).validatePath(validPath, mockWorkspaceRoot);

                // Then: Aceita paths válidos
                expect(isValid).toBe(true);
            });
        });

        it('should accept paths with dots in names (not traversal)', () => {
            // Given: Paths com dots mas não traversal
            const validPaths = [
                '.claude/agents',
                'folder/.hidden',
                '.config/settings',
                'path/to/.dotfile'
            ];

            validPaths.forEach(validPath => {
                // When: validatePath
                const isValid = (loader as any).validatePath(validPath, mockWorkspaceRoot);

                // Then: Aceita (dots no nome do arquivo, não path traversal)
                expect(isValid).toBe(true);
            });
        });

        it('should handle edge cases', () => {
            // Test edge cases
            expect((loader as any).validatePath('', mockWorkspaceRoot)).toBe(true); // Empty path
            expect((loader as any).validatePath('.', mockWorkspaceRoot)).toBe(true); // Current dir
            expect((loader as any).validatePath('..', mockWorkspaceRoot)).toBe(false); // Parent dir
        });
    });

    describe('sanitizeConfigs', () => {
        it('should replace invalid paths with defaults', async () => {
            // Given: Configs com paths maliciosos
            const configs = {
                paths: {
                    agents: '../../../etc/passwd',       // Path traversal - INVALID
                    prompts: '.claude/prompts',          // Valid
                    commands: '/etc/secrets',            // Absolute - INVALID
                    templates: '.claude/templates',      // Valid
                    specs: 'C:\\Windows\\System32',      // Absolute Windows - INVALID
                    steering: '.custom/steering',        // Valid
                    settings: '../../sensitive/config'   // Path traversal - INVALID
                }
            };

            // When: sanitizeConfigs
            const sanitized = (loader as any).sanitizeConfigs(configs, mockWorkspaceRoot);

            // Then: Invalid paths replaced with defaults
            expect(sanitized.paths.agents).not.toBe('../../../etc/passwd');
            expect(sanitized.paths.agents).toBe('.claude/agents/prisma'); // Default

            expect(sanitized.paths.prompts).toBe('.claude/prompts'); // Preserved (valid)

            expect(sanitized.paths.commands).not.toBe('/etc/secrets');
            expect(sanitized.paths.commands).toBe('.claude/commands/prisma'); // Default

            expect(sanitized.paths.templates).toBe('.claude/templates'); // Preserved (valid)

            expect(sanitized.paths.specs).not.toBe('C:\\Windows\\System32');
            expect(sanitized.paths.specs).toBe('.prisma/projeto/especificacoes'); // Default

            expect(sanitized.paths.steering).toBe('.custom/steering'); // Preserved (valid)

            expect(sanitized.paths.settings).not.toBe('../../sensitive/config');
            expect(sanitized.paths.settings).toBe('.claude/settings'); // Default
        });

        it('should log warnings for invalid paths', () => {
            // Given: Spy on console.warn
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const configs = {
                paths: {
                    agents: '../../../etc/passwd',  // INVALID
                    prompts: '.claude/prompts',
                    commands: '.claude/commands',
                    templates: '.claude/templates',
                    specs: '/etc/secrets',          // INVALID
                    steering: '.claude/steering',
                    settings: '.claude/settings'
                },
                integrations: {},
                quality: {}
            };

            // When: sanitizeConfigs
            (loader as any).sanitizeConfigs(configs, mockWorkspaceRoot);

            // Then: Warnings logged
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining("Invalid path 'agents'")
            );
            expect(consoleWarnSpy).toHaveBeenCalledWith(
                expect.stringContaining("Invalid path 'specs'")
            );

            consoleWarnSpy.mockRestore();
        });

        it('should preserve valid paths unchanged', () => {
            // Given: All valid paths
            const configs = {
                paths: {
                    agents: '.custom/agents',
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                },
                integrations: {},
                quality: {}
            };

            // When: sanitizeConfigs
            const sanitized = (loader as any).sanitizeConfigs(configs, mockWorkspaceRoot);

            // Then: All paths preserved
            expect(sanitized.paths.agents).toBe('.custom/agents');
            expect(sanitized.paths.prompts).toBe('.custom/prompts');
            expect(sanitized.paths.commands).toBe('.custom/commands');
            expect(sanitized.paths.templates).toBe('.custom/templates');
            expect(sanitized.paths.specs).toBe('.custom/specs');
            expect(sanitized.paths.steering).toBe('.custom/steering');
            expect(sanitized.paths.settings).toBe('.custom/settings');
        });

        it('should not log warnings for valid paths', () => {
            // Given: Spy on console.warn
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

            const configs = {
                paths: {
                    agents: '.custom/agents',
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                },
                integrations: {},
                quality: {}
            };

            // When: sanitizeConfigs
            (loader as any).sanitizeConfigs(configs, mockWorkspaceRoot);

            // Then: No warnings
            expect(consoleWarnSpy).not.toHaveBeenCalled();

            consoleWarnSpy.mockRestore();
        });
    });

    describe('loadAll integration with sanitization', () => {
        it('should sanitize malicious paths from YAML before returning', async () => {
            // Given: YAML with malicious paths
            (vscode.workspace.fs.stat as jest.Mock).mockResolvedValue({ type: vscode.FileType.Directory });
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    return Promise.resolve(Buffer.from(`paths:
  agents: ../../../etc/passwd
  prompts: /etc/secrets
  commands: .claude/commands
  templates: C:\\Windows\\System32
  specs: .custom/specs
  steering: ../../sensitive
  settings: .claude/settings`, 'utf8'));
                } else if (filePath.includes('integracoes.yaml')) {
                    return Promise.resolve(Buffer.from(`claude:
  invocationMode: cli
  cliPath: claude`, 'utf8'));
                } else if (filePath.includes('qualidade.yaml')) {
                    return Promise.resolve(Buffer.from(`validation:
  enabled: true`, 'utf8'));
                }
                return Promise.reject(new Error('File not found'));
            });

            // Spy on console.warn
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

            // When: loadAll
            const configs = await loader.loadAll(mockWorkspaceRoot);

            // Then: Malicious paths replaced with defaults
            expect(configs).not.toBeNull();
            expect(configs?.paths.agents).toBe('.claude/agents/prisma'); // Not ../../../etc/passwd
            expect(configs?.paths.prompts).toBe('.claude/system-prompts'); // Not /etc/secrets
            expect(configs?.paths.commands).toBe('.claude/commands'); // Preserved
            expect(configs?.paths.templates).toBe('.claude/templates'); // Not C:\Windows\System32
            expect(configs?.paths.specs).toBe('.custom/specs'); // Preserved
            expect(configs?.paths.steering).toBe('.claude/steering'); // Not ../../sensitive
            expect(configs?.paths.settings).toBe('.claude/settings'); // Preserved

            // Should have logged warnings
            expect(consoleWarnSpy.mock.calls.length).toBeGreaterThan(0);

            consoleWarnSpy.mockRestore();
        });
    });
});
