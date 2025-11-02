/**
 * Logger utility for CLI
 */

export const logger = {
    info: (message: string) => {
        console.log(`ℹ️  ${message}`);
    },

    success: (message: string) => {
        console.log(`✅ ${message}`);
    },

    error: (message: string) => {
        console.error(`❌ ${message}`);
    },

    warning: (message: string) => {
        console.warn(`⚠️  ${message}`);
    },

    step: (message: string) => {
        console.log(`🔄 ${message}`);
    },

    check: (message: string) => {
        console.log(`✓ ${message}`);
    },

    skip: (message: string) => {
        console.log(`⊘ ${message}`);
    },

    clean: (message: string) => {
        console.log(`🧹 ${message}`);
    },

    file: (message: string) => {
        console.log(`📝 ${message}`);
    },

    folder: (message: string) => {
        console.log(`📁 ${message}`);
    }
};
