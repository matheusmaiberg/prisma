/**
 * Confirmation Notification Builder
 *
 * Implements Builder Pattern for confirmation dialogs using VSCode showInformationMessage API.
 * Provides fluent API for creating Yes/No, Confirm/Cancel type dialogs.
 *
 * Features:
 * - Customizable action buttons (e.g., ['Delete', 'Cancel'])
 * - Modal vs non-modal display
 * - Returns selected action as string or undefined if cancelled
 * - Graceful error handling
 * - Method chaining (fluent interface)
 *
 * @module notification.builders.confirmationBuilder
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage VSCode showInformationMessage}
 *
 * @example
 * ```typescript
 * // Simple Yes/No confirmation
 * const builder = new ConfirmationBuilder('Continue with operation?', {});
 * const choice = await builder.show();
 * if (choice === 'Yes') {
 *   // User confirmed
 * }
 *
 * // Delete confirmation (modal)
 * const builder = new ConfirmationBuilder('Delete spec "my-feature"?', {})
 *   .withActions(['Delete', 'Cancel'])
 *   .withModal(true);
 * const choice = await builder.show();
 * if (choice === 'Delete') {
 *   await deleteSpec();
 * }
 *
 * // Custom actions
 * const builder = new ConfirmationBuilder('Save changes?', {})
 *   .withActions(['Save', 'Discard', 'Cancel'])
 *   .withModal(true);
 * const choice = await builder.show();
 * switch (choice) {
 *   case 'Save': await save(); break;
 *   case 'Discard': break;
 *   case 'Cancel': return;
 * }
 * ```
 */

import * as vscode from 'vscode';
import { NotificationConfig } from '../../../types/notification.types';

/**
 * Builder for confirmation dialogs
 *
 * Provides fluent API for creating confirmation dialogs (Yes/No, Confirm/Cancel).
 * Uses VSCode showInformationMessage API with action buttons.
 *
 * @class ConfirmationBuilder
 */
export class ConfirmationBuilder {
	/**
	 * Confirmation message to display
	 * @private
	 */
	private message: string;

	/**
	 * Action button labels
	 * @private
	 * @default ['Yes', 'No']
	 */
	private actions: string[] = ['Yes', 'No'];

	/**
	 * Whether to block other actions until user decides
	 * @private
	 * @default false
	 */
	private modal: boolean = false;

	/**
	 * Creates a new ConfirmationBuilder instance
	 *
	 * @param message - Confirmation question to display
	 * @param config - Optional configuration (modal, actions can be overridden via methods)
	 *
	 * @example
	 * ```typescript
	 * const builder = new ConfirmationBuilder('Delete this item?', {});
	 * ```
	 */
	constructor(message: string, config: Partial<NotificationConfig>) {
		this.message = message;
		// Apply config if provided (future extensibility)
		if (config.modal !== undefined) {
			this.modal = config.modal;
		}
	}

	/**
	 * Sets action button labels
	 *
	 * Action buttons are displayed in the order provided.
	 * User clicking a button resolves show() with that button's label.
	 * User pressing ESC or clicking outside (if not modal) returns undefined.
	 *
	 * @param actions - Array of action button labels (e.g., ['Delete', 'Cancel'])
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withActions(['Delete', 'Cancel']);
	 * builder.withActions(['Save', 'Discard', 'Cancel']);
	 * ```
	 */
	public withActions(actions: string[]): this {
		this.actions = actions;
		return this;
	}

	/**
	 * Sets modal behavior
	 *
	 * Modal confirmations block other actions until user makes a decision.
	 * Use modal for destructive operations (delete, reset) to force explicit choice.
	 *
	 * @param modal - Whether to show as modal (blocks other actions)
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withModal(true);  // Force user decision
	 * builder.withModal(false); // Allow cancellation by clicking outside
	 * ```
	 */
	public withModal(modal: boolean): this {
		this.modal = modal;
		return this;
	}

	/**
	 * Displays the confirmation dialog
	 *
	 * Shows confirmation using VSCode showInformationMessage API with action buttons.
	 * Returns the label of the clicked action button, or undefined if user cancelled (ESC).
	 *
	 * Performance: Display time < 50ms (p95) per RNF-001
	 *
	 * @returns Promise resolving to selected action label (string) or undefined if cancelled
	 *
	 * @example
	 * ```typescript
	 * const choice = await builder
	 *   .withActions(['Delete', 'Cancel'])
	 *   .withModal(true)
	 *   .show();
	 *
	 * if (choice === 'Delete') {
	 *   // User confirmed deletion
	 *   await performDelete();
	 * } else {
	 *   // User cancelled (choice === 'Cancel' or undefined)
	 *   console.log('Operation cancelled');
	 * }
	 * ```
	 */
	public async show(): Promise<string | undefined> {
		try {
			// Use showInformationMessage (not showWarningMessage) for neutrality
			// Modal option forces user decision if enabled
			return await vscode.window.showInformationMessage(
				this.message,
				{ modal: this.modal },
				...this.actions
			);
		} catch (error) {
			// Graceful degradation (RNF-008)
			console.error('[Prisma] Confirmation notification failed:', error);
			vscode.window.showErrorMessage(`Confirmation error: ${error}`);
			return undefined;
		}
	}
}
