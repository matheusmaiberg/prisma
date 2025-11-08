import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import { ClaudeCodeProvider } from './providers/claudeCodeProvider';
import { SpecManager } from './features/spec/specManager';
import { SteeringManager } from './features/steering/steeringManager';
import { SpecExplorerProvider } from './providers/specExplorerProvider';
import { SteeringExplorerProvider } from './providers/steeringExplorerProvider';
import { HooksExplorerProvider } from './providers/hooksExplorerProvider';
import { MCPExplorerProvider } from './providers/mcpExplorerProvider';
import { OverviewProvider } from './providers/overviewProvider';
import { AgentsExplorerProvider } from './providers/agentsExplorerProvider';
import { AgentManager } from './features/agents/agentManager';
import { ConfigManager } from './utils/configManager';
import { CONFIG_FILE_NAME, VSC_CONFIG_NAMESPACE, CLAUDE_DIR, CLAUDE_SETTINGS_DIR, CLAUDE_CONFIG_FILE, DEFAULT_CONFIG } from './constants';
import { PromptLoader } from './services/promptLoader';
import { UpdateChecker } from './utils/updateChecker';
import { PermissionManager } from './features/permission/permissionManager';
import { NotificationUtils } from './utils/notificationUtils';
import { SpecTaskCodeLensProvider } from './providers/specTaskCodeLensProvider';
import { getTranslations } from './i18n/translations';
import { SetupManager } from './features/setup/setupManager';

let claudeCodeProvider: ClaudeCodeProvider;
let specManager: SpecManager;
let steeringManager: SteeringManager;
let permissionManager: PermissionManager;
let agentManager: AgentManager;
let setupManager: SetupManager;
export let outputChannel: vscode.OutputChannel;

// 导出 getter 函数供其他模块使用
export function getPermissionManager(): PermissionManager {
    return permissionManager;
}

export async function activate(context: vscode.ExtensionContext) {
    // Create output channel for debugging
    outputChannel = vscode.window.createOutputChannel('Prisma for Claude Code - Debug');

    // Initialize PromptLoader
    try {
        const promptLoader = PromptLoader.getInstance();
        promptLoader.initialize();
        outputChannel.appendLine('PromptLoader initialized successfully');
    } catch (error) {
        outputChannel.appendLine(`Failed to initialize PromptLoader: ${error}`);
        vscode.window.showErrorMessage(`Failed to initialize prompt system: ${error}`);
    }

    // 检查工作区状态
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        outputChannel.appendLine('WARNING: No workspace folder found!');
        return; // Cannot proceed without workspace
    }

    // Initialize Prisma workspace structure
    setupManager = new SetupManager(outputChannel);
    if (!setupManager.isInitialized()) {
        outputChannel.appendLine('[Setup] .prisma not found, initializing...');
        try {
            await setupManager.initialize();
        } catch (error) {
            outputChannel.appendLine(`[Setup] Failed to initialize: ${error}`);
            // Continue anyway - user can manually initialize later
        }
    } else {
        outputChannel.appendLine('[Setup] ✅ .prisma already initialized');
    }

    // Initialize Claude Code SDK provider with output channel
    claudeCodeProvider = new ClaudeCodeProvider(context, outputChannel);

    // 创建并初始化 PermissionManager
    permissionManager = new PermissionManager(context, outputChannel);

    // 初始化权限系统（包含重试逻辑）
    await permissionManager.initializePermissions();

    // Initialize feature managers with output channel
    specManager = new SpecManager(claudeCodeProvider, outputChannel);
    steeringManager = new SteeringManager(claudeCodeProvider, outputChannel);

    // Get config manager instance
    const configManager = ConfigManager.getInstance();
    await configManager.loadSettings();

    // Initialize Agent Manager and agents
    agentManager = new AgentManager(context, outputChannel, configManager);
    await agentManager.initializeBuiltInAgents();

    // Register tree data providers
    const overviewProvider = new OverviewProvider(context);
    const specExplorer = new SpecExplorerProvider(context, outputChannel);
    const steeringExplorer = new SteeringExplorerProvider(context);
    const hooksExplorer = new HooksExplorerProvider(context);
    const mcpExplorer = new MCPExplorerProvider(context, outputChannel);
    const agentsExplorer = new AgentsExplorerProvider(context, agentManager, outputChannel);

    // Set managers
    specExplorer.setSpecManager(specManager);
    steeringExplorer.setSteeringManager(steeringManager);

    context.subscriptions.push(
        vscode.window.registerTreeDataProvider('prisma.views.overview', overviewProvider),
        vscode.window.registerTreeDataProvider('prisma.views.specExplorer', specExplorer),
        vscode.window.registerTreeDataProvider('prisma.views.agentsExplorer', agentsExplorer),
        vscode.window.registerTreeDataProvider('prisma.views.steeringExplorer', steeringExplorer),
        vscode.window.registerTreeDataProvider('prisma.views.hooksStatus', hooksExplorer),
        vscode.window.registerTreeDataProvider('prisma.views.mcpServerStatus', mcpExplorer)
    );

    // Initialize update checker
    const updateChecker = new UpdateChecker(context, outputChannel);

    // Register commands
    registerCommands(context, specExplorer, steeringExplorer, hooksExplorer, mcpExplorer, agentsExplorer, updateChecker);

    // Initialize default settings file if not exists
    await initializeDefaultSettings();

    // Set up file watchers
    setupFileWatchers(context, specExplorer, steeringExplorer, hooksExplorer, mcpExplorer, agentsExplorer);

    // Check for updates on startup
    updateChecker.checkForUpdates();
    outputChannel.appendLine('Update check initiated');

    const specTaskCodeLensProvider = new SpecTaskCodeLensProvider();

    let specDir = DEFAULT_CONFIG.paths.specs;
    try {
        const configuredSpecDir = configManager.getPath('specs');
        specDir = configuredSpecDir || specDir;
    } catch (error) {
        outputChannel.appendLine(`Failed to load settings for spec CodeLens: ${error}`);
    }

    // // Register CodeLens provider for spec tasks once settings are ready
    // const specTaskCodeLensProvider = new SpecTaskCodeLensProvider();

    const normalizedSpecDir = specDir.replace(/\\/g, '/');

    // 使用更明确的文档选择器
    const selector: vscode.DocumentSelector = [
        {
            language: 'markdown',
            pattern: `**/${normalizedSpecDir}/*/tasks.md`,
            scheme: 'file'
        }
    ];

    const disposable = vscode.languages.registerCodeLensProvider(
        selector,
        specTaskCodeLensProvider
    );

    context.subscriptions.push(disposable);

    outputChannel.appendLine('CodeLens provider for spec tasks registered');
}

