"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputChannel = void 0;
exports.getPermissionManager = getPermissionManager;
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const os = __importStar(require("os"));
const claudeCodeProvider_1 = require("./providers/claudeCodeProvider");
const specManager_1 = require("./features/spec/specManager");
const steeringManager_1 = require("./features/steering/steeringManager");
const specExplorerProvider_1 = require("./providers/specExplorerProvider");
const steeringExplorerProvider_1 = require("./providers/steeringExplorerProvider");
const hooksExplorerProvider_1 = require("./providers/hooksExplorerProvider");
const mcpExplorerProvider_1 = require("./providers/mcpExplorerProvider");
const overviewProvider_1 = require("./providers/overviewProvider");
const agentsExplorerProvider_1 = require("./providers/agentsExplorerProvider");
const agentManager_1 = require("./features/agents/agentManager");
const configManager_1 = require("./utils/configManager");
const constants_1 = require("./constants");
const promptLoader_1 = require("./services/promptLoader");
const updateChecker_1 = require("./utils/updateChecker");
const permissionManager_1 = require("./features/permission/permissionManager");
const notificationManager_1 = require("./features/notification/notificationManager");
const notificationUtils_1 = require("./utils/notificationUtils");
const specTaskCodeLensProvider_1 = require("./providers/specTaskCodeLensProvider");
const translations_1 = require("./i18n/translations");
let claudeCodeProvider;
let specManager;
let steeringManager;
let permissionManager;
let notificationManager;
let agentManager;
function getPermissionManager() {
    return permissionManager;
}
async function activate(context) {
    exports.outputChannel = vscode.window.createOutputChannel('Prisma for Claude Code - Debug');
    try {
        const promptLoader = promptLoader_1.PromptLoader.getInstance();
        promptLoader.initialize();
        exports.outputChannel.appendLine('PromptLoader initialized successfully');
    }
    catch (error) {
        exports.outputChannel.appendLine(`Failed to initialize PromptLoader: ${error}`);
        vscode.window.showErrorMessage(`Failed to initialize prompt system: ${error}`);
    }
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        exports.outputChannel.appendLine('WARNING: No workspace folder found!');
    }
    claudeCodeProvider = new claudeCodeProvider_1.ClaudeCodeProvider(context, exports.outputChannel);
    permissionManager = new permissionManager_1.PermissionManager(context, exports.outputChannel);
    await permissionManager.initializePermissions();
    notificationManager = notificationManager_1.NotificationManager.getInstance();
    notificationManager.initialize(exports.outputChannel, context);
    specManager = new specManager_1.SpecManager(claudeCodeProvider, exports.outputChannel);
    steeringManager = new steeringManager_1.SteeringManager(claudeCodeProvider, exports.outputChannel);
    const configManager = configManager_1.ConfigManager.getInstance();
    await configManager.loadSettings();
    agentManager = new agentManager_1.AgentManager(context, exports.outputChannel, configManager);
    await agentManager.initializeBuiltInAgents();
    const overviewProvider = new overviewProvider_1.OverviewProvider(context);
    const specExplorer = new specExplorerProvider_1.SpecExplorerProvider(context, exports.outputChannel);
    const steeringExplorer = new steeringExplorerProvider_1.SteeringExplorerProvider(context);
    const hooksExplorer = new hooksExplorerProvider_1.HooksExplorerProvider(context);
    const mcpExplorer = new mcpExplorerProvider_1.MCPExplorerProvider(context, exports.outputChannel);
    const agentsExplorer = new agentsExplorerProvider_1.AgentsExplorerProvider(context, agentManager, exports.outputChannel);
    specExplorer.setSpecManager(specManager);
    steeringExplorer.setSteeringManager(steeringManager);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('prisma.views.overview', overviewProvider), vscode.window.registerTreeDataProvider('prisma.views.specExplorer', specExplorer), vscode.window.registerTreeDataProvider('prisma.views.agentsExplorer', agentsExplorer), vscode.window.registerTreeDataProvider('prisma.views.steeringExplorer', steeringExplorer), vscode.window.registerTreeDataProvider('prisma.views.hooksStatus', hooksExplorer), vscode.window.registerTreeDataProvider('prisma.views.mcpServerStatus', mcpExplorer));
    const updateChecker = new updateChecker_1.UpdateChecker(context, exports.outputChannel);
    registerCommands(context, specExplorer, steeringExplorer, hooksExplorer, mcpExplorer, agentsExplorer, updateChecker);
    await initializeDefaultSettings();
    setupFileWatchers(context, specExplorer, steeringExplorer, hooksExplorer, mcpExplorer, agentsExplorer);
    updateChecker.checkForUpdates();
    exports.outputChannel.appendLine('Update check initiated');
    const specTaskCodeLensProvider = new specTaskCodeLensProvider_1.SpecTaskCodeLensProvider();
    let specDir = '.claude/especificacoes';
    try {
        const configuredSpecDir = configManager.getPath('specs');
        specDir = configuredSpecDir || specDir;
    }
    catch (error) {
        exports.outputChannel.appendLine(`Failed to load settings for spec CodeLens: ${error}`);
    }
    const normalizedSpecDir = specDir.replace(/\\/g, '/');
    const selector = [
        {
            language: 'markdown',
            pattern: `**/${normalizedSpecDir}/*/tasks.md`,
            scheme: 'file'
        }
    ];
    const disposable = vscode.languages.registerCodeLensProvider(selector, specTaskCodeLensProvider);
    context.subscriptions.push(disposable);
    exports.outputChannel.appendLine('CodeLens provider for spec tasks registered');
}
async function initializeDefaultSettings() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        return;
    }
    const claudeDir = vscode.Uri.joinPath(workspaceFolder.uri, '.claude');
    const settingsDir = vscode.Uri.joinPath(claudeDir, 'settings');
    try {
        await vscode.workspace.fs.createDirectory(claudeDir);
        await vscode.workspace.fs.createDirectory(settingsDir);
    }
    catch (error) {
    }
    const settingsFile = vscode.Uri.joinPath(settingsDir, constants_1.CONFIG_FILE_NAME);
    try {
        await vscode.workspace.fs.stat(settingsFile);
    }
    catch (error) {
        const configManager = configManager_1.ConfigManager.getInstance();
        const defaultSettings = configManager.getSettings();
        await vscode.workspace.fs.writeFile(settingsFile, Buffer.from(JSON.stringify(defaultSettings, null, 2)));
    }
}
async function toggleViews() {
    const config = vscode.workspace.getConfiguration(constants_1.VSC_CONFIG_NAMESPACE);
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
        placeHolder: (0, translations_1.getTranslations)().messages.selectViewsToShow
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
function registerCommands(context, specExplorer, steeringExplorer, hooksExplorer, mcpExplorer, agentsExplorer, updateChecker) {
    context.subscriptions.push(vscode.commands.registerCommand('prisma.notification.configure', async () => {
        await notificationManager_1.NotificationManager.getInstance().openConfig();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('prisma.permission.reset', async () => {
        const confirm = await vscode.window.showWarningMessage('Are you sure you want to reset Claude Code permissions? This will revoke the granted permissions.', 'Yes', 'No');
        if (confirm === 'Yes') {
            const success = await permissionManager.resetPermission();
            if (success) {
                notificationUtils_1.NotificationUtils.showAutoDismissNotification('Permissions have been reset');
            }
            else {
                vscode.window.showErrorMessage('Failed to reset permissions. Please check the output log.');
            }
        }
    }));
    const createSpecCommand = vscode.commands.registerCommand('prisma.spec.create', async () => {
        exports.outputChannel.appendLine('\n=== COMMAND prisma.spec.create TRIGGERED ===');
        exports.outputChannel.appendLine(`Time: ${new Date().toLocaleTimeString()}`);
        try {
            await specManager.create();
        }
        catch (error) {
            exports.outputChannel.appendLine(`Error in createNewSpec: ${error}`);
            vscode.window.showErrorMessage(`Failed to create spec: ${error}`);
        }
    });
    const createSpecWithAgentsCommand = vscode.commands.registerCommand('prisma.spec.createWithAgents', async () => {
        try {
            await specManager.createWithAgents();
        }
        catch (error) {
            exports.outputChannel.appendLine(`Error in createWithAgents: ${error}`);
            vscode.window.showErrorMessage(`Failed to create spec with agents: ${error}`);
        }
    });
    context.subscriptions.push(createSpecCommand, createSpecWithAgentsCommand);
    context.subscriptions.push(vscode.commands.registerCommand('prisma.spec.navigate.requirements', async (specName) => {
        await specManager.navigateToDocument(specName, 'requirements');
    }), vscode.commands.registerCommand('prisma.spec.navigate.design', async (specName) => {
        await specManager.navigateToDocument(specName, 'design');
    }), vscode.commands.registerCommand('prisma.spec.navigate.tasks', async (specName) => {
        await specManager.navigateToDocument(specName, 'tasks');
    }), vscode.commands.registerCommand('prisma.spec.implTask', async (documentUri, lineNumber, taskDescription) => {
        exports.outputChannel.appendLine(`[Task Execute] Line ${lineNumber + 1}: ${taskDescription}`);
        const document = await vscode.workspace.openTextDocument(documentUri);
        const edit = new vscode.WorkspaceEdit();
        const line = document.lineAt(lineNumber);
        const newLine = line.text.replace('- [ ]', '- [x]');
        const range = new vscode.Range(lineNumber, 0, lineNumber, line.text.length);
        edit.replace(documentUri, range, newLine);
        await vscode.workspace.applyEdit(edit);
        await specManager.implTask(documentUri.fsPath, taskDescription);
    }), vscode.commands.registerCommand('prisma.spec.refresh', async () => {
        exports.outputChannel.appendLine('[Manual Refresh] Refreshing spec explorer...');
        specExplorer.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('prisma.steering.create', async () => {
        await steeringManager.createCustom();
    }), vscode.commands.registerCommand('prisma.steering.generateInitial', async () => {
        await steeringManager.init();
    }), vscode.commands.registerCommand('prisma.steering.refine', async (item) => {
        const uri = vscode.Uri.file(item.resourcePath);
        await steeringManager.refine(uri);
    }), vscode.commands.registerCommand('prisma.steering.delete', async (item) => {
        exports.outputChannel.appendLine(`[Steering] Deleting: ${item.label}`);
        const result = await steeringManager.delete(item.label, item.resourcePath);
        if (!result.success && result.error) {
            vscode.window.showErrorMessage(result.error);
        }
    }), vscode.commands.registerCommand('prisma.steering.createUserRule', async () => {
        await steeringManager.createUserClaudeMd();
    }), vscode.commands.registerCommand('prisma.steering.createProjectRule', async () => {
        await steeringManager.createProjectClaudeMd();
    }), vscode.commands.registerCommand('prisma.steering.refresh', async () => {
        exports.outputChannel.appendLine('[Manual Refresh] Refreshing steering explorer...');
        steeringExplorer.refresh();
    }), vscode.commands.registerCommand('prisma.agents.refresh', async () => {
        exports.outputChannel.appendLine('[Manual Refresh] Refreshing agents explorer...');
        agentsExplorer.refresh();
    }));
    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(async (event) => {
        const document = event.document;
        const filePath = document.fileName;
        if (filePath.includes('.claude/agents/') && filePath.endsWith('.md')) {
            const result = await vscode.window.showWarningMessage('Are you sure you want to save changes to this agent file?', { modal: true }, 'Save', 'Cancel');
            if (result !== 'Save') {
                event.waitUntil(new Promise(() => { }));
            }
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('prisma.spec.delete', async (item) => {
        await specManager.delete(item.label);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('prisma.hooks.refresh', () => {
        hooksExplorer.refresh();
    }), vscode.commands.registerCommand('prisma.hooks.copyCommand', async (command) => {
        await vscode.env.clipboard.writeText(command);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('prisma.mcp.refresh', () => {
        mcpExplorer.refresh();
    }), vscode.commands.registerCommand('prisma.checkForUpdates', async () => {
        exports.outputChannel.appendLine('Manual update check requested');
        await updateChecker.checkForUpdates(true);
    }), vscode.commands.registerCommand('prisma.settings.open', async () => {
        exports.outputChannel.appendLine('Opening Prisma settings...');
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }
        const claudeDir = vscode.Uri.joinPath(workspaceFolder.uri, '.claude');
        const settingsDir = vscode.Uri.joinPath(claudeDir, 'settings');
        try {
            await vscode.workspace.fs.createDirectory(claudeDir);
            await vscode.workspace.fs.createDirectory(settingsDir);
        }
        catch (error) {
        }
        const settingsFile = vscode.Uri.joinPath(settingsDir, constants_1.CONFIG_FILE_NAME);
        try {
            await vscode.workspace.fs.stat(settingsFile);
        }
        catch (error) {
            const configManager = configManager_1.ConfigManager.getInstance();
            const defaultSettings = configManager.getSettings();
            await vscode.workspace.fs.writeFile(settingsFile, Buffer.from(JSON.stringify(defaultSettings, null, 2)));
        }
        const document = await vscode.workspace.openTextDocument(settingsFile);
        await vscode.window.showTextDocument(document);
    }), vscode.commands.registerCommand('prisma.help.open', async () => {
        exports.outputChannel.appendLine('Opening Prisma help...');
        const helpUrl = 'https://github.com/matheusmaiberg/prisma#readme';
        vscode.env.openExternal(vscode.Uri.parse(helpUrl));
    }), vscode.commands.registerCommand('prisma.menu.open', async () => {
        exports.outputChannel.appendLine('Opening Prisma menu...');
        await toggleViews();
    }), vscode.commands.registerCommand('prisma.permission.check', async () => {
        const hasPermission = await permissionManager.checkPermission();
        const configPath = require('os').homedir() + '/.claude.json';
        vscode.window.showInformationMessage(`Claude Code Permission Status: ${hasPermission ? '✅ Granted' : '❌ Not Granted'}`);
        exports.outputChannel.appendLine(`[Permission Check] Status: ${hasPermission}`);
        exports.outputChannel.appendLine(`[Permission Check] Config file: ${configPath}`);
        exports.outputChannel.appendLine(`[Permission Check] Checking bypassPermissionsModeAccepted field in ~/.claude.json`);
    }));
}
function setupFileWatchers(context, specExplorer, steeringExplorer, hooksExplorer, mcpExplorer, agentsExplorer) {
    const prismaWatcher = vscode.workspace.createFileSystemWatcher('**/.claude/**/*');
    let refreshTimeout;
    const debouncedRefresh = (event, uri) => {
        exports.outputChannel.appendLine(`[FileWatcher] ${event}: ${uri.fsPath}`);
        if (refreshTimeout) {
            clearTimeout(refreshTimeout);
        }
        refreshTimeout = setTimeout(() => {
            specExplorer.refresh();
            steeringExplorer.refresh();
            hooksExplorer.refresh();
            mcpExplorer.refresh();
            agentsExplorer.refresh();
        }, 1000);
    };
    prismaWatcher.onDidCreate((uri) => debouncedRefresh('Create', uri));
    prismaWatcher.onDidDelete((uri) => debouncedRefresh('Delete', uri));
    prismaWatcher.onDidChange((uri) => debouncedRefresh('Change', uri));
    context.subscriptions.push(prismaWatcher);
    const claudeSettingsWatcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(os.homedir(), '.claude/settings.json'));
    claudeSettingsWatcher.onDidChange(() => {
        hooksExplorer.refresh();
        mcpExplorer.refresh();
    });
    context.subscriptions.push(claudeSettingsWatcher);
    const globalClaudeMdWatcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(os.homedir(), '.claude/CLAUDE.md'));
    const projectClaudeMdWatcher = vscode.workspace.createFileSystemWatcher('**/CLAUDE.md');
    globalClaudeMdWatcher.onDidCreate(() => steeringExplorer.refresh());
    globalClaudeMdWatcher.onDidDelete(() => steeringExplorer.refresh());
    projectClaudeMdWatcher.onDidCreate(() => steeringExplorer.refresh());
    projectClaudeMdWatcher.onDidDelete(() => steeringExplorer.refresh());
    context.subscriptions.push(globalClaudeMdWatcher, projectClaudeMdWatcher);
}
function deactivate() {
    if (permissionManager) {
        permissionManager.dispose();
    }
}
//# sourceMappingURL=extension.js.map