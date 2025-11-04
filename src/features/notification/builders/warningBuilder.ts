/**
 * Warning Notification Builder
 *
 * Implements Builder Pattern for warning notifications using VSCode showWarningMessage API.
 * Provides fluent API for configuring auto-dismiss, actions, and modal behavior.
 *
 * Features:
 * - Auto-dismiss with warning icon (⚠️)
 * - Action buttons with callbacks
 * - Modal vs non-modal display
 * - Graceful error handling
 * - Method chaining (fluent interface)
 *
 * @module notification.builders.warningBuilder
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window.showWarningMessage VSCode showWarningMessage}
 *
 * @example
 * ```typescript
 * // Auto-dismiss warning (3 seconds)
 * const builder = new WarningBuilder('File not found', { duration: 3000 });
 * await builder.show();
 *
 * // Warning with actions
 * const builder = new WarningBuilder('Unsaved changes', {})
 *   .withActions([
 *     { title: 'Save', action: async () => await save() },
 *     { title: 'Discard', action: () => discard() }
 *   ])
 *   .withModal(true);
 * await builder.show();
 *
 * // Custom duration
 * const builder = new WarningBuilder('Cache outdated', { duration: 5000 })
 *   .withDuration(5000);
 * await builder.show();
 * ```
 */

import * as vscode from 'vscode';
import { NotificationAction, NotificationConfig } from '../../../types/notification.types';

/**
 * Builder for warning notifications
 *
 * Provides fluent API for creating warning notifications with auto-dismiss,
 * actions, and modal support. Uses VSCode showWarningMessage API.
 *
 * @class WarningBuilder
 */
export class WarningBuilder {
	/**
	 * Warning message to display
	 * @private
	 */
	private message: string;

	/**
	 * Auto-dismiss duration in milliseconds
	 * @private
	 * @default 3000
	 */
	private duration: number = 3000;

	/**
	 * Action buttons with callbacks
	 * @private
	 */
	private actions: NotificationAction[] = [];

	/**
	 * Whether to block other actions until dismissed
	 * @private
	 * @default false
	 */
	private modal: boolean = false;

	/**
	 * Creates a new WarningBuilder instance
	 *
	 * @param message - Warning message to display
	 * @param config - Optional configuration (duration, actions, modal)
	 *
	 * @example
	 * ```typescript
	 * const builder = new WarningBuilder('Connection lost', { duration: 5000 });
	 * ```
	 */
	constructor(message: string, config: Partial<NotificationConfig>) {
		this.message = message;
		if (config.duration !== undefined) {
			this.duration = config.duration;
		}
	}

	/**
	 * Sets auto-dismiss duration
	 *
	 * @param ms - Duration in milliseconds (0 = never dismiss)
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withDuration(5000); // 5 seconds
	 * builder.withDuration(0);    // Never dismiss
	 * ```
	 */
	public withDuration(ms: number): this {
		this.duration = ms;
		return this;
	}

	/**
	 * Adds action buttons with callbacks
	 *
	 * @param actions - Array of action buttons to display
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withActions([
	 *   { title: 'Retry', action: async () => await retry() },
	 *   { title: 'Cancel', action: () => cancel() }
	 * ]);
	 * ```
	 */
	public withActions(actions: NotificationAction[]): this {
		this.actions = actions;
		return this;
	}

	/**
	 * Sets modal behavior
	 *
	 * Modal notifications block other actions until user responds.
	 *
	 * @param modal - Whether to show as modal
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withModal(true); // Block until dismissed
	 * ```
	 */
	public withModal(modal: boolean): this {
		this.modal = modal;
		return this;
	}

	/**
	 * Displays the warning notification
	 *
	 * Automatically chooses between auto-dismiss (with icon) or action-based display.
	 * Handles errors gracefully by showing error notification on failure.
	 *
	 * @returns Promise that resolves when notification is dismissed
	 *
	 * @example
	 * ```typescript
	 * await builder.show();
	 * ```
	 */
	public async show(): Promise<void> {
		try {
			if (this.duration > 0 && this.actions.length === 0) {
				await this.showAutoDismiss();
			} else {
				await this.showWithActions();
			}
		} catch (error) {
			console.error('[Prisma] Warning notification failed:', error);
			vscode.window.showErrorMessage(`Notification error: ${error}`);
		}
	}

	/**
	 * Shows auto-dismiss warning with icon
	 *
	 * Uses withProgress API to display warning with ⚠️ icon that auto-dismisses
	 * after configured duration.
	 *
	 * @private
	 * @returns Promise that resolves after duration elapsed
	 */
	private async showAutoDismiss(): Promise<void> {
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: `⚠️ ${this.message}`, // Warning icon
				cancellable: false
			},
			async () => {
				await new Promise(resolve => setTimeout(resolve, this.duration));
			}
		);
	}

	/**
	 * Shows warning with action buttons
	 *
	 * Uses showWarningMessage API to display warning with action buttons.
	 * Executes callback of selected action when user clicks a button.
	 *
	 * @private
	 * @returns Promise that resolves when user selects an action or dismisses
	 */
	private async showWithActions(): Promise<void> {
		const actionTitles = this.actions.map(a => a.title);
		const selected = await vscode.window.showWarningMessage(
			this.message,
			{ modal: this.modal },
			...actionTitles
		);

		if (selected) {
			const action = this.actions.find(a => a.title === selected);
			if (action) {
				await action.action();
			}
		}
	}
}
