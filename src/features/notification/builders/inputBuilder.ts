/**
 * Input Notification Builder
 *
 * Implements Builder Pattern for input dialogs using VSCode showInputBox API.
 * Provides fluent API for configuring placeholder, validation, and password mode.
 *
 * Features:
 * - Placeholder text support
 * - Real-time validation with error messages
 * - Password mode (hidden characters)
 * - Graceful error handling
 * - Method chaining (fluent interface)
 *
 * @module notification.builders.inputBuilder
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window.showInputBox VSCode showInputBox}
 *
 * @example
 * ```typescript
 * // Simple input
 * const builder = new InputBuilder('Enter spec name', {});
 * const name = await builder.show();
 *
 * // Input with validation
 * const builder = new InputBuilder('Enter spec name', {})
 *   .withPlaceholder('my-feature')
 *   .withValidation((value) =>
 *     /^[a-z0-9-]+$/.test(value) ? undefined : 'Use kebab-case'
 *   );
 * const name = await builder.show();
 *
 * // Password input
 * const builder = new InputBuilder('Enter API key', {})
 *   .withPassword(true)
 *   .withPlaceholder('sk-...');
 * const apiKey = await builder.show();
 * ```
 */

import * as vscode from 'vscode';
import { NotificationConfig } from '../../../types/notification.types';

/**
 * Builder for input dialogs
 *
 * Provides fluent API for creating input notifications with placeholder,
 * validation, and password support. Uses VSCode showInputBox API.
 *
 * @class InputBuilder
 */
export class InputBuilder {
	/**
	 * Prompt text displayed above input box
	 * @private
	 */
	private prompt: string;

	/**
	 * Placeholder text shown in empty input box
	 * @private
	 */
	private placeholder?: string;

	/**
	 * Validation function returning error message or undefined if valid
	 * @private
	 */
	private validation?: (value: string) => string | undefined;

	/**
	 * Whether to hide input characters (password mode)
	 * @private
	 * @default false
	 */
	private password: boolean = false;

	/**
	 * Creates a new InputBuilder instance
	 *
	 * @param prompt - Prompt text to display above input
	 * @param config - Optional configuration (currently unused for inputs)
	 *
	 * @example
	 * ```typescript
	 * const builder = new InputBuilder('Enter spec name', {});
	 * ```
	 */
	constructor(prompt: string, config: Partial<NotificationConfig>) {
		this.prompt = prompt;
		// Config parameter preserved for API consistency with other builders
		// Future extensions may use config (e.g., theming, icons)
	}

	/**
	 * Sets placeholder text
	 *
	 * Placeholder is shown in light gray when input is empty,
	 * providing example or hint for expected format.
	 *
	 * @param placeholder - Placeholder text
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * builder.withPlaceholder('my-feature-name');
	 * builder.withPlaceholder('sk-1234567890abcdef');
	 * ```
	 */
	public withPlaceholder(placeholder: string): this {
		this.placeholder = placeholder;
		return this;
	}

	/**
	 * Sets validation function
	 *
	 * Validation function is called in real-time as user types.
	 * Return error string to show validation error, or undefined if input is valid.
	 *
	 * Implements RF-003 (Builder Pattern API) and RNF-007 (Input Sanitization).
	 *
	 * @param validation - Function that returns error string or undefined if valid
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * // Kebab-case validation
	 * builder.withValidation((value) =>
	 *   /^[a-z0-9-]+$/.test(value)
	 *     ? undefined
	 *     : 'Use kebab-case (lowercase, hyphens only)'
	 * );
	 *
	 * // Non-empty validation
	 * builder.withValidation((value) =>
	 *   value.trim().length > 0
	 *     ? undefined
	 *     : 'Input cannot be empty'
	 * );
	 *
	 * // Email validation
	 * builder.withValidation((value) =>
	 *   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
	 *     ? undefined
	 *     : 'Invalid email format'
	 * );
	 * ```
	 */
	public withValidation(validation: (value: string) => string | undefined): this {
		this.validation = validation;
		return this;
	}

	/**
	 * Sets password mode
	 *
	 * When enabled, input characters are replaced with bullets (•••).
	 * Use for sensitive data like passwords, API keys, tokens.
	 *
	 * Implements RNF-007 (Security - Input Sanitization).
	 *
	 * @param password - Whether to hide input characters
	 * @returns This builder instance for chaining
	 *
	 * @example
	 * ```typescript
	 * // Password input
	 * builder.withPassword(true);
	 *
	 * // Normal input
	 * builder.withPassword(false);
	 * ```
	 */
	public withPassword(password: boolean): this {
		this.password = password;
		return this;
	}

	/**
	 * Shows input dialog
	 *
	 * Displays input box with configured prompt, placeholder, validation, and password mode.
	 * Returns user input when confirmed (Enter), or undefined if cancelled (Escape).
	 *
	 * Handles errors gracefully by showing error notification on failure (RNF-008).
	 * Implements RF-009 (Input Notification).
	 *
	 * Performance: Display time < 50ms (p95) per RNF-001
	 *
	 * @returns Promise with user input (undefined if cancelled)
	 *
	 * @example
	 * ```typescript
	 * const input = await builder.show();
	 * if (input !== undefined) {
	 *   console.log('User entered:', input);
	 * } else {
	 *   console.log('User cancelled');
	 * }
	 * ```
	 */
	public async show(): Promise<string | undefined> {
		try {
			return await vscode.window.showInputBox({
				prompt: this.prompt,
				placeHolder: this.placeholder,
				validateInput: this.validation,
				password: this.password
			});
		} catch (error) {
			// Graceful degradation (RNF-008)
			console.error('[Prisma] Input notification failed:', error);
			vscode.window.showErrorMessage(`Input error: ${error}`);
			return undefined;
		}
	}
}
