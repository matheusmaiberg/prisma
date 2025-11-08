import { getVSCodeLanguage, getDirectoryNames } from './utils/language';

// VSCode configuration namespace for this extension
export const VSC_CONFIG_NAMESPACE = 'prisma';

// Directory names
export const PRISMA_DIR = '.prisma';
export const CLAUDE_DIR = '.claude';

// Claude directories
export const CLAUDE_SETTINGS_DIR = 'settings';
export const CLAUDE_COMMANDS_DIR = 'commands';
export const CLAUDE_AGENTS_DIR = 'agents';
export const CLAUDE_SYSTEM_PROMPTS_DIR = 'system-prompts';
export const CLAUDE_TEMPLATES_DIR = 'templates';

// File names
export const CONFIG_FILE_NAME = 'prisma.settings.json';
export const CLAUDE_CONFIG_FILE = '.claude.json';
export const CLAUDE_SETTINGS_FILE = 'settings.json';
export const CLAUDE_MD_FILE = 'CLAUDE.md';

/**
 * Get default configuration based on VSCode language
 */
export function getDefaultConfig() {
    const lang = getVSCodeLanguage();
    const dirs = getDirectoryNames(lang);

    return {
        paths: {
            specs: `.prisma/${dirs.specs}`,  // Prisma usa .prisma para specs
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