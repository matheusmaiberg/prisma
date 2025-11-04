/**
 * Progress Notification Builder
 *
 * Implements Builder Pattern for progress notifications using VSCode withProgress API.
 * Provides fluent API for configuring cancellable operations and progress location.
 *
 * Features:
 * - Determinate progress (0-100% with increment)
 * - Indeterminate progress (spinner without increment)
 * - Cancellable operations with cancellation token
 * - Flexible progress location (Notification, Window, SourceControl)
 * - Graceful error handling
 * - Method chaining (fluent interface)
 *
 * @module notification.builders.progressBuilder
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window.withProgress VSCode withProgress}
 *
 * @example
 * ```typescript
 * // Determinate progress (0-100%)
 * await factory.progress('Creating spec...')
 *   .withCancellable(true)
 *   .run(async (progress, token) => {
 *     progress.report({ increment: 25, message: 'Analyzing requirements...' });
 *     await doWork1();
 *     progress.report({ increment: 25, message: 'Generating design...' });
 *     await doWork2();
 *     progress.report({ increment: 25, message: 'Creating tasks...' });
 *     await doWork3();
 *     progress.report({ increment: 25, message: 'Finalizing...' });
 *     await doWork4();
 *   });
 *
 * // Indeterminate progress (spinner)
 * await factory.progress('Processing...')
 *   .withLocation(vscode.ProgressLocation.Window)
 *   .run(async (progress) => {
 *     progress.report({ message: 'Working...' });
 *     await longRunningTask();
 *   });
 *
 * // Cancellable operation
 * await factory.progress('Downloading...')
 *   .withCancellable(true)
 *   .run(async (progress, token) => {
 *     for (let i = 0; i < 100; i++) {
 *       if (token.isCancellationRequested) {
 *         console.log('Operation cancelled by user');
 *         return;
 *       }
 *       progress.report({ increment: 1 });
 *       await downloadChunk(i);
 *     }
 *   });
 * ```
 */

import * as vscode from 'vscode';
import { NotificationConfig } from '../../../types/notification.types';

/**
 * Builder for progress notifications
 *
 * Provides fluent API for creating progress notifications with determinate/indeterminate progress,
 * cancellation support, and flexible location. Uses VSCode withProgress API.
 *
 * @class ProgressBuilder
 */
export class ProgressBuilder {
	/**
	 * Progress title/message to display
	 * @private
	 */
	private message: string;

	/**
	 * Whether user can cancel the operation
	 * @private
	 * @default false
	 */
	private cancellable: boolean = false;

	/**
	 * Where to show progress indicator
	 * @private
	 * @default vscode.ProgressLocation.Notification
	 */
	private location: vscode.ProgressLocation = vscode.ProgressLocation.Notification;

	/**
	 * Creates a new ProgressBuilder instance
	 *
	 * @param message - Progress title/message to display
	 * @param config - Optional configuration (currently unused for progress, reserved for future)
	 *
	 * @example
	 * ```typescript
	 * const builder = new ProgressBuilder('Processing data...', {});
	 * ```
	 */
	constructor(message: string, config: Partial<NotificationConfig>) {
		this.message = message;
		// Config reserved for future use (e.g., duration, severity overrides)
	}

	/**
	 * Makes progress operation cancellable
	 *
	 * When true, user can cancel the operation by clicking cancel button.
	 * Task callback receives cancellation token to detect cancellation.
	 *
	 * @param cancellable - Whether user can cancel the operation
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withCancellable(true); // User can cancel
	 * builder.withCancellable(false); // No cancel button
	 * ```
	 */
	public withCancellable(cancellable: boolean): this {
		this.cancellable = cancellable;
		return this;
	}

	/**
	 * Sets progress indicator location
	 *
	 * Determines where the progress indicator appears:
	 * - Notification: Bottom-right notification area (default)
	 * - Window: Top center of window (status bar area)
	 * - SourceControl: Source control view (for SCM operations)
	 *
	 * @param location - Progress location (Notification, Window, SourceControl)
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withLocation(vscode.ProgressLocation.Notification); // Bottom-right
	 * builder.withLocation(vscode.ProgressLocation.Window);       // Top center
	 * builder.withLocation(vscode.ProgressLocation.SourceControl); // SCM view
	 * ```
	 */
	public withLocation(location: vscode.ProgressLocation): this {
		this.location = location;
		return this;
	}

	/**
	 * Runs async task with progress indicator
	 *
	 * Executes the provided task callback with progress reporting capability.
	 * Task receives:
	 * - progress: Object with report() method for updating progress
	 * - token: Cancellation token to detect user cancellation
	 *
	 * Progress reporting modes:
	 * - Determinate: Use { increment: number } (0-100%)
	 * - Indeterminate: Use { message: string } (spinner only)
	 * - Both: Use { increment: number, message: string }
	 *
	 * Performance: Display time < 50ms (p95) per RNF-001
	 *
	 * @template T - Return type of the task
	 * @param task - Async task that receives progress callback and cancellation token
	 * @returns Promise that resolves to task result, or undefined if error occurs
	 *
	 * @example
	 * ```typescript
	 * // Determinate progress (0-100%)
	 * const result = await builder.run(async (progress, token) => {
	 *   progress.report({ increment: 50, message: 'Step 1...' });
	 *   await doWork1();
	 *   progress.report({ increment: 50, message: 'Step 2...' });
	 *   await doWork2();
	 *   return 'success';
	 * });
	 *
	 * // Indeterminate progress (spinner)
	 * await builder.run(async (progress) => {
	 *   progress.report({ message: 'Processing...' });
	 *   await longTask();
	 * });
	 *
	 * // Cancellable operation
	 * await builder.withCancellable(true).run(async (progress, token) => {
	 *   for (let i = 0; i < 100; i++) {
	 *     if (token.isCancellationRequested) {
	 *       console.log('Cancelled by user');
	 *       return;
	 *     }
	 *     progress.report({ increment: 1 });
	 *     await processItem(i);
	 *   }
	 * });
	 * ```
	 */
	public async run<T>(
		task: (
			progress: vscode.Progress<{ message?: string; increment?: number }>,
			token: vscode.CancellationToken
		) => Promise<T>
	): Promise<T | undefined> {
		try {
			// Call VSCode withProgress API with configured options
			return await vscode.window.withProgress(
				{
					location: this.location,
					title: this.message,
					cancellable: this.cancellable
				},
				task
			);
		} catch (error) {
			// Graceful degradation (RNF-008): Log error but don't crash extension
			console.error('[Prisma] Progress notification failed:', error);
			vscode.window.showErrorMessage(`Progress error: ${error}`);
			return undefined;
		}
	}
}
