import * as vscode from 'vscode';
import * as path from 'path';
import { YamlConfigLoader } from '../../../../src/services/config/YamlConfigLoader';

// Mock vscode
jest.mock('vscode');

describe('YamlConfigLoader', () => {
    let loader: YamlConfigLoader;
    let mockWorkspaceRoot: string;

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();

        // Setup mock workspace root
        mockWorkspaceRoot = '/test/workspace';

        // Get fresh instance
        loader = YamlConfigLoader.getInstance();
        loader.clearCache(); // Ensure clean state

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

    describe('getInstance', () => {
        it('should return singleton instance', () => {
            const instance1 = YamlConfigLoader.getInstance();
            const instance2 = YamlConfigLoader.getInstance();

            expect(instance1).toBe(instance2);
            expect(instance1).toBeDefined();
        });
    });

    describe('loadAll', () => {
        it('should load valid YAMLs correctly', async () => {
            // Given: workspace com 3 YAMLs válidos
            const configDir = path.join(mockWorkspaceRoot, '.prisma/configuracoes/prisma');

            // Mock directory exists
            (vscode.workspace.fs.stat as jest.Mock).mockResolvedValue({ type: vscode.FileType.Directory });

            // Mock YAML file reads
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    return Promise.resolve(Buffer.from(`paths:
  agents: .custom/agents
  prompts: .custom/prompts
  commands: .custom/commands
  templates: .custom/templates
  specs: .custom/specs
  steering: .custom/steering
  settings: .custom/settings`, 'utf8'));
                } else if (filePath.includes('integracoes.yaml')) {
                    return Promise.resolve(Buffer.from(`claude:
  invocationMode: cli
  cliPath: claude
  terminal:
    activationDelay: 800`, 'utf8'));
                } else if (filePath.includes('qualidade.yaml')) {
                    return Promise.resolve(Buffer.from(`validation:
  enabled: true
  strictMode: false
  logLevel: warn
  showNotifications: true`, 'utf8'));
                }
                return Promise.reject(new Error('File not found'));
            });

            // When: loadAll()
            const configs = await loader.loadAll(mockWorkspaceRoot);

            // Then: configs corretas
            expect(configs).not.toBeNull();
            expect(configs?.paths).toBeDefined();
            expect(configs?.paths.agents).toBe('.custom/agents');
            expect(configs?.integrations.invocationMode).toBe('cli');
            expect(configs?.quality.enabled).toBe(true);
        });

        it('should create defaults if directory does not exist', async () => {
            // Given: Diretório não existe
            (vscode.workspace.fs.stat as jest.Mock).mockRejectedValue(new Error('Directory not found'));

            // Mock createDirectory and writeFile
            const createDirMock = vscode.workspace.fs.createDirectory as jest.Mock;
            const writeFileMock = vscode.workspace.fs.writeFile as jest.Mock;

            // Mock subsequent stat calls to simulate files being created
            let callCount = 0;
            (vscode.workspace.fs.stat as jest.Mock).mockImplementation(() => {
                callCount++;
                if (callCount === 1) {
                    // First call - directory doesn't exist
                    return Promise.reject(new Error('Not found'));
                }
                // After creation - directory exists
                return Promise.resolve({ type: vscode.FileType.Directory });
            });

            // Mock readFile to return defaults after creation
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    return Promise.resolve(Buffer.from(`paths:
  agents: .claude/agents/prisma
  prompts: .claude/system-prompts
  commands: .claude/commands/prisma
  templates: .claude/templates
  specs: .prisma/projeto/especificacoes
  steering: .claude/steering
  settings: .claude/settings`, 'utf8'));
                } else if (filePath.includes('integracoes.yaml')) {
                    return Promise.resolve(Buffer.from(`claude:
  invocationMode: cli
  cliPath: claude
  terminal:
    activationDelay: 800`, 'utf8'));
                } else if (filePath.includes('qualidade.yaml')) {
                    return Promise.resolve(Buffer.from(`validation:
  enabled: true
  strictMode: false
  logLevel: warn
  showNotifications: true`, 'utf8'));
                }
                return Promise.reject(new Error('File not found'));
            });

            // When: loadAll()
            const configs = await loader.loadAll(mockWorkspaceRoot);

            // Then: 3 YAMLs criados
            expect(createDirMock).toHaveBeenCalled();
            expect(writeFileMock).toHaveBeenCalledTimes(3); // 3 YAML files
            expect(configs).not.toBeNull();
            expect(configs?.paths.agents).toBe('.claude/agents/prisma');
        });

        it('should return null if YAML parsing fails', async () => {
            // Given: YAML com sintaxe inválida
            (vscode.workspace.fs.stat as jest.Mock).mockResolvedValue({ type: vscode.FileType.Directory });
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    // Invalid YAML syntax
                    return Promise.resolve(Buffer.from(`paths:
  agents: [unclosed array
  prompts: .claude/prompts`, 'utf8'));
                }
                return Promise.resolve(Buffer.from('invalid: yaml: syntax:', 'utf8'));
            });

            // Spy on console.error
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            // When: loadAll()
            const configs = await loader.loadAll(mockWorkspaceRoot);

            // Then: null (não crashar)
            expect(configs).toBeNull();
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('[YamlConfigLoader] Failed to load YAMLs'),
                expect.anything()
            );

            consoleErrorSpy.mockRestore();
        });

        it('should use cache on second call', async () => {
            // Given: Primeira chamada carregou YAMLs
            (vscode.workspace.fs.stat as jest.Mock).mockResolvedValue({ type: vscode.FileType.Directory });
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    return Promise.resolve(Buffer.from(`paths:
  agents: .custom/agents
  prompts: .custom/prompts
  commands: .custom/commands
  templates: .custom/templates
  specs: .custom/specs
  steering: .custom/steering
  settings: .custom/settings`, 'utf8'));
                } else if (filePath.includes('integracoes.yaml')) {
                    return Promise.resolve(Buffer.from(`claude:
  invocationMode: cli
  cliPath: claude`, 'utf8'));
                } else if (filePath.includes('qualidade.yaml')) {
                    return Promise.resolve(Buffer.from(`validation:
  enabled: true
  strictMode: false
  logLevel: warn
  showNotifications: true`, 'utf8'));
                }
                return Promise.reject(new Error('File not found'));
            });

            const readFileMock = vscode.workspace.fs.readFile as jest.Mock;

            // First call
            await loader.loadAll(mockWorkspaceRoot);
            const firstCallCount = readFileMock.mock.calls.length;

            // When: Segunda chamada loadAll()
            await loader.loadAll(mockWorkspaceRoot);
            const secondCallCount = readFileMock.mock.calls.length;

            // Then: Não lê disco (cache hit)
            expect(secondCallCount).toBe(firstCallCount);
        });

        it('should handle missing optional fields with defaults', async () => {
            // Given: YAML without optional fields
            (vscode.workspace.fs.stat as jest.Mock).mockResolvedValue({ type: vscode.FileType.Directory });
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    return Promise.resolve(Buffer.from(`paths:
  agents: .custom/agents
  prompts: .custom/prompts
  commands: .custom/commands
  templates: .custom/templates
  specs: .custom/specs
  steering: .custom/steering
  settings: .custom/settings`, 'utf8'));
                } else if (filePath.includes('integracoes.yaml')) {
                    // Missing terminal field
                    return Promise.resolve(Buffer.from(`claude:
  invocationMode: cli
  cliPath: claude`, 'utf8'));
                } else if (filePath.includes('qualidade.yaml')) {
                    return Promise.resolve(Buffer.from(`validation:
  enabled: true`, 'utf8'));
                }
                return Promise.reject(new Error('File not found'));
            });

            // When
            const configs = await loader.loadAll(mockWorkspaceRoot);

            // Then: Defaults are used
            expect(configs).not.toBeNull();
            expect(configs?.integrations.terminal).toBeDefined();
            expect(configs?.integrations.terminal?.activationDelay).toBe(800); // Default
            expect(configs?.quality.strictMode).toBe(false); // Default
        });
    });

    describe('clearCache', () => {
        it('should invalidate cache', async () => {
            // Given: Cache populado
            (vscode.workspace.fs.stat as jest.Mock).mockResolvedValue({ type: vscode.FileType.Directory });
            (vscode.workspace.fs.readFile as jest.Mock).mockImplementation((uri: any) => {
                const filePath = uri.fsPath;
                if (filePath.includes('caminhos.yaml')) {
                    return Promise.resolve(Buffer.from(`paths:
  agents: .custom/agents
  prompts: .custom/prompts
  commands: .custom/commands
  templates: .custom/templates
  specs: .custom/specs
  steering: .custom/steering
  settings: .custom/settings`, 'utf8'));
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

            const readFileMock = vscode.workspace.fs.readFile as jest.Mock;

            // First call populates cache
            await loader.loadAll(mockWorkspaceRoot);
            const firstCallCount = readFileMock.mock.calls.length;

            // When: clearCache()
            loader.clearCache();

            // Próxima chamada lê disco novamente
            await loader.loadAll(mockWorkspaceRoot);
            const afterClearCallCount = readFileMock.mock.calls.length;

            // Then: Files were read again
            expect(afterClearCallCount).toBeGreaterThan(firstCallCount);
        });
    });
});
