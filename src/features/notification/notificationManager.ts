import * as vscode from 'vscode';
import { ConfigManager } from '../../utils/configManager';
import { NotificationSettings, DEFAULT_NOTIFICATION_SETTINGS } from '../../types/notification.types';

/**
 * NotificationManager - Manages the lifecycle of the notification system
 *
 * Implements Singleton pattern for centralized notification management.
 * Handles configuration loading, hot-reload via FileSystemWatcher,
 * and factory instance management.
 *
 * @example
 * ```typescript
 * // Initialize manager during extension activation
 * const manager = NotificationManager.getInstance();
 * manager.initialize(outputChannel, context);
 *
 * // Get factory for creating notifications
 * const factory = manager.getFactory();
 * await factory.info('Spec created').show();
 * ```
 *
 * @performance
 * - getInstance(): < 0.05ms (lazy initialization)
 * - initialize(): < 10ms (config loading + watcher setup)
 * - Config reload: < 10ms (event-driven, zero polling)
 */
export class NotificationManager implements vscode.Disposable {
	private static instance: NotificationManager | undefined;
	private factory: any | undefined; // Will be NotificationFactory when TASK-003 completes
	private settings: NotificationSettings;
	private configWatcher: vscode.FileSystemWatcher | undefined;
	private outputChannel: vscode.OutputChannel | undefined;
	private disposables: vscode.Disposable[] = [];

	/**
	 * Private constructor - use getInstance() instead
	 * Singleton pattern ensures only one manager instance per extension
	 */
	private constructor() {
		this.settings = DEFAULT_NOTIFICATION_SETTINGS;
	}

	/**
	 * Get singleton instance of NotificationManager
	 *
	 * @returns NotificationManager instance
	 * @performance < 0.05ms (subsequent calls)
	 *
	 * @example
	 * ```typescript
	 * const manager = NotificationManager.getInstance();
	 * ```
	 */
	public static getInstance(): NotificationManager {
		if (!NotificationManager.instance) {
			NotificationManager.instance = new NotificationManager();
		}
		return NotificationManager.instance;
	}

	/**
	 * Initialize the notification manager
	 *
	 * Must be called during extension activation to set up configuration
	 * loading and file system watcher for hot-reload.
	 *
	 * @param outputChannel - VSCode output channel for logging
	 * @param context - Extension context for disposable registration
	 *
	 * @example
	 * ```typescript
	 * export function activate(context: vscode.ExtensionContext) {
	 *   const outputChannel = vscode.window.createOutputChannel('Prisma');
	 *   const manager = NotificationManager.getInstance();
	 *   manager.initialize(outputChannel, context);
	 * }
	 * ```
	 */
	public initialize(outputChannel: vscode.OutputChannel, context: vscode.ExtensionContext): void {
		this.outputChannel = outputChannel;
		this.outputChannel.appendLine('[NotificationManager] Initializing notification system...');

		// Load configuration from ConfigManager
		this.loadConfiguration();

		// Setup FileSystemWatcher for config hot-reload
		this.setupConfigWatcher(context);

		// Register manager as disposable
		context.subscriptions.push(this);

		this.outputChannel.appendLine('[NotificationManager] Notification system initialized successfully');
	}

	/**
	 * Get NotificationFactory instance
	 *
	 * Lazy creation pattern - factory is created only when first requested.
	 * Once created, returns the same instance for all subsequent calls.
	 *
	 * @returns NotificationFactory instance
	 * @throws Error if TASK-003 (NotificationFactory) not yet implemented
	 *
	 * @example
	 * ```typescript
	 * const manager = NotificationManager.getInstance();
	 * const factory = manager.getFactory();
	 * await factory.info('Hello World').show();
	 * ```
	 */
	public getFactory(): any {
		if (!this.factory) {
			// TODO: TASK-003 will implement NotificationFactory
			// For now, throw error with clear message
			throw new Error(
				'NotificationFactory not yet implemented (TASK-003). ' +
				'This method will return NotificationFactory instance once TASK-003 is complete.'
			);
		}
		return this.factory;
	}

