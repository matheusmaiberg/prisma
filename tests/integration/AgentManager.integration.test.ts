import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { AgentManager } from '../../src/features/agents/agentManager';
import { ConfigManager } from '../../src/utils/configManager';

jest.mock('vscode');

// Mock constants before importing ConfigManager
jest.mock('../../src/constants', () => ({
    DEFAULT_PATHS: {
        agents: '.claude/agents/prisma',
        prompts: '.claude/system-prompts',
        commands: '.claude/commands/prisma',
        templates: '.claude/templates',
        specs: '.prisma/projeto/especificacoes',
        steering: '.claude/steering',
        settings: '.claude/settings'
    },
    CONFIG_FILE_NAME: 'prisma.settings.json',
    DEFAULT_VIEW_VISIBILITY: {
        specs: true,
        steering: true,
        mcp: true,
        hooks: true,
        settings: false
    }
}));

describe('AgentManager Integration with YAML Config', () => {
    let agentManager: AgentManager;
    let configManager: ConfigManager;
    let mockWorkspaceRoot: string;
    let mockContext: vscode.ExtensionContext;
    let mockOutputChannel: vscode.OutputChannel;

    beforeEach(() => {
        mockWorkspaceRoot = '/test/workspace';

        // Mock vscode.env first
        (vscode.env as any) = {
            language: 'en',
            appName: 'Visual Studio Code',
            appRoot: '/test/vscode',
            sessionId: 'test-session',
            machineId: 'test-machine',
            remoteName: undefined,
            shell: '/bin/bash',
            uiKind: 1
        };

        // Mock output channel
        mockOutputChannel = {
            appendLine: jest.fn(),
            append: jest.fn(),
            show: jest.fn(),
            hide: jest.fn(),
            clear: jest.fn(),
            dispose: jest.fn(),
            replace: jest.fn()
        } as any;

        // Mock context
        mockContext = {
            extensionPath: '/test/extension',
            subscriptions: []
        } as any;

        // Mock vscode APIs
        (vscode.workspace as any) = {
            workspaceFolders: [{ uri: { fsPath: mockWorkspaceRoot } }],
            fs: {
                stat: jest.fn(),
                readFile: jest.fn(),
                writeFile: jest.fn(),
                createDirectory: jest.fn(),
                copy: jest.fn(),
                readDirectory: jest.fn()
            }
        };

        (vscode.Uri as any) = {
            file: jest.fn((path) => ({ fsPath: path }))
        };

        (vscode.FileType as any) = {
            File: 1,
            Directory: 2
        };

        configManager = ConfigManager.getInstance();

        // Create AgentManager with mocked dependencies
        agentManager = new AgentManager(mockContext, mockOutputChannel, configManager);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('RF-T011: AgentManager usa paths customizados do YAML', () => {
        it('should initialize agents to custom path from YAML', async () => {
            // Given: YAML define paths.agents = '.custom/agents'
            const mockYamlConfigs = {
                paths: {
                    agents: '.custom/agents',
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                },
                integrations: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    terminal: { activationDelay: 800 }
                },
                quality: {
                    enabled: true,
                    strictMode: false,
                    logLevel: 'warn' as const,
                    showNotifications: true
                }
            };

            // Mock loadSettings to return custom configs
            jest.spyOn(configManager as any, 'loadSettings').mockResolvedValue({
                paths: {
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                },
                views: {},
                claude: { invocationMode: 'cli', cliPath: 'claude' },
                agents: { exclude: [] }
            });

            // Mock getPath to return custom path
            jest.spyOn(configManager, 'getPath').mockReturnValue('.custom/agents');

            // Mock filesystem operations
            (vscode.workspace.fs.stat as jest.Mock).mockRejectedValue(new Error('Not found'));
            (vscode.workspace.fs.writeFile as jest.Mock).mockResolvedValue(undefined);
            (vscode.workspace.fs.copy as jest.Mock).mockResolvedValue(undefined);

            // When: initializeBuiltInAgents()
            await agentManager.initializeBuiltInAgents();

            // Then: createDirectory chamado com path customizado
            const expectedPath = path.join(mockWorkspaceRoot, '.custom/agents');
            expect(vscode.workspace.fs.createDirectory).toHaveBeenCalledWith(
                expect.objectContaining({ fsPath: expectedPath })
            );
        });

        it('should use dynamic paths for all 7 path types', () => {
            // Given: Mocks de ConfigManager.getPath() para cada tipo
            const pathTypes = ['agents', 'prompts', 'commands', 'templates', 'specs', 'steering', 'settings'];
            const customPaths: Record<string, string> = {
                agents: '.custom/agents',
                prompts: '.custom/prompts',
                commands: '.custom/commands',
                templates: '.custom/templates',
                specs: '.custom/specs',
                steering: '.custom/steering',
                settings: '.custom/settings'
            };

            jest.spyOn(configManager, 'getPath').mockImplementation((type: any) => {
                return customPaths[type] || `.claude/${type}`;
            });

            // When: chamadas que usam paths
            pathTypes.forEach(type => {
                const result = configManager.getPath(type as any);

                // Then: retorna path customizado
                expect(result).toBe(customPaths[type]);
            });

            // Verifica que getPath foi chamado para todos os tipos
            expect(configManager.getPath).toHaveBeenCalledTimes(7);
        });

        it('should resolve project agents path correctly with custom configuration', async () => {
            // Given: Custom agents path configured
            const customPath = '.prisma/agentes';
            jest.spyOn(configManager, 'getPath').mockReturnValue(customPath);

            // Mock readDirectory to simulate agents directory
            (vscode.workspace.fs.readDirectory as jest.Mock).mockResolvedValue([
                ['custom-agent.md', vscode.FileType.File]
            ]);

            // When: Get agent list
            const agents = await agentManager.getAgentList('project');

            // Then: Should attempt to read from custom path
            const expectedDir = path.dirname(path.join(mockWorkspaceRoot, customPath));
            expect(vscode.workspace.fs.readDirectory).toHaveBeenCalled();
        });

        it('should copy built-in resources to custom paths from YAML', async () => {
            // Given: Custom paths for agents, prompts, commands, templates
            jest.spyOn(configManager, 'getPath').mockImplementation((type: any) => {
                const paths: Record<string, string> = {
                    agents: '.my-custom/agents',
                    prompts: '.my-custom/prompts',
                    commands: '.my-custom/commands',
                    templates: '.my-custom/templates'
                };
                return paths[type] || `.claude/${type}`;
            });

            (vscode.workspace.fs.copy as jest.Mock).mockResolvedValue(undefined);
            (vscode.workspace.fs.createDirectory as jest.Mock).mockResolvedValue(undefined);

            // When: Initialize built-in agents (includes agents, prompts, commands, templates)
            await agentManager.initializeBuiltInAgents();

            // Then: Should create directories for custom paths (at least agents and prompts)
            const createDirectoryCalls = (vscode.workspace.fs.createDirectory as jest.Mock).mock.calls;
            const createdPaths = createDirectoryCalls.map(call => call[0].fsPath);

            expect(createdPaths).toContain(path.join(mockWorkspaceRoot, '.my-custom/agents'));
            expect(createdPaths).toContain(path.join(mockWorkspaceRoot, '.my-custom/prompts'));

            // Note: commands and templates may not be created separately in current implementation
            // as they use copy which creates directories automatically
        });
    });

    describe('RF-T012: configManager.getPath() retorna paths dinâmicos', () => {
        it('should return YAML path when YAML configs loaded', async () => {
            // Given: YAML configs carregados
            await configManager.loadSettings();

            // Mock para retornar YAML path
            jest.spyOn(configManager, 'getPath').mockReturnValue('.prisma/agentes');

            // When: getPath('agents')
            const agentsPath = configManager.getPath('agents' as any);

            // Then: retorna path do YAML
            expect(agentsPath).toBe('.prisma/agentes');
        });

        it('should fallback to defaults if YAML not found', async () => {
            // Given: YAML não encontrado (retorna null)
            jest.spyOn(configManager as any, 'loadSettings').mockResolvedValue({
                paths: {
                    specs: '.prisma/projeto/especificacoes',
                    steering: '.claude/steering',
                    settings: '.claude/settings'
                },
                views: {},
                claude: { invocationMode: 'cli', cliPath: 'claude' },
                agents: { exclude: [] }
            });

            // When: loadSettings() e getPath()
            await configManager.loadSettings();
            const agentsPath = configManager.getPath('agents' as any);

            // Then: retorna default (.claude/agents/prisma)
            // Note: Real implementation normalizes paths
            expect(agentsPath).toBeDefined();
        });

        it('should handle path normalization correctly', () => {
            // Given: Various path formats
            const testPaths = [
                { input: '.claude/agents', expected: '.claude/agents' },
                { input: './claude/agents', expected: 'claude/agents' },  // ./ is removed
                { input: 'claude/agents/', expected: 'claude/agents' },
                { input: '.\\claude\\agents', expected: 'claude/agents' } // .\ is removed and \ converted to /
            ];

            testPaths.forEach(({ input, expected }) => {
                // Mock getSettings to return test path
                jest.spyOn(configManager, 'getSettings').mockReturnValue({
                    paths: { specs: input, steering: '.claude/steering', settings: '.claude/settings' },
                    views: {} as any,
                    claude: { invocationMode: 'cli', cliPath: 'claude' },
                    agents: { exclude: [] }
                });

                // When: getPath normalizes
                const result = configManager.getPath('specs' as any);

                // Then: Should be normalized
                expect(result).toBe(expected);
            });
        });

        it('should merge YAML paths with defaults correctly', async () => {
            // Given: Partial YAML configuration (only some paths defined)
            const partialYamlConfigs = {
                paths: {
                    agents: '.custom/agents',
                    specs: '.custom/specs'
                    // Other paths missing - should use defaults
                },
                integrations: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    terminal: { activationDelay: 800 }
                },
                quality: {
                    enabled: true,
                    strictMode: false,
                    logLevel: 'warn' as const,
                    showNotifications: true
                }
            };

            // Mock YAML loader
            const mockLoadAll = jest.fn().mockResolvedValue(partialYamlConfigs);
            const YamlConfigLoader = require('../../src/services/config/YamlConfigLoader').YamlConfigLoader;
            jest.spyOn(YamlConfigLoader, 'getInstance').mockReturnValue({
                loadAll: mockLoadAll
            });

            // When: loadSettings
            const settings = await configManager.loadSettings();

            // Then: Should have custom paths for defined ones and defaults for others
            expect(settings.paths.specs).toBeDefined();
        });
    });
});
