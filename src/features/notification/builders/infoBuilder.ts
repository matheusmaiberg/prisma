/**
 * Info Notification Builder
 *
 * Implements Builder Pattern for informational notifications using VSCode showInformationMessage API.
 * Provides fluent API for configuring auto-dismiss, actions, and modal behavior.
 *
 * Features:
 * - Auto-dismiss with info icon (ℹ️)
 * - Action buttons with callbacks
 * - Modal vs non-modal display
 * - Graceful error handling
 * - Method chaining (fluent interface)
 *
 * @module notification.builders.infoBuilder
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage VSCode showInformationMessage}
 *
 * @example
 * ```typescript
 * // Auto-dismiss info (3 seconds)
 * const builder = new InfoBuilder('Spec created successfully', { duration: 3000 });
 * await builder.show();
 *
 * // Info with actions
 * const builder = new InfoBuilder('Design approved', {})
 *   .withActions([
 *     { title: 'View', action: async () => await viewDesign() },
 *     { title: 'Close', action: () => {} }
 *   ])
 *   .withModal(false);
 * await builder.show();
 *
 * // Custom duration
 * const builder = new InfoBuilder('Task completed', { duration: 5000 })
 *   .withDuration(5000);
 * await builder.show();
 * ```
 */

import * as vscode from 'vscode';
import { NotificationAction, NotificationConfig } from '../../../types/notification.types';

/**
 * Builder for informational notifications
 *
 * Provides fluent API for creating info notifications with auto-dismiss,
 * actions, and modal support. Uses VSCode showInformationMessage API.
 *
 * @class InfoBuilder
 */
export class InfoBuilder {
	/**
	 * Info message to display
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
	 * Creates a new InfoBuilder instance
	 *
	 * @param message - Info message to display
	 * @param config - Optional configuration (duration, actions, modal)
	 *
	 * @example
	 * ```typescript
	 * const builder = new InfoBuilder('Operation successful', { duration: 3000 });
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
	 *   { title: 'Open', action: async () => await open() },
	 *   { title: 'Dismiss', action: () => {} }
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
	 * Displays the info notification
	 *
	 * Automatically chooses between auto-dismiss (with icon) or action-based display.
	 * Handles errors gracefully by showing error notification on failure.
	 *
	 * Performance: Display time < 50ms (p95) per RNF-001
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
			// Graceful degradation (RNF-008)
			console.error('[Prisma] Info notification failed:', error);
			vscode.window.showErrorMessage(`Notification error: ${error}`);
		}
	}

	/**
	 * Shows auto-dismiss info with icon
	 *
	 * Uses withProgress API to display info with ℹ️ icon that auto-dismisses
	 * after configured duration. Implements RF-007 (Auto-Dismiss Notification).
	 *
	 * @private
	 * @returns Promise that resolves after duration elapsed
	 */
	private async showAutoDismiss(): Promise<void> {
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: `ℹ️ ${this.message}`, // Info icon
				cancellable: false
			},
			async () => {
				await new Promise(resolve => setTimeout(resolve, this.duration));
			}
		);
	}

	/**
	 * Shows info with action buttons
	 *
	 * Uses showInformationMessage API to display info with action buttons.
	 * Executes callback of selected action when user clicks a button.
	 * Implements RF-011 (Notification Actions).
	 *
	 * @private
	 * @returns Promise that resolves when user selects an action or dismisses
	 */
	private async showWithActions(): Promise<void> {
		const actionTitles = this.actions.map(a => a.title);
		const selected = await vscode.window.showInformationMessage(
			this.message,
			{ modal: this.modal },
			...actionTitles
		);

		// Execute selected action (RF-011)
		if (selected) {
			const action = this.actions.find(a => a.title === selected);
			if (action) {
				await action.action();
			}
		}
	}
}
