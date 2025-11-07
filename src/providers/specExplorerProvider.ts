import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { SpecManager } from '../features/spec/specManager';
import { getTranslations } from '../i18n/translations';

export class SpecExplorerProvider implements vscode.TreeDataProvider<SpecItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<SpecItem | undefined | null | void> = new vscode.EventEmitter<SpecItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<SpecItem | undefined | null | void> = this._onDidChangeTreeData.event;
    
    private specManager!: SpecManager;
    private outputChannel: vscode.OutputChannel;
    private isLoading: boolean = false;
    
    constructor(private context: vscode.ExtensionContext, outputChannel: vscode.OutputChannel) {
        // We'll set the spec manager later from extension.ts
        this.outputChannel = outputChannel;
    }
    
    setSpecManager(specManager: SpecManager) {
        this.specManager = specManager;
    }
    
    refresh(): void {
        this.isLoading = true;
        this._onDidChangeTreeData.fire(); // Show loading state immediately
        
        // Simulate async loading
        setTimeout(() => {
            this.isLoading = false;
            this._onDidChangeTreeData.fire(); // Show actual content
        }, 100);
    }
    
    getTreeItem(element: SpecItem): vscode.TreeItem {
        return element;
    }
    
    async getChildren(element?: SpecItem): Promise<SpecItem[]> {
        
        if (!vscode.workspace.workspaceFolders || !this.specManager) {
            return [];
        }
        
        if (!element) {
            // Root level - show loading state or specs
            const items: SpecItem[] = [];
            
            if (this.isLoading) {
                // Show loading state
                items.push(new SpecItem(
                    getTranslations().loading.specs,
                    vscode.TreeItemCollapsibleState.None,
                    'spec-loading',
                    this.context
                ));
                return items;
            }
            
            // Show all specs
            const specs = await this.specManager.getSpecList();
            const specItems = specs.map(specName => new SpecItem(
                specName,
                vscode.TreeItemCollapsibleState.Expanded,
                'spec',
                this.context,
                specName
            ));
            
            return specItems;
        } else if (element.contextValue === 'spec') {
            // Show spec documents
            const specsPath = await this.specManager.getSpecBasePath();
            const specPath = `${specsPath}/${element.specName}`;
            
            return [
                new SpecItem(
                    'requirements',
                    vscode.TreeItemCollapsibleState.None,
                    'spec-document',
                    this.context,
                    element.specName!,
                    'requirements',
                    {
                        command: 'prisma.spec.navigate.requirements',
                        title: getTranslations().titles.openRequirements,
                        arguments: [element.specName]
                    },
                    `${specPath}/requirements.md`
                ),
                new SpecItem(
                    'design',
                    vscode.TreeItemCollapsibleState.None,
                    'spec-document',
                    this.context,
                    element.specName!,
                    'design',
                    {
                        command: 'prisma.spec.navigate.design',
                        title: getTranslations().titles.openDesign,
                        arguments: [element.specName]
                    },
                    `${specPath}/design.md`
                ),
                new SpecItem(
                    'tasks',
                    vscode.TreeItemCollapsibleState.Collapsed,
                    'spec-document',
                    this.context,
                    element.specName!,
                    'tasks',
                    undefined, // Remove command to allow expansion
                    `${specPath}/tasks.md`
                )
            ];
        } else if (element.contextValue === 'spec-document' && element.documentType === 'tasks') {
            // Parse tasks from tasks.md file and show individual tasks
            const specsPath = await this.specManager.getSpecBasePath();
            const tasksFilePath = path.join(specsPath, element.specName!, 'tasks.md');

            try {
                if (fs.existsSync(tasksFilePath)) {
                    const content = fs.readFileSync(tasksFilePath, 'utf-8');
                    const tasks = this.parseTasksFromMarkdown(content);

                    return tasks.map(task => new SpecItem(
                        task.title,
                        vscode.TreeItemCollapsibleState.None,
                        'spec-task',
                        this.context,
                        element.specName,
                        'task',
                        {
                            command: 'prisma.spec.navigate.task',
                            title: 'Open Task',
                            arguments: [element.specName, tasksFilePath, task.line]
                        },
                        tasksFilePath,
                        task.line
                    ));
                }
            } catch (error) {
                console.error('Error reading tasks file:', error);
            }
        }

        return [];
    }

    private parseTasksFromMarkdown(content: string): { title: string; line: number }[] {
        const tasks: { title: string; line: number }[] = [];
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Match headers with "Task" or numbered tasks (## Task 1:, ## Task 2:, etc.)
            const taskMatch = line.match(/^##\s+(Task\s+\d+:?\s*.+|.+)/);
            if (taskMatch) {
                tasks.push({
                    title: taskMatch[1].trim(),
                    line: i + 1 // Line numbers start at 1
                });
            }
        }

        return tasks;
    }
}

class SpecItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly contextValue: string,
        private readonly context: vscode.ExtensionContext,
        public readonly specName?: string,
        public readonly documentType?: string,
        public readonly command?: vscode.Command,
        private readonly filePath?: string,
        public readonly taskLine?: number
    ) {
        super(label, collapsibleState);
        
        if (contextValue === 'spec-loading') {
            this.iconPath = new vscode.ThemeIcon('sync~spin');
            this.tooltip = 'Loading specs...';
        } else if (contextValue === 'spec') {
            this.iconPath = new vscode.ThemeIcon('package');
            this.tooltip = `Spec: ${label}`;
        } else if (contextValue === 'spec-document') {
            // Different icons for different document types
            if (documentType === 'requirements') {
                this.iconPath = new vscode.ThemeIcon('chip');
                this.tooltip = `Requirements: ${specName}/${label}`;
            } else if (documentType === 'design') {
                this.iconPath = new vscode.ThemeIcon('layers');
                this.tooltip = `Design: ${specName}/${label}`;
            } else if (documentType === 'tasks') {
                this.iconPath = new vscode.ThemeIcon('tasklist');
                this.tooltip = `Tasks: ${specName}/${label}`;
            } else {
                this.iconPath = new vscode.ThemeIcon('file');
                this.tooltip = `${documentType}: ${specName}/${label}`;
            }
            
            // Set description to file path
            if (filePath) {
                this.description = filePath;
            }
            
            // Add context menu items
            if (documentType === 'requirements' || documentType === 'design' || documentType === 'tasks') {
                this.contextValue = `spec-document-${documentType}`;
            }
        } else if (contextValue === 'spec-task') {
            // Individual task item
            this.iconPath = new vscode.ThemeIcon('symbol-method');
            this.tooltip = `${label} (line ${taskLine})`;
            this.description = `line ${taskLine}`;
        }
    }
}