async function initializeDefaultSettings() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        return;
    }

    // Create .claude/settings directory if it doesn't exist
    const claudeDir = vscode.Uri.joinPath(workspaceFolder.uri, CLAUDE_DIR);
    const settingsDir = vscode.Uri.joinPath(claudeDir, CLAUDE_SETTINGS_DIR);

    try {
        await vscode.workspace.fs.createDirectory(claudeDir);
        await vscode.workspace.fs.createDirectory(settingsDir);
    } catch (error) {
        // Directory might already exist
    }

    // Create prisma.settings.json if it doesn't exist
    const settingsFile = vscode.Uri.joinPath(settingsDir, CONFIG_FILE_NAME);

    try {
        // Check if file exists
        await vscode.workspace.fs.stat(settingsFile);
    } catch (error) {
        // File doesn't exist, create it with default settings
        const configManager = ConfigManager.getInstance();
        const defaultSettings = configManager.getSettings();

        await vscode.workspace.fs.writeFile(
            settingsFile,
            Buffer.from(JSON.stringify(defaultSettings, null, 2))
        );
    }
}

async function toggleViews() {
    const config = vscode.workspace.getConfiguration(VSC_CONFIG_NAMESPACE);
    const currentVisibility = {
        specs: config.get('views.specs.visible', true),
        hooks: config.get('views.hooks.visible', true),
        steering: config.get('views.steering.visible', true),
        mcp: config.get('views.mcp.visible', true)
    };

    const items = [
        {
            label: `$(${currentVisibility.specs ? 'check' : 'blank'}) Specs`,
            picked: currentVisibility.specs,
            id: 'specs'
        },
        {
            label: `$(${currentVisibility.hooks ? 'check' : 'blank'}) Agent Hooks`,
            picked: currentVisibility.hooks,
            id: 'hooks'
        },
        {
            label: `$(${currentVisibility.steering ? 'check' : 'blank'}) Agent Steering`,
            picked: currentVisibility.steering,
            id: 'steering'
        },
        {
            label: `$(${currentVisibility.mcp ? 'check' : 'blank'}) MCP Servers`,
            picked: currentVisibility.mcp,
            id: 'mcp'
        }
    ];

    const selected = await vscode.window.showQuickPick(items, {
        canPickMany: true,
        placeHolder: getTranslations().messages.selectViewsToShow
    });

    if (selected) {
        const newVisibility = {
            specs: selected.some(item => item.id === 'specs'),
            hooks: selected.some(item => item.id === 'hooks'),
            steering: selected.some(item => item.id === 'steering'),
            mcp: selected.some(item => item.id === 'mcp')
        };

        await config.update('views.specs.visible', newVisibility.specs, vscode.ConfigurationTarget.Workspace);
        await config.update('views.hooks.visible', newVisibility.hooks, vscode.ConfigurationTarget.Workspace);
        await config.update('views.steering.visible', newVisibility.steering, vscode.ConfigurationTarget.Workspace);
        await config.update('views.mcp.visible', newVisibility.mcp, vscode.ConfigurationTarget.Workspace);

        vscode.window.showInformationMessage('View visibility updated!');
    }
}


