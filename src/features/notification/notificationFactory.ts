/**
 * NotificationFactory - Factory for creating notification builders
 *
 * This class provides factory methods to create type-specific notification builders
 * with lazy loading strategy for optimal performance.
 *
 * @module notification.notificationFactory
 * @see {@link NotificationSettings} for configuration structure
 */

import * as vscode from 'vscode';
import { NotificationType, NotificationSettings, NotificationConfig } from '../../types/notification.types';
import { InfoBuilder } from './builders/infoBuilder';
import { WarningBuilder } from './builders/warningBuilder';
import { ErrorBuilder } from './builders/errorBuilder';

/**
 * Factory class for creating notification builders
 *
 * Implements lazy loading pattern and strategy pattern for type-specific builders.
 * Each builder is loaded on-demand to minimize instantiation time (< 1ms target).
 *
 * @example
 * ```typescript
 * const factory = new NotificationFactory(settings);
 *
 * // Create info notification
 * await factory.info('Task completed').show();
 *
 * // Create with custom duration
 * await factory.info('Processing...').withDuration(5000).show();
 *
 * // Create with type-specific config
 * await factory.info('Spec created').withType('spec.created').show();
 * ```
 */
export class NotificationFactory {
	private settings: NotificationSettings;

	/**
	 * Create a new NotificationFactory
	 *
	 * @param settings - Notification settings (from ConfigManager)
	 */
	constructor(settings: NotificationSettings) {
		this.settings = settings;
	}

	/**
	 * Create info notification builder
	 *
	 * Info notifications are used for informational messages that don't require
	 * immediate attention. They auto-dismiss by default.
	 *
	 * @param message - Message to display
	 * @returns InfoBuilder instance (loaded lazily)
	 * @example
	 * ```typescript
	 * // Simple info notification
	 * factory.info('Task completed').show();
	 *
	 * // With custom duration
	 * factory.info('Processing...').withDuration(5000).show();
	 *
	 * // With actions
	 * factory.info('Spec created')
	 *   .withActions([
	 *     { title: 'Open', action: () => openSpec() }
	 *   ])
	 *   .show();
	 * ```
	 */
	public info(message: string): InfoBuilder {
		const config = this.getConfigForType('info');
		return new InfoBuilder(message, config);
	}

	/**
	 * Create warning notification builder
	 *
	 * Warning notifications indicate potential issues that require attention
	 * but don't block workflow.
	 *
	 * @param message - Warning message to display
	 * @returns WarningBuilder instance (loaded lazily)
	 * @example
	 * ```typescript
	 * // Simple warning
	 * factory.warning('Large file detected').show();
	 *
	 * // With modal dialog
	 * factory.warning('Unsaved changes')
	 *   .withModal(true)
	 *   .show();
	 * ```
	 */
	public warning(message: string): WarningBuilder {
		const config = this.getConfigForType('warning');
		return new WarningBuilder(message, config);
	}

	/**
	 * Create error notification builder
	 *
	 * Error notifications indicate critical failures that require immediate attention.
	 * These notifications never auto-dismiss by default.
	 *
	 * @param message - Error message to display
	 * @returns ErrorBuilder instance (loaded lazily)
	 * @example
	 * ```typescript
	 * // Simple error
	 * factory.error('Failed to save file').show();
	 *
	 * // With retry action
	 * factory.error('Network error')
	 *   .withActions([
	 *     { title: 'Retry', action: () => retryOperation() }
	 *   ])
	 *   .show();
	 * ```
	 */
	public error(message: string): ErrorBuilder {
		const config = this.getConfigForType('error');
		return new ErrorBuilder(message, config);
	}

	/**
	 * Create progress notification builder
	 *
	 * Progress notifications show long-running operations with optional progress
	 * indicators (determinate or indeterminate).
	 *
	 * @param message - Progress message to display
	 * @returns ProgressBuilder instance (loaded lazily)
	 * @example
	 * ```typescript
	 * // Indeterminate progress
	 * factory.progress('Creating spec...')
	 *   .withCancellable(true)
	 *   .run(async (progress) => {
	 *     await doWork();
	 *   });
	 *
	 * // Determinate progress
	 * factory.progress('Processing files...')
	 *   .run(async (progress) => {
	 *     progress.report({ increment: 25, message: 'Step 1/4' });
	 *     await step1();
	 *     progress.report({ increment: 25, message: 'Step 2/4' });
	 *     await step2();
	 *   });
	 * ```
	 */
	public progress(message: string) {
		// TODO: TASK-012 will implement ProgressBuilder
		throw new Error('ProgressBuilder not implemented - depends on TASK-012');
	}

