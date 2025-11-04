/**
 * ErrorBuilder - Builder for error notifications
 *
 * Implements the Builder Pattern for creating error notifications with fluent API.
 * Error notifications indicate critical failures that require immediate user attention.
 * By default, they never auto-dismiss to ensure the user sees critical errors.
 *
 * @module notification.builders.errorBuilder
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window.showErrorMessage VSCode Error Message API}
 *
 * @example
 * ```typescript
 * // Simple error notification
 * await factory.error('Failed to save spec').show();
 *
 * // Error with retry action
 * await factory.error('Network error occurred')
 *   .withActions([
 *     { title: 'Retry', action: async () => retryOperation() },
 *     { title: 'Cancel', action: () => {} }
 *   ])
 *   .show();
 *
 * // Error with custom duration (auto-dismiss)
 * await factory.error('Minor validation error')
 *   .withDuration(5000)
 *   .show();
 *
 * // Modal error (blocks other actions)
 * await factory.error('Critical: Data loss may occur')
 *   .withModal(true)
 *   .show();
 * ```
 *
 * @safety
 * ErrorBuilder has extra graceful degradation:
 * - If VSCode API fails, falls back to console.error
 * - If console.error fails, logs to output channel
 * - Never throws errors to prevent extension crash
 */

import * as vscode from 'vscode';
import { NotificationAction, NotificationConfig } from '../../../types/notification.types';

/**
 * Builder class for error notifications
 *
 * Provides fluent API for configuring and displaying error notifications.
 * Implements graceful degradation with multiple fallback strategies.
 *
 * @performance
 * - show(): < 50ms (p95) - RNF-001
 * - Extra safety checks add < 0.5ms overhead
 *
 * @example
 * ```typescript
 * const builder = new ErrorBuilder('Failed to load config', {
 *   duration: 0, // Never auto-dismiss
 *   showIcons: true
 * });
 *
 * await builder
 *   .withActions([
 *     { title: 'Retry', action: () => retry() }
 *   ])
 *   .show();
 * ```
 */
export class ErrorBuilder {
	private message: string;
	private duration: number = 0; // Errors don't auto-dismiss by default
	private actions: NotificationAction[] = [];
	private modal: boolean = false;
	private config: Partial<NotificationConfig>;

	/**
	 * Create a new ErrorBuilder
	 *
	 * @param message - Error message to display
	 * @param config - Configuration from factory (user defaults + type overrides)
	 *
	 * @example
	 * ```typescript
	 * const builder = new ErrorBuilder('File not found', { duration: 0 });
	 * ```
	 */
	constructor(message: string, config: Partial<NotificationConfig>) {
		this.message = message;
		this.config = config;

		// Apply config defaults
		if (config.duration !== undefined) {
			this.duration = config.duration;
		}
		if (config.modal !== undefined) {
			this.modal = config.modal;
		}
		if (config.actions !== undefined) {
			this.actions = config.actions;
		}
	}

	/**
	 * Set auto-dismiss duration
	 *
	 * By default, errors never auto-dismiss (duration = 0).
	 * Set a positive duration to enable auto-dismiss.
	 *
	 * @param ms - Duration in milliseconds (0 = never dismiss)
	 * @returns this (for method chaining)
	 *
	 * @example
	 * ```typescript
	 * // Auto-dismiss after 5 seconds
	 * await builder.withDuration(5000).show();
	 *
	 * // Never auto-dismiss (default)
	 * await builder.withDuration(0).show();
	 * ```
	 */
	public withDuration(ms: number): this {
		this.duration = ms;
		return this;
	}

	/**
	 * Add action buttons to error notification
	 *
	 * Action buttons allow user to take immediate action (e.g., Retry, Cancel).
	 * When actions are present, auto-dismiss is disabled regardless of duration.
	 *
	 * @param actions - Array of action buttons
	 * @returns this (for method chaining)
	 *
	 * @example
	 * ```typescript
	 * await builder.withActions([
	 *   { title: 'Retry', action: async () => retryOperation() },
	 *   { title: 'View Logs', action: () => openLogs() },
	 *   { title: 'Cancel', action: () => {} }
	 * ]).show();
	 * ```
	 */
	public withActions(actions: NotificationAction[]): this {
		this.actions = actions;
		return this;
	}

