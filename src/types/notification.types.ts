/**
 * Type definitions for the notification system
 *
 * This file provides TypeScript types for the VSCode Notification Factory,
 * enabling type-safe notification creation with builder pattern.
 *
 * @module notification.types
 * @see {@link https://code.visualstudio.com/api/references/vscode-api#window VSCode Window API}
 */

import * as vscode from 'vscode';

/**
 * Notification type identifier
 *
 * Defines the six supported notification types that map to VSCode API methods:
 * - info → showInformationMessage
 * - warning → showWarningMessage
 * - error → showErrorMessage
 * - progress → withProgress
 * - input → showInputBox
 * - confirmation → showInformationMessage with actions
 *
 * @example
 * ```typescript
 * const type: NotificationType = 'info';
 * ```
 */
export type NotificationType =
	| 'info'
	| 'warning'
	| 'error'
	| 'progress'
	| 'input'
	| 'confirmation';

/**
 * Notification action (button with callback)
 *
 * Represents an action button that can be added to notifications.
 * When clicked, the action callback is executed.
 *
 * @example
 * ```typescript
 * const action: NotificationAction = {
 *   title: 'Open File',
 *   action: async () => {
 *     await vscode.workspace.openTextDocument(uri);
 *   }
 * };
 * ```
 */
export interface NotificationAction {
	/** Button label shown to user */
	title: string;
	/** Callback executed when button is clicked */
	action: () => void | Promise<void>;
}

/**
 * Per-type notification configuration
 *
 * Allows fine-grained control over notification behavior for specific types.
 * Overrides both system defaults and user defaults.
 *
 * @example
 * ```typescript
 * const config: NotificationConfig = {
 *   duration: 5000,
 *   severity: 'info',
 *   modal: false,
 *   showIcons: true,
 *   actions: [
 *     { title: 'View', action: () => console.log('Viewing...') }
 *   ]
 * };
 * ```
 */
export interface NotificationConfig {
	/** Auto-dismiss duration in milliseconds (0 = never dismiss) */
	duration?: number;
	/** Severity level affecting icon and styling */
	severity?: 'info' | 'warning' | 'error';
	/** Whether to block other actions until dismissed */
	modal?: boolean;
	/** Action buttons to show */
	actions?: NotificationAction[];
	/** Whether to show severity icons */
	showIcons?: boolean;
}

/**
 * Global notification settings
 *
 * Configuration stored in prisma.settings.json under "notifications" section.
 * Provides system-wide defaults and per-type overrides.
 *
 * Configuration precedence: type config > user defaults > system defaults
 *
 * @example
 * ```typescript
 * const settings: NotificationSettings = {
 *   defaults: {
 *     autoDismissDuration: 3000,
 *     showIcons: true
 *   },
 *   types: {
 *     'spec.created': {
 *       duration: 5000,
 *       severity: 'info'
 *     },
 *     'permission.denied': {
 *       duration: 0, // Never auto-dismiss errors
 *       severity: 'error'
 *     }
 *   }
 * };
 * ```
 */
export interface NotificationSettings {
	/** Default settings applied to all notifications */
	defaults: {
		/** Default auto-dismiss duration in milliseconds */
		autoDismissDuration: number;
		/** Whether to show severity icons by default */
		showIcons: boolean;
	};
	/** Per-type configuration overrides (key = type identifier) */
	types?: Record<string, Partial<NotificationConfig>>;
}

/**
 * Progress notification options
 *
 * Configuration for progress notifications (withProgress API).
 * Supports both determinate (0-100%) and indeterminate (spinner) modes.
 *
 * @example
 * ```typescript
 * const options: ProgressOptions = {
 *   cancellable: true,
 *   location: vscode.ProgressLocation.Notification
 * };
 * ```
 */
export interface ProgressOptions {
	/** Whether user can cancel the operation */
	cancellable?: boolean;
	/** Where to show the progress indicator */
	location?: vscode.ProgressLocation;
}

/**
 * Input notification options
 *
 * Configuration for input dialogs (showInputBox API).
 * Supports placeholder, prompt text, and validation.
 *
 * @example
 * ```typescript
 * const options: InputOptions = {
 *   placeholder: 'my-feature',
 *   prompt: 'Enter spec name',
 *   validation: (value) => {
 *     return /^[a-z0-9-]+$/.test(value)
 *       ? undefined
 *       : 'Use kebab-case (lowercase, hyphens only)';
 *   }
 * };
 * ```
 */
export interface InputOptions {
	/** Placeholder text shown in empty input box */
	placeholder?: string;
	/** Descriptive prompt text shown above input */
	prompt?: string;
	/** Validation function returning error message or undefined if valid */
	validation?: (value: string) => string | undefined;
}

/**
 * Confirmation notification options
 *
 * Configuration for confirmation dialogs (showInformationMessage with actions).
 * Used for Yes/No, Confirm/Cancel type interactions.
 *
 * @example
 * ```typescript
 * const options: ConfirmationOptions = {
 *   actions: ['Delete', 'Cancel'],
 *   modal: true
 * };
 * ```
 */
export interface ConfirmationOptions {
	/** Action button titles (e.g., ['Yes', 'No']) */
	actions: string[];
	/** Whether to block other actions until user decides */
	modal?: boolean;
}

/**
 * Performance metrics for notification system
 *
 * Built-in performance monitoring data collected during notification lifecycle.
 * Used for performance validation and CI regression testing.
 *
 * @example
 * ```typescript
 * const metrics: PerformanceMetrics = {
 *   instantiationTime: 0.05,  // < 1ms target
 *   displayTime: 42,          // < 50ms target
 *   p95DisplayTime: 48        // 95th percentile
 * };
 * ```
 */
export interface PerformanceMetrics {
	/** Time to instantiate factory/manager in milliseconds */
	instantiationTime: number;
	/** Time to display notification in milliseconds */
	displayTime: number;
	/** 95th percentile display time (optional, requires multiple samples) */
	p95DisplayTime?: number;
}

/**
 * Default notification settings
 *
 * System-wide defaults used when user configuration is not provided.
 * Ensures sensible behavior out-of-the-box.
 *
 * @constant
 */
export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
	defaults: {
		autoDismissDuration: 3000,
		showIcons: true
	}
};