	/**
	 * Create input dialog builder
	 *
	 * Input notifications prompt the user for text input with optional validation.
	 *
	 * @param prompt - Prompt text to display
	 * @returns InputBuilder instance (loaded lazily)
	 * @example
	 * ```typescript
	 * // Simple input
	 * const name = await factory.input('Enter spec name')
	 *   .withPlaceholder('my-feature')
	 *   .show();
	 *
	 * // With validation
	 * const name = await factory.input('Enter spec name')
	 *   .withPlaceholder('my-feature')
	 *   .withValidation((value) => {
	 *     if (!/^[a-z0-9-]+$/.test(value)) {
	 *       return 'Use kebab-case (lowercase, hyphens only)';
	 *     }
	 *     return undefined; // Valid
	 *   })
	 *   .show();
	 * ```
	 */
	public input(prompt: string) {
		// TODO: TASK-013 will implement InputBuilder
		throw new Error('InputBuilder not implemented - depends on TASK-013');
	}

	/**
	 * Create confirmation dialog builder
	 *
	 * Confirmation notifications ask the user to choose between multiple options
	 * (typically Yes/No or Confirm/Cancel).
	 *
	 * @param message - Confirmation message to display
	 * @returns ConfirmationBuilder instance (loaded lazily)
	 * @example
	 * ```typescript
	 * // Simple confirmation
	 * const result = await factory.confirmation('Delete spec "my-feature"?')
	 *   .withActions(['Delete', 'Cancel'])
	 *   .show();
	 *
	 * if (result === 'Delete') {
	 *   await deleteSpec();
	 * }
	 *
	 * // Modal confirmation (blocks other actions)
	 * const result = await factory.confirmation('Unsaved changes. Save before closing?')
	 *   .withActions(['Save', 'Discard', 'Cancel'])
	 *   .withModal(true)
	 *   .show();
	 * ```
	 */
	public confirmation(message: string) {
		// TODO: TASK-014 will implement ConfirmationBuilder
		throw new Error('ConfirmationBuilder not implemented - depends on TASK-014');
	}

	/**
	 * Get type-specific configuration
	 *
	 * Applies configuration precedence: type config > user defaults > system defaults.
	 * Uses deep merge to combine configuration from multiple sources.
	 *
	 * @param type - Notification type identifier (e.g., 'spec.created', 'permission.denied')
	 * @returns Merged configuration (defaults + user + type-specific)
	 * @example
	 * ```typescript
	 * // Get config for specific type
	 * const config = factory.getConfigForType('spec.created');
	 * // Returns: { duration: 5000, severity: 'info', ... }
	 *
	 * // Get default config (no type specified)
	 * const defaultConfig = factory.getConfigForType();
	 * // Returns: { duration: 3000, showIcons: true, ... }
	 * ```
	 */
	public getConfigForType(type?: string): NotificationConfig {
		// Start with system defaults
		const config: NotificationConfig = {
			duration: this.settings.defaults.autoDismissDuration,
			showIcons: this.settings.defaults.showIcons
		};

		// Apply type-specific config if type provided and exists
		if (type && this.settings.types?.[type]) {
			const typeConfig = this.settings.types[type];

			// Deep merge: override only properties that are defined
			if (typeConfig.duration !== undefined) {
				config.duration = typeConfig.duration;
			}
			if (typeConfig.severity !== undefined) {
				config.severity = typeConfig.severity;
			}
			if (typeConfig.modal !== undefined) {
				config.modal = typeConfig.modal;
			}
			if (typeConfig.showIcons !== undefined) {
				config.showIcons = typeConfig.showIcons;
			}
			if (typeConfig.actions !== undefined) {
				config.actions = typeConfig.actions;
			}
		}

		return config;
	}
}