	/**
	 * Set modal mode
	 *
	 * Modal errors block other actions until user dismisses.
	 * Use for critical errors that require immediate attention.
	 *
	 * @param modal - Whether to show as modal dialog
	 * @returns this (for method chaining)
	 *
	 * @example
	 * ```typescript
	 * // Modal error (blocks other actions)
	 * await builder.withModal(true).show();
	 *
	 * // Non-modal error (default)
	 * await builder.withModal(false).show();
	 * ```
	 */
	public withModal(modal: boolean): this {
		this.modal = modal;
		return this;
	}

	/**
	 * Display the error notification
	 *
	 * Implements graceful degradation strategy:
	 * 1. Try vscode.window.showErrorMessage (primary)
	 * 2. If fails, fallback to console.error (secondary)
	 * 3. If fails, log to output channel (tertiary)
	 * 4. Never throw errors (ultimate safety)
	 *
	 * @returns Promise that resolves when notification is shown
	 * @performance < 50ms (p95) - RNF-001
	 * @safety Triple fallback strategy (RNF-008)
	 *
	 * @example
	 * ```typescript
	 * // Simple show
	 * await builder.show();
	 *
	 * // With chaining
	 * await factory.error('Failed')
	 *   .withActions([{ title: 'Retry', action: retry }])
	 *   .show();
	 * ```
	 */
	public async show(): Promise<void> {
		try {
			if (this.duration > 0 && this.actions.length === 0) {
				// Auto-dismiss mode (no actions)
				await this.showAutoDismiss();
			} else {
				// With actions or never dismiss
				await this.showWithActions();
			}
		} catch (error) {
			// Extra caution for error notifications (RNF-008)
			// First fallback: console.error
			try {
				console.error('[Prisma] Error notification failed:', error);
				console.error('[Prisma] Original error message:', this.message);
			} catch (consoleError) {
				// Second fallback: Try to log to output channel if available
				// This is a best-effort approach, may not work if output channel unavailable
				try {
					// Try to get global output channel if set (MAJOR-001 mitigation)
					const globalContext = (global as any).__prismaContext;
					if (globalContext?.outputChannel) {
						globalContext.outputChannel.appendLine(
							`[NotificationManager] CRITICAL: Error notification failed: ${error}`
						);
						globalContext.outputChannel.appendLine(
							`[NotificationManager] Original error: ${this.message}`
						);
					}
				} catch (outputError) {
					// Ultimate fallback: Silent failure (don't crash extension)
					// This is the last resort - if we can't even log, we give up gracefully
				}
			}
		}
	}

	/**
	 * Show auto-dismiss error notification
	 *
	 * Uses vscode.window.withProgress for auto-dismiss behavior.
	 * Displays error icon (❌) in notification title.
	 *
	 * @private
	 * @performance < 50ms (p95)
	 */
	private async showAutoDismiss(): Promise<void> {
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: `❌ ${this.message}`, // Error icon
				cancellable: false
			},
			async () => {
				await new Promise(resolve => setTimeout(resolve, this.duration));
			}
		);
	}

	/**
	 * Show error notification with action buttons
	 *
	 * Uses vscode.window.showErrorMessage with optional modal and actions.
	 * Wraps action callbacks in try-catch for graceful degradation.
	 *
	 * @private
	 * @performance < 50ms (p95)
	 */
	private async showWithActions(): Promise<void> {
		const actionTitles = this.actions.map(a => a.title);
		const selected = await vscode.window.showErrorMessage(
			this.message,
			{ modal: this.modal },
			...actionTitles
		);

		if (selected) {
			const action = this.actions.find(a => a.title === selected);
			if (action) {
				try {
					await action.action();
				} catch (error) {
					// Graceful degradation: log error but don't crash
					console.error('[Prisma] Error notification action failed:', error);
				}
			}
		}
	}
}
