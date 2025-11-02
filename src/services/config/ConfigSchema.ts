import { z } from 'zod';

/**
 * Schema Zod para validação de `caminhos.yaml`.
 *
 * Valida estrutura de paths do Prisma. Todos os campos são obrigatórios
 * e devem ser strings não-vazias. Modo strict rejeita campos desconhecidos.
 *
 * @example
 * ```typescript
 * const config = {
 *   paths: {
 *     agents: '.claude/agents/prisma',
 *     prompts: '.claude/system-prompts',
 *     commands: '.claude/commands/prisma',
 *     templates: '.claude/templates',
 *     specs: '.prisma/projeto/especificacoes',
 *     steering: '.claude/steering',
 *     settings: '.claude/settings'
 *   }
 * };
 *
 * const validated = PathsConfigSchema.parse(config); // ✅ Success
 * ```
 */
export const PathsConfigSchema = z.object({
    paths: z.object({
        agents: z.string().min(1),
        prompts: z.string().min(1),
        commands: z.string().min(1),
        templates: z.string().min(1),
        specs: z.string().min(1),
        steering: z.string().min(1),
        settings: z.string().min(1)
    }).strict()
});

/**
 * Schema Zod para validação de `integracoes.yaml`.
 *
 * Valida configurações de integração com Claude CLI/Extension.
 * Todos os campos têm defaults. `activationDelay` deve ser integer entre 0-5000ms.
 *
 * @example
 * ```typescript
 * const config = {
 *   claude: {
 *     invocationMode: 'cli',    // 'cli' | 'extension'
 *     cliPath: 'claude',        // Default: 'claude'
 *     terminal: {
 *       activationDelay: 800    // Default: 800ms
 *     }
 *   }
 * };
 *
 * const validated = IntegrationsConfigSchema.parse(config); // ✅ Success
 * ```
 */
export const IntegrationsConfigSchema = z.object({
    claude: z.object({
        invocationMode: z.enum(['cli', 'extension']).default('cli'),
        cliPath: z.string().default('claude'),
        terminal: z.object({
            activationDelay: z.number().int().min(0).max(5000).default(800)
        }).optional()
    }).strict()
});

/**
 * Schema Zod para validação de `qualidade.yaml`.
 *
 * Valida configurações de validação e qualidade do Prisma.
 * Todos os campos têm defaults. `logLevel` deve ser error|warn|info|debug.
 *
 * @example
 * ```typescript
 * const config = {
 *   validation: {
 *     enabled: true,              // Default: true
 *     strictMode: false,          // Default: false
 *     logLevel: 'warn',           // Default: 'warn'
 *     showNotifications: true     // Default: true
 *   }
 * };
 *
 * const validated = QualityConfigSchema.parse(config); // ✅ Success
 * ```
 */
export const QualityConfigSchema = z.object({
    validation: z.object({
        enabled: z.boolean().default(true),
        strictMode: z.boolean().default(false),
        logLevel: z.enum(['error', 'warn', 'info', 'debug']).default('warn'),
        showNotifications: z.boolean().default(true)
    }).strict()
});

/**
 * Tipo TypeScript inferido de `PathsConfigSchema`.
 *
 * @example
 * ```typescript
 * const config: PathsConfig = {
 *   paths: { agents: '.custom/agents', ... }
 * };
 * ```
 */
export type PathsConfig = z.infer<typeof PathsConfigSchema>;

/**
 * Tipo TypeScript inferido de `IntegrationsConfigSchema`.
 *
 * @example
 * ```typescript
 * const config: IntegrationsConfig = {
 *   claude: { invocationMode: 'cli', cliPath: 'claude' }
 * };
 * ```
 */
export type IntegrationsConfig = z.infer<typeof IntegrationsConfigSchema>;

/**
 * Tipo TypeScript inferido de `QualityConfigSchema`.
 *
 * @example
 * ```typescript
 * const config: QualityConfig = {
 *   validation: { enabled: true, strictMode: false, logLevel: 'warn' }
 * };
 * ```
 */
export type QualityConfig = z.infer<typeof QualityConfigSchema>;
