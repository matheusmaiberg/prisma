import { getVSCodeLanguage, getDirectoryNames } from './utils/language';

// VSCode configuration namespace for this extension
export const VSC_CONFIG_NAMESPACE = 'prisma';

// File names
export const CONFIG_FILE_NAME = 'prisma.settings.json';

/**
 * Get default configuration based on VSCode language
 */
export function getDefaultConfig() {
    const lang = getVSCodeLanguage();
    const dirs = getDirectoryNames(lang);

    return {
        paths: {
            specs: `.claude/${dirs.specs}`,
            steering: `.claude/${dirs.steering}`,
            settings: `.claude/${dirs.settings}`
        },
        views: {
            specs: true,
            steering: true,
            mcp: true,
            hooks: true,
            settings: false
        },
    claude: {
        invocationMode: 'cli' as const,
        cliPath: 'claude'
    }
    };
}

// Default configuration (for backward compatibility)
export const DEFAULT_CONFIG = getDefaultConfig();

// Legacy exports for backward compatibility (can be removed after updating all references)
export const DEFAULT_PATHS = DEFAULT_CONFIG.paths;
export const DEFAULT_VIEW_VISIBILITY = DEFAULT_CONFIG.views;