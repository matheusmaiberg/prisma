import { PathsConfigSchema, IntegrationsConfigSchema, QualityConfigSchema } from '../../../../src/services/config/ConfigSchema';
import { ZodError } from 'zod';

describe('ConfigSchema', () => {
    describe('PathsConfigSchema', () => {
        it('should accept valid paths config', () => {
            const valid = {
                paths: {
                    agents: '.custom/agents',
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                }
            };

            const result = PathsConfigSchema.parse(valid);

            expect(result).toEqual(valid);
            expect(result.paths.agents).toBe('.custom/agents');
            expect(result.paths.prompts).toBe('.custom/prompts');
        });

        it('should reject missing required fields', () => {
            const invalid = {
                paths: {
                    agents: '.custom/agents',
                    prompts: '.custom/prompts'
                    // Missing: commands, templates, specs, steering, settings
                }
            };

            expect(() => PathsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject unknown fields (strict mode)', () => {
            const invalid = {
                paths: {
                    agents: '.custom/agents',
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings',
                    unknownField: 'value' // Campo desconhecido
                }
            };

            expect(() => PathsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject empty strings', () => {
            const invalid = {
                paths: {
                    agents: '', // Empty string
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                }
            };

            expect(() => PathsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject wrong types', () => {
            const invalid = {
                paths: {
                    agents: 123, // Number instead of string
                    prompts: '.custom/prompts',
                    commands: '.custom/commands',
                    templates: '.custom/templates',
                    specs: '.custom/specs',
                    steering: '.custom/steering',
                    settings: '.custom/settings'
                }
            };

            expect(() => PathsConfigSchema.parse(invalid)).toThrow(ZodError);
        });
    });

    describe('IntegrationsConfigSchema', () => {
        it('should accept valid integrations config', () => {
            const valid = {
                claude: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    terminal: {
                        activationDelay: 800
                    }
                }
            };

            const result = IntegrationsConfigSchema.parse(valid);

            expect(result).toEqual(valid);
            expect(result.claude.invocationMode).toBe('cli');
            expect(result.claude.cliPath).toBe('claude');
            expect(result.claude.terminal?.activationDelay).toBe(800);
        });

        it('should apply defaults for optional fields', () => {
            const minimal = {
                claude: {
                    // invocationMode, cliPath, terminal are optional with defaults
                }
            };

            const result = IntegrationsConfigSchema.parse(minimal);

            expect(result.claude.invocationMode).toBe('cli'); // Default
            expect(result.claude.cliPath).toBe('claude'); // Default
            // terminal is optional, so it can be undefined
        });

        it('should reject invalid invocationMode', () => {
            const invalid = {
                claude: {
                    invocationMode: 'invalid-mode', // Not 'cli' or 'extension'
                    cliPath: 'claude'
                }
            };

            expect(() => IntegrationsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject activationDelay out of range', () => {
            const invalid = {
                claude: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    terminal: {
                        activationDelay: 10000 // Max is 5000
                    }
                }
            };

            expect(() => IntegrationsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject negative activationDelay', () => {
            const invalid = {
                claude: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    terminal: {
                        activationDelay: -100
                    }
                }
            };

            expect(() => IntegrationsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject non-integer activationDelay', () => {
            const invalid = {
                claude: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    terminal: {
                        activationDelay: 800.5 // Must be integer
                    }
                }
            };

            expect(() => IntegrationsConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject unknown fields (strict mode)', () => {
            const invalid = {
                claude: {
                    invocationMode: 'cli' as const,
                    cliPath: 'claude',
                    unknownField: 'value' // Unknown field
                }
            };

            expect(() => IntegrationsConfigSchema.parse(invalid)).toThrow(ZodError);
        });
    });

    describe('QualityConfigSchema', () => {
        it('should accept valid quality config', () => {
            const valid = {
                validation: {
                    enabled: true,
                    strictMode: false,
                    logLevel: 'warn' as const,
                    showNotifications: true
                }
            };

            const result = QualityConfigSchema.parse(valid);

            expect(result).toEqual(valid);
            expect(result.validation.enabled).toBe(true);
            expect(result.validation.strictMode).toBe(false);
            expect(result.validation.logLevel).toBe('warn');
            expect(result.validation.showNotifications).toBe(true);
        });

        it('should apply defaults for optional fields', () => {
            const minimal = {
                validation: {
                    // All fields have defaults
                }
            };

            const result = QualityConfigSchema.parse(minimal);

            expect(result.validation.enabled).toBe(true); // Default
            expect(result.validation.strictMode).toBe(false); // Default
            expect(result.validation.logLevel).toBe('warn'); // Default
            expect(result.validation.showNotifications).toBe(true); // Default
        });

        it('should reject invalid logLevel', () => {
            const invalid = {
                validation: {
                    enabled: true,
                    strictMode: false,
                    logLevel: 'invalid-level', // Not error|warn|info|debug
                    showNotifications: true
                }
            };

            expect(() => QualityConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should accept all valid logLevel values', () => {
            const levels = ['error', 'warn', 'info', 'debug'] as const;

            levels.forEach(level => {
                const valid = {
                    validation: {
                        enabled: true,
                        strictMode: false,
                        logLevel: level,
                        showNotifications: true
                    }
                };

                const result = QualityConfigSchema.parse(valid);
                expect(result.validation.logLevel).toBe(level);
            });
        });

        it('should reject non-boolean enabled', () => {
            const invalid = {
                validation: {
                    enabled: 'true', // String instead of boolean
                    strictMode: false,
                    logLevel: 'warn',
                    showNotifications: true
                }
            };

            expect(() => QualityConfigSchema.parse(invalid)).toThrow(ZodError);
        });

        it('should reject unknown fields (strict mode)', () => {
            const invalid = {
                validation: {
                    enabled: true,
                    strictMode: false,
                    logLevel: 'warn' as const,
                    showNotifications: true,
                    unknownField: 'value' // Unknown field
                }
            };

            expect(() => QualityConfigSchema.parse(invalid)).toThrow(ZodError);
        });
    });
});