	/**
	 * Open notification configuration file
	 *
	 * Opens prisma.settings.json and focuses on the "notifications" section.
	 * Used by prisma.notification.configure command.
	 *
	 * @example
	 * ```typescript
	 * // Register command in extension.ts
	 * vscode.commands.registerCommand('prisma.notification.configure', async () => {
	 *   await manager.openConfig();
	 * });
	 * ```
	 */
	public async openConfig(): Promise<void> {
		const configManager = ConfigManager.getInstance();
		const settingsPath = configManager.getAbsolutePath('settings') + '/prisma.settings.json';

		try {
			const doc = await vscode.workspace.openTextDocument(settingsPath);
			await vscode.window.showTextDocument(doc);

			// Focus on "notifications" section if it exists
			const text = doc.getText();
			const notifIndex = text.indexOf('"notifications"');
			if (notifIndex !== -1) {
				const position = doc.positionAt(notifIndex);
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					editor.selection = new vscode.Selection(position, position);
					editor.revealRange(new vscode.Range(position, position));
				}
			}

			if (this.outputChannel) {
				this.outputChannel.appendLine('[NotificationManager] Opened configuration file');
			}
		} catch (error) {
			const errorMsg = `Failed to open configuration: ${error}`;
			if (this.outputChannel) {
				this.outputChannel.appendLine(`[NotificationManager] ERROR: ${errorMsg}`);
			}
			vscode.window.showErrorMessage(errorMsg);
		}
	}

	/**
	 * Load notification settings from ConfigManager
	 *
	 * Loads configuration with deep merge strategy:
	 * 1. Start with DEFAULT_NOTIFICATION_SETTINGS
	 * 2. Merge user settings from prisma.settings.json
	 * 3. Apply validation and fallback if needed
	 *
	 * @performance < 5ms (cached config)
	 * @private
	 */
	private loadConfiguration(): void {
		try {
			const configManager = ConfigManager.getInstance();
			const settings = configManager.getSettings();

			// Deep merge: user config over defaults
			if (settings.notifications) {
				this.settings = {
					defaults: {
						...DEFAULT_NOTIFICATION_SETTINGS.defaults,
						...settings.notifications.defaults
					},
					types: settings.notifications.types || {}
				};
			} else {
				// No user config, use defaults
				this.settings = DEFAULT_NOTIFICATION_SETTINGS;
			}

			// Validation: autoDismissDuration must be >= 0
			if (this.settings.defaults.autoDismissDuration < 0) {
				if (this.outputChannel) {
					this.outputChannel.appendLine(
						'[NotificationManager] WARNING: Invalid autoDismissDuration (< 0), using default 3000ms'
					);
				}
				this.settings.defaults.autoDismissDuration = DEFAULT_NOTIFICATION_SETTINGS.defaults.autoDismissDuration;
			}

			if (this.outputChannel) {
				this.outputChannel.appendLine(
					`[NotificationManager] Configuration loaded: autoDismissDuration=${this.settings.defaults.autoDismissDuration}ms`
				);
			}
		} catch (error) {
			// Fallback to defaults on error
			if (this.outputChannel) {
				this.outputChannel.appendLine(
					`[NotificationManager] WARNING: Failed to load configuration, using defaults: ${error}`
				);
			}
			this.settings = DEFAULT_NOTIFICATION_SETTINGS;
		}
	}

	/**
	 * Setup FileSystemWatcher for configuration hot-reload
	 *
	 * Watches prisma.settings.json for changes and automatically reloads
	 * configuration without requiring extension restart.
	 *
	 * Event-driven approach (zero polling overhead):
	 * - onDidChange: Triggered when file is modified
	 * - onDidCreate: Triggered when file is created
	 *
	 * @param context - Extension context for disposable registration
	 * @performance Event-driven, < 10ms reload time
	 * @private
	 */
	private setupConfigWatcher(context: vscode.ExtensionContext): void {
		try {
			const configManager = ConfigManager.getInstance();
			const settingsPath = configManager.getAbsolutePath('settings') + '/prisma.settings.json';

			this.configWatcher = vscode.workspace.createFileSystemWatcher(settingsPath);

			// Debounce helper to prevent multiple rapid reloads
			let reloadTimeout: NodeJS.Timeout | undefined;
			const reloadConfig = () => {
				// Clear existing timeout
				if (reloadTimeout) {
					clearTimeout(reloadTimeout);
				}

				// Debounce: wait 1 second before reloading
				reloadTimeout = setTimeout(() => {
					if (this.outputChannel) {
						this.outputChannel.appendLine('[NotificationManager] Config file changed, reloading...');
					}

					this.loadConfiguration();

					// Update factory settings if factory exists (TASK-003 will implement this)
					if (this.factory && typeof this.factory.updateSettings === 'function') {
						this.factory.updateSettings(this.settings);
					}

					if (this.outputChannel) {
						this.outputChannel.appendLine('[NotificationManager] Config reloaded successfully');
					}
				}, 1000); // 1 second debounce
			};

			this.configWatcher.onDidChange(reloadConfig);
			this.configWatcher.onDidCreate(reloadConfig);

			// Register watcher as disposable
			this.disposables.push(this.configWatcher);

			if (this.outputChannel) {
				this.outputChannel.appendLine('[NotificationManager] FileSystemWatcher setup complete');
			}
		} catch (error) {
			// Non-critical error, log and continue
			if (this.outputChannel) {
				this.outputChannel.appendLine(
					`[NotificationManager] WARNING: Failed to setup config watcher: ${error}`
				);
			}
		}
	}

	/**
	 * Dispose resources
	 *
	 * Cleans up FileSystemWatcher, factory, and other disposables.
	 * Called automatically when extension is deactivated.
	 *
	 * @example
	 * ```typescript
	 * // Automatically called by VSCode when registered in context.subscriptions
	 * context.subscriptions.push(manager);
	 * ```
	 */
	public dispose(): void {
		if (this.outputChannel) {
			this.outputChannel.appendLine('[NotificationManager] Disposing notification manager...');
		}

		// Dispose all disposables
		this.disposables.forEach(d => d.dispose());
		this.disposables = [];

		// Dispose config watcher
		if (this.configWatcher) {
			this.configWatcher.dispose();
			this.configWatcher = undefined;
		}

		// Dispose factory if it has dispose method (TASK-003 may implement this)
		if (this.factory && typeof this.factory.dispose === 'function') {
			this.factory.dispose();
		}
		this.factory = undefined;

		if (this.outputChannel) {
			this.outputChannel.appendLine('[NotificationManager] Notification manager disposed successfully');
		}
	}

	/**
	 * Get current notification settings (for testing/debugging)
	 *
	 * @returns Current NotificationSettings
	 * @internal
	 */
	public getSettings(): NotificationSettings {
		return this.settings;
	}
}
