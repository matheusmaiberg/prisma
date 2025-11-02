import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as yaml from 'js-yaml';

export interface AgentInfo {
    name: string;
    description: string;
    path: string;
    type: 'project' | 'user';
    tools?: string[];
}

export class AgentManager {
    private outputChannel: vscode.OutputChannel;
    private extensionPath: string;
    private workspaceRoot: string | undefined;
    private configManager: any;

    private readonly BUILT_IN_AGENTS = [
        'analista',
        'arquiteto',
        'auditor',
        'avaliador-riscos',
        'configurador',
        'conformista',
        'decisor',
        'designer',
        'documentador',
        'elicitador',
        'idealizador',
        'implementador',
        'juiz',
        'meta',
        'planejador',
        'prisma',
        'regulador',
        'revisor',
        'testador',
        'testador-specs'
    ];

    constructor(
        context: vscode.ExtensionContext,
        outputChannel: vscode.OutputChannel,
        configManager: any
    ) {
        this.outputChannel = outputChannel;
        this.extensionPath = context.extensionPath;
        this.workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        this.configManager = configManager;
    }

    /**
     * Initialize built-in agents (copy if not exist on startup)
     */
    async initializeBuiltInAgents(): Promise<void> {
        if (!this.workspaceRoot) {
            this.outputChannel.appendLine('[AgentManager] No workspace root found, skipping agent initialization');
            return;
        }

        const targetDir = path.join(this.workspaceRoot, this.configManager.getPath('agents'));

        try {
            // Ensure target directory exists
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(targetDir));

            // Copy each built-in agent (always overwrite to ensure latest version)
            for (const agentName of this.BUILT_IN_AGENTS) {
                const sourcePath = path.join(this.extensionPath, 'dist/resources/agentes', `${agentName}.md`);
                const targetPath = path.join(targetDir, `${agentName}.md`);
                
                try {
                    const sourceUri = vscode.Uri.file(sourcePath);
                    const targetUri = vscode.Uri.file(targetPath);
                    await vscode.workspace.fs.copy(sourceUri, targetUri, { overwrite: true });
                    this.outputChannel.appendLine(`[AgentManager] Updated agent ${agentName}`);
                } catch (error) {
                    this.outputChannel.appendLine(`[AgentManager] Failed to copy agent ${agentName}: ${error}`);
                }
            }
            
            // Also copy prompts, commands and templates
            await this.initializeSystemPrompt();
            await this.initializeCommands();
            await this.initializeTemplates();

        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Failed to initialize agents: ${error}`);
        }
    }

    /**
     * Initialize system prompts (copy if not exist)
     */
    private async initializeSystemPrompt(): Promise<void> {
        if (!this.workspaceRoot) {
            return;
        }

        // Fixed Claude default path (always in English)
        const promptsDir = path.join(this.workspaceRoot, this.configManager.getPath('prompts'));
        const prompts = ['elicitacoes.md', 'prisma-prompt.md', 'prisma-system.md'];

        try {
            // Ensure directory exists
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(promptsDir));

            // Copy each prompt (always overwrite to ensure latest version)
            for (const promptName of prompts) {
                const sourcePath = path.join(this.extensionPath, 'dist/resources/prompts', promptName);
                const targetPath = path.join(promptsDir, promptName);

                try {
                    await vscode.workspace.fs.copy(vscode.Uri.file(sourcePath), vscode.Uri.file(targetPath), { overwrite: true });
                    this.outputChannel.appendLine(`[AgentManager] Updated prompt ${promptName}`);
                } catch (error) {
                    this.outputChannel.appendLine(`[AgentManager] Failed to copy prompt ${promptName}: ${error}`);
                }
            }
        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Failed to initialize prompts: ${error}`);
        }
    }

    /**
     * Initialize commands (copy slash commands)
     */
    private async initializeCommands(): Promise<void> {
        if (!this.workspaceRoot) {
            return;
        }

        // Copy from dist/resources/comandos/prisma/ to .claude/commands/prisma/
        const sourceDir = path.join(this.extensionPath, 'dist/resources/comandos/prisma');
        const targetDir = path.join(this.workspaceRoot, this.configManager.getPath('commands'));

        try {
            // Copy entire prisma commands directory recursively
            await vscode.workspace.fs.copy(vscode.Uri.file(sourceDir), vscode.Uri.file(targetDir), { overwrite: true });
            this.outputChannel.appendLine('[AgentManager] Updated commands');
        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Failed to initialize commands: ${error}`);
        }
    }

    /**
     * Initialize templates
     */
    private async initializeTemplates(): Promise<void> {
        if (!this.workspaceRoot) {
            return;
        }

        // Fixed Claude default path (always in English)
        const sourceDir = path.join(this.extensionPath, 'dist/resources/templates');
        const targetDir = path.join(this.workspaceRoot, this.configManager.getPath('templates'));

        try {
            // Copy entire templates directory
            await vscode.workspace.fs.copy(vscode.Uri.file(sourceDir), vscode.Uri.file(targetDir), { overwrite: true });
            this.outputChannel.appendLine('[AgentManager] Updated templates');
        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Failed to initialize templates: ${error}`);
        }
    }

    /**
     * Get list of agents
     */
    async getAgentList(type: 'project' | 'user' | 'all' = 'all'): Promise<AgentInfo[]> {
        const agents: AgentInfo[] = [];

        // Get project agents (including prisma built-in agents)
        if (type === 'project' || type === 'all') {
            if (this.workspaceRoot) {
                const projectAgentsPath = path.dirname(path.join(this.workspaceRoot, this.configManager.getPath('agents')));
                const projectAgents = await this.getAgentsFromDirectory(
                    projectAgentsPath,
                    'project',
                    false  // include prisma directory
                );
                agents.push(...projectAgents);
            }
        }

        // Get user agents
        if (type === 'user' || type === 'all') {
            const userAgentsPath = path.join(os.homedir(), '.claude/agents');
            const userAgents = await this.getAgentsFromDirectory(userAgentsPath, 'user');
            agents.push(...userAgents);
        }

        // Filter excluded agents from settings
        const excludedAgents = this.configManager.getExcludedAgents();

        // If wildcard "*" is present, exclude all agents
        if (excludedAgents.includes('*')) {
            this.outputChannel.appendLine(`[AgentManager] Wildcard '*' detected - excluding all agents`);
            return [];
        }

        const filteredAgents = agents.filter(agent => !excludedAgents.includes(agent.name));

        this.outputChannel.appendLine(`[AgentManager] Total agents: ${agents.length}, Excluded: ${excludedAgents.join(', ')}, Showing: ${filteredAgents.length}`);

        return filteredAgents;
    }

    /**
     * Get agents from a specific directory (including subdirectories)
     */
    private async getAgentsFromDirectory(dirPath: string, type: 'project' | 'user', excludePrisma: boolean = false): Promise<AgentInfo[]> {
        const agents: AgentInfo[] = [];

        try {
            this.outputChannel.appendLine(`[AgentManager] Reading agents from directory: ${dirPath}`);
            await this.readAgentsRecursively(dirPath, type, agents, excludePrisma);
            this.outputChannel.appendLine(`[AgentManager] Total agents found in ${dirPath}: ${agents.length}`);
        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Failed to read agents from ${dirPath}: ${error}`);
        }

        return agents;
    }

    /**
     * Recursively read agents from directory and subdirectories
     */
    private async readAgentsRecursively(dirPath: string, type: 'project' | 'user', agents: AgentInfo[], excludePrisma: boolean = false): Promise<void> {
        try {
            const entries = await vscode.workspace.fs.readDirectory(vscode.Uri.file(dirPath));
            
            for (const [fileName, fileType] of entries) {
                const fullPath = path.join(dirPath, fileName);
                
                // Skip prisma directory if excludePrisma is true
                if (excludePrisma && fileName === 'prisma' && fileType === vscode.FileType.Directory) {
                    this.outputChannel.appendLine(`[AgentManager] Skipping prisma directory (built-in agents)`);
                    continue;
                }
                
                if (fileType === vscode.FileType.File && fileName.endsWith('.md')) {
                    this.outputChannel.appendLine(`[AgentManager] Processing agent file: ${fileName}`);
                    const agentInfo = await this.parseAgentFile(fullPath, type);
                    if (agentInfo) {
                        agents.push(agentInfo);
                        this.outputChannel.appendLine(`[AgentManager] Added agent: ${agentInfo.name}`);
                    } else {
                        this.outputChannel.appendLine(`[AgentManager] Failed to parse agent: ${fileName}`);
                    }
                } else if (fileType === vscode.FileType.Directory) {
                    // Recursively read subdirectories
                    this.outputChannel.appendLine(`[AgentManager] Entering subdirectory: ${fileName}`);
                    await this.readAgentsRecursively(fullPath, type, agents, excludePrisma);
                }
            }
        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Error reading directory ${dirPath}: ${error}`);
        }
    }

    /**
     * Parse agent file and extract metadata
     */
    private async parseAgentFile(filePath: string, type: 'project' | 'user'): Promise<AgentInfo | null> {
        try {
            this.outputChannel.appendLine(`[AgentManager] Parsing agent file: ${filePath}`);
            const content = await fs.promises.readFile(filePath, 'utf8');
            
            // Extract YAML frontmatter
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
            if (!frontmatterMatch) {
                this.outputChannel.appendLine(`[AgentManager] No frontmatter found in: ${filePath}`);
                return null;
            }

            let frontmatter: any;
            try {
                // Debug: log the frontmatter content for spec-system-prompt-loader
                if (path.basename(filePath) === 'spec-system-prompt-loader.md') {
                    this.outputChannel.appendLine(`[AgentManager] Frontmatter content for spec-system-prompt-loader:`);
                    this.outputChannel.appendLine(frontmatterMatch[1]);
                }
                
                frontmatter = yaml.load(frontmatterMatch[1]) as any;
                this.outputChannel.appendLine(`[AgentManager] Successfully parsed YAML for: ${path.basename(filePath)}`);
            } catch (yamlError) {
                this.outputChannel.appendLine(`[AgentManager] YAML parse error in ${path.basename(filePath)}: ${yamlError}`);
                if (path.basename(filePath) === 'spec-system-prompt-loader.md') {
                    this.outputChannel.appendLine(`[AgentManager] Raw frontmatter that failed:`);
                    this.outputChannel.appendLine(frontmatterMatch[1]);
                }
                return null;
            }
            
            return {
                name: frontmatter.name || path.basename(filePath, '.md'),
                description: frontmatter.description || '',
                path: filePath,
                type,
                tools: Array.isArray(frontmatter.tools) 
                    ? frontmatter.tools 
                    : (frontmatter.tools ? frontmatter.tools.split(',').map((t: string) => t.trim()) : undefined)
            };
        } catch (error) {
            this.outputChannel.appendLine(`[AgentManager] Failed to parse agent file ${filePath}: ${error}`);
            return null;
        }
    }

    /**
     * Check if agent exists
     */
    checkAgentExists(agentName: string, location: 'project' | 'user'): boolean {
        const basePath = location === 'project'
            ? (this.workspaceRoot ? path.join(this.workspaceRoot, this.configManager.getPath('agents')) : null)
            : path.join(os.homedir(), '.claude/agents');

        if (!basePath) {
            return false;
        }

        const agentPath = path.join(basePath, `${agentName}.md`);
        return fs.existsSync(agentPath);
    }

    /**
     * Get agent file path
     */
    getAgentPath(agentName: string): string | null {
        // Check project agents first
        if (this.workspaceRoot) {
            const projectPath = path.join(this.workspaceRoot, this.configManager.getPath('agents'), `${agentName}.md`);
            if (fs.existsSync(projectPath)) {
                return projectPath;
            }
        }

        // Check user agents
        const userPath = path.join(os.homedir(), '.claude/agents', `${agentName}.md`);
        if (fs.existsSync(userPath)) {
            return userPath;
        }

        return null;
    }
}