function registerCommands(context: vscode.ExtensionContext, specExplorer: SpecExplorerProvider, steeringExplorer: SteeringExplorerProvider, hooksExplorer: HooksExplorerProvider, mcpExplorer: MCPExplorerProvider, agentsExplorer: AgentsExplorerProvider, updateChecker: UpdateChecker) {

    // Permission commands
    context.subscriptions.push(
        vscode.commands.registerCommand('prisma.permission.reset', async () => {
            const confirm = await vscode.window.showWarningMessage(
                'Are you sure you want to reset Claude Code permissions? This will revoke the granted permissions.',
                'Yes', 'No'
            );

            if (confirm === 'Yes') {
                const success = await permissionManager.resetPermission();
                if (success) {
                    NotificationUtils.showAutoDismissNotification(
                        'Permissions have been reset'
                    );
                } else {
                    vscode.window.showErrorMessage('Failed to reset permissions. Please check the output log.');
                }
            }
        })
    );

    // Spec commands
    const createSpecCommand = vscode.commands.registerCommand('prisma.spec.create', async () => {
        outputChannel.appendLine('\n=== COMMAND prisma.spec.create TRIGGERED ===');
        outputChannel.appendLine(`Time: ${new Date().toLocaleTimeString()}`);

        try {
            await specManager.create();
        } catch (error) {
            outputChannel.appendLine(`Error in createNewSpec: ${error}`);
            vscode.window.showErrorMessage(`Failed to create spec: ${error}`);
        }
    });

    const createSpecWithAgentsCommand = vscode.commands.registerCommand('prisma.spec.createWithAgents', async () => {
        try {
            await specManager.createWithAgents();
        } catch (error) {
            outputChannel.appendLine(`Error in createWithAgents: ${error}`);
            vscode.window.showErrorMessage(`Failed to create spec with agents: ${error}`);
        }
    });

    context.subscriptions.push(createSpecCommand, createSpecWithAgentsCommand);

    context.subscriptions.push(
        vscode.commands.registerCommand('prisma.spec.navigate.requirements', async (specName: string) => {
            await specManager.navigateToDocument(specName, 'requirements');
        }),

        vscode.commands.registerCommand('prisma.spec.navigate.design', async (specName: string) => {
            await specManager.navigateToDocument(specName, 'design');
        }),

        vscode.commands.registerCommand('prisma.spec.navigate.tasks', async (specName: string) => {
            await specManager.navigateToDocument(specName, 'tasks');
        }),

        vscode.commands.registerCommand('prisma.spec.navigate.task', async (specName: string, filePath: string, lineNumber: number) => {
            // Open the tasks file and navigate to specific line
            try {
                const document = await vscode.workspace.openTextDocument(filePath);
                const editor = await vscode.window.showTextDocument(document);

                // Navigate to the specific line
                const position = new vscode.Position(lineNumber - 1, 0); // Line numbers are 0-based in VS Code
                editor.selection = new vscode.Selection(position, position);
                editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to open task: ${error}`);
            }
        }),

        vscode.commands.registerCommand('prisma.spec.implTask', async (documentUri: vscode.Uri, lineNumber: number, taskDescription: string) => {
            outputChannel.appendLine(`[Task Execute] Line ${lineNumber + 1}: ${taskDescription}`);

            // Execute task with Claude Code
            await specManager.implTask(documentUri.fsPath, taskDescription);
        }),
        vscode.commands.registerCommand('prisma.spec.refresh', async () => {
            outputChannel.appendLine('[Manual Refresh] Refreshing spec explorer...');
            specExplorer.refresh();
        })
    );

    // Steering commands
    context.subscriptions.push(
        vscode.commands.registerCommand('prisma.steering.create', async () => {
            await steeringManager.createCustom();
        }),

        vscode.commands.registerCommand('prisma.steering.generateInitial', async () => {
            await steeringManager.init();
        }),

        vscode.commands.registerCommand('prisma.steering.refine', async (item: any) => {
            // Item is always from tree view
            const uri = vscode.Uri.file(item.resourcePath);
            await steeringManager.refine(uri);
        }),

        vscode.commands.registerCommand('prisma.steering.delete', async (item: any) => {
            outputChannel.appendLine(`[Steering] Deleting: ${item.label}`);

            // Use SteeringManager to delete the document and update CLAUDE.md
            const result = await steeringManager.delete(item.label, item.resourcePath);

            if (!result.success && result.error) {
                vscode.window.showErrorMessage(result.error);
            }
        }),

        // CLAUDE.md commands
        vscode.commands.registerCommand('prisma.steering.createUserRule', async () => {
            await steeringManager.createUserClaudeMd();
        }),

        vscode.commands.registerCommand('prisma.steering.createProjectRule', async () => {
            await steeringManager.createProjectClaudeMd();
        }),

        vscode.commands.registerCommand('prisma.steering.refresh', async () => {
            outputChannel.appendLine('[Manual Refresh] Refreshing steering explorer...');
            steeringExplorer.refresh();
        }),

        // Agents commands
        vscode.commands.registerCommand('prisma.agents.refresh', async () => {
            outputChannel.appendLine('[Manual Refresh] Refreshing agents explorer...');
            agentsExplorer.refresh();
        })
    );

    // Add file save confirmation for agent files
    context.subscriptions.push(
        vscode.workspace.onWillSaveTextDocument(async (event) => {
            const document = event.document;
            const filePath = document.fileName;

            // Check if this is an agent file
            if (filePath.includes('.claude/agents/') && filePath.endsWith('.md')) {
                // Show confirmation dialog
                const result = await vscode.window.showWarningMessage(
                    'Are you sure you want to save changes to this agent file?',
                    { modal: true },
                    'Save',
                    'Cancel'
                );

                if (result !== 'Save') {
                    // Cancel the save operation by waiting forever
                    event.waitUntil(new Promise(() => { }));
                }
            }
        })
    );

    // Spec delete command
    context.subscriptions.push(
        vscode.commands.registerCommand('prisma.spec.delete', async (item: any) => {
            await specManager.delete(item.label);
        })
    );

    // Claude Code integration commands
    // (removed unused prisma.claude.implementTask command)

    // Hooks commands (only refresh for Claude Code hooks)
    context.subscriptions.push(
        vscode.commands.registerCommand('prisma.hooks.refresh', () => {
            hooksExplorer.refresh();
        }),

        vscode.commands.registerCommand('prisma.hooks.copyCommand', async (command: string) => {
            await vscode.env.clipboard.writeText(command);
        })
    );

    // MCP commands
    context.subscriptions.push(
        vscode.commands.registerCommand('prisma.mcp.refresh', () => {
            mcpExplorer.refresh();
        }),

        // Update checker command
        vscode.commands.registerCommand('prisma.checkForUpdates', async () => {
            outputChannel.appendLine('Manual update check requested');
            await updateChecker.checkForUpdates(true); // Force check
        }),

        // Setup command
        vscode.commands.registerCommand('prisma.setup.initialize', async () => {
            outputChannel.appendLine('[Setup] Manual initialization requested');
            try {
                await setupManager.initialize();
                vscode.window.showInformationMessage('Prisma workspace structure initialized successfully!');
            } catch (error) {
                outputChannel.appendLine(`[Setup] Failed: ${error}`);
                vscode.window.showErrorMessage(`Failed to initialize Prisma structure: ${error}`);
            }
        }),

        // Overview and settings commands
        vscode.commands.registerCommand('prisma.settings.open', async () => {
            outputChannel.appendLine('Opening Prisma settings...');

            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }

            // Create .claude/settings directory if it doesn't exist
            const claudeDir = vscode.Uri.joinPath(workspaceFolder.uri, CLAUDE_DIR);
            const settingsDir = vscode.Uri.joinPath(claudeDir, CLAUDE_SETTINGS_DIR);

            try {
                await vscode.workspace.fs.createDirectory(claudeDir);
                await vscode.workspace.fs.createDirectory(settingsDir);
            } catch (error) {
                // Directory might already exist
            }

            // Create or open prisma.settings.json
            const settingsFile = vscode.Uri.joinPath(settingsDir, CONFIG_FILE_NAME);

            try {
                // Check if file exists
                await vscode.workspace.fs.stat(settingsFile);
            } catch (error) {
                // File doesn't exist, create it with default settings
                const configManager = ConfigManager.getInstance();
                const defaultSettings = configManager.getSettings();

                await vscode.workspace.fs.writeFile(
                    settingsFile,
                    Buffer.from(JSON.stringify(defaultSettings, null, 2))
                );
            }

            // Open the settings file
            const document = await vscode.workspace.openTextDocument(settingsFile);
            await vscode.window.showTextDocument(document);
        }),

        vscode.commands.registerCommand('prisma.help.open', async () => {
            outputChannel.appendLine('Opening Prisma help...');
            const helpUrl = 'https://github.com/matheusmaiberg/prisma#readme';
            vscode.env.openExternal(vscode.Uri.parse(helpUrl));
        }),

        vscode.commands.registerCommand('prisma.menu.open', async () => {
            outputChannel.appendLine('Opening Prisma menu...');
            await toggleViews();
        }),

        // Permission debug commands
        vscode.commands.registerCommand('prisma.permission.check', async () => {
            // 使用新的 PermissionManager 检查真实的权限状态
            const hasPermission = await permissionManager.checkPermission();
            const configPath = path.join(os.homedir(), CLAUDE_CONFIG_FILE);

            vscode.window.showInformationMessage(
                `Claude Code Permission Status: ${hasPermission ? '✅ Granted' : '❌ Not Granted'}`
            );

            outputChannel.appendLine(`[Permission Check] Status: ${hasPermission}`);
            outputChannel.appendLine(`[Permission Check] Config file: ${configPath}`);
            outputChannel.appendLine(`[Permission Check] Checking bypassPermissionsModeAccepted field in ~/.claude.json`);
        }),

    );
}

function setupFileWatchers(
    context: vscode.ExtensionContext,
    specExplorer: SpecExplorerProvider,
    steeringExplorer: SteeringExplorerProvider,
    hooksExplorer: HooksExplorerProvider,
    mcpExplorer: MCPExplorerProvider,
    agentsExplorer: AgentsExplorerProvider
) {
    // Watch for changes in .claude directory with debouncing
    const prismaWatcher = vscode.workspace.createFileSystemWatcher('**/.claude/**/*');

    let refreshTimeout: NodeJS.Timeout | undefined;
    const debouncedRefresh = (event: string, uri: vscode.Uri) => {
        outputChannel.appendLine(`[FileWatcher] ${event}: ${uri.fsPath}`);

        if (refreshTimeout) {
            clearTimeout(refreshTimeout);
        }
        refreshTimeout = setTimeout(() => {
            specExplorer.refresh();
            steeringExplorer.refresh();
            hooksExplorer.refresh();
            mcpExplorer.refresh();
            agentsExplorer.refresh();
        }, 1000); // Increase debounce time to 1 second
    };

    prismaWatcher.onDidCreate((uri) => debouncedRefresh('Create', uri));
    prismaWatcher.onDidDelete((uri) => debouncedRefresh('Delete', uri));
    prismaWatcher.onDidChange((uri) => debouncedRefresh('Change', uri));

    context.subscriptions.push(prismaWatcher);

    // Watch for changes in Claude settings
    const claudeSettingsWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(os.homedir(), '.claude/settings.json')
    );

    claudeSettingsWatcher.onDidChange(() => {
        hooksExplorer.refresh();
        mcpExplorer.refresh();
    });

    context.subscriptions.push(claudeSettingsWatcher);

    // Watch for changes in CLAUDE.md files
    const globalClaudeMdWatcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(os.homedir(), '.claude/CLAUDE.md')
    );
    const projectClaudeMdWatcher = vscode.workspace.createFileSystemWatcher('**/CLAUDE.md');

    globalClaudeMdWatcher.onDidCreate(() => steeringExplorer.refresh());
    globalClaudeMdWatcher.onDidDelete(() => steeringExplorer.refresh());
    projectClaudeMdWatcher.onDidCreate(() => steeringExplorer.refresh());
    projectClaudeMdWatcher.onDidDelete(() => steeringExplorer.refresh());

    context.subscriptions.push(globalClaudeMdWatcher, projectClaudeMdWatcher);
}

export function deactivate() {
    // Cleanup
    if (permissionManager) {
        permissionManager.dispose();
    }
}
