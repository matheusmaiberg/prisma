import * as vscode from 'vscode';

export type Language = 'pt' | 'en';

/**
 * Detecta o idioma do VSCode
 */
export function getVSCodeLanguage(): Language {
    const locale = vscode.env.language;
    return locale.startsWith('pt') ? 'pt' : 'en';
}

/**
 * Retorna os nomes dos diretórios baseado no idioma
 * NOTA: Apenas 'specs' é traduzido - o resto mantém padrão Claude em inglês
 */
export function getDirectoryNames(lang: Language) {
    // Padrões Claude fixos (sempre em inglês)
    const claudeDefaults = {
        agents: 'agents',
        prompts: 'system-prompts',
        commands: 'commands',
        templates: 'templates',
        steering: 'steering',
        settings: 'settings'
    };

    // Apenas specs é traduzido
    if (lang === 'pt') {
        return {
            ...claudeDefaults,
            specs: 'especificacoes'
        };
    }

    return {
        ...claudeDefaults,
        specs: 'specs'
    };
}

/**
 * Obtém o caminho completo para um diretório .claude
 */
export function getClaudePath(workspaceRoot: string, type: keyof ReturnType<typeof getDirectoryNames>): string {
    const lang = getVSCodeLanguage();
    const dirs = getDirectoryNames(lang);
    return `.claude/${dirs[type]}`;
}
