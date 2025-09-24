const fs = require('fs').promises;
const path = require('path');

class AbstractSpecializedAgent {
    constructor(id, domain, expertise = []) {
        this.id = id;
        this.domain = domain;
        this.expertise = expertise;
        this.currentLoad = 0;
        this.status = 'idle';
        this.capabilities = [];
        this.maxLoad = 10;
        this.configPath = path.join(__dirname, `${domain}/config.json`);
        this.promptPath = path.join(__dirname, `${domain}/prompt.md`);
        this.knowledgePath = path.join(__dirname, `${domain}/knowledge.json`);
        this.logPath = path.join(__dirname, `../data/agent-logs/${id}.json`);
        this.metadata = {
            createdAt: new Date().toISOString(),
            totalTasks: 0,
            successfulTasks: 0,
            lastActive: null
        };
    }

    async initialize() {
        await this.loadConfig();
        await this.loadPrompt();
        await this.loadKnowledge();
        await this.ensureLogFile();
        await this.updateCapabilities();
    }

    async loadConfig() {
        try {
            const configData = await fs.readFile(this.configPath, 'utf8');
            const config = JSON.parse(configData);
            this.maxLoad = config.maxLoad || 10;
            this.capabilities = config.capabilities || [];
            this.metadata = { ...this.metadata, ...config.metadata };
        } catch (error) {
            await this.createDefaultConfig();
        }
    }

    async createDefaultConfig() {
        const defaultConfig = {
            maxLoad: 10,
            capabilities: this.getDefaultCapabilities(),
            metadata: this.metadata,
            settings: {
                timeout: 30000,
                retryAttempts: 3,
                qualityThreshold: 0.7
            }
        };

        await fs.mkdir(path.dirname(this.configPath), { recursive: true });
        await fs.writeFile(this.configPath, JSON.stringify(defaultConfig, null, 2));
        this.capabilities = defaultConfig.capabilities;
    }

    async loadPrompt() {
        try {
            this.prompt = await fs.readFile(this.promptPath, 'utf8');
        } catch (error) {
            await this.createDefaultPrompt();
        }
    }

    async createDefaultPrompt() {
        const defaultPrompt = `# ${this.domain.charAt(0).toUpperCase() + this.domain.slice(1)} Agent

## Role
You are a specialized agent for ${this.domain} tasks.

## Expertise
${this.expertise.map(skill => `- ${skill}`).join('\n')}

## Instructions
1. Analyze the task requirements carefully
2. Apply your specialized knowledge in ${this.domain}
3. Provide high-quality, domain-specific solutions
4. Ensure output meets quality standards

## Quality Standards
- Accuracy: ${this.getQualityThreshold()}
- Completeness: Address all requirements
- Best Practices: Follow ${this.domain} conventions
- Documentation: Provide clear explanations when needed
`;

        await fs.mkdir(path.dirname(this.promptPath), { recursive: true });
        await fs.writeFile(this.promptPath, defaultPrompt);
        this.prompt = defaultPrompt;
    }

    async loadKnowledge() {
        try {
            const knowledgeData = await fs.readFile(this.knowledgePath, 'utf8');
            this.knowledge = JSON.parse(knowledgeData);
        } catch (error) {
            await this.createDefaultKnowledge();
        }
    }

    async createDefaultKnowledge() {
        const defaultKnowledge = {
            domain: this.domain,
            commonPatterns: [],
            bestPractices: [],
            troubleshooting: {},
            resources: [],
            templates: {},
            lastUpdated: new Date().toISOString()
        };

        await fs.mkdir(path.dirname(this.knowledgePath), { recursive: true });
        await fs.writeFile(this.knowledgePath, JSON.stringify(defaultKnowledge, null, 2));
        this.knowledge = defaultKnowledge;
    }

    async ensureLogFile() {
        try {
            await fs.access(this.logPath);
        } catch {
            await fs.mkdir(path.dirname(this.logPath), { recursive: true });
            await fs.writeFile(this.logPath, JSON.stringify([], null, 2));
        }
    }

    async execute(task, context) {
        this.updateStatus('busy');
        this.currentLoad++;
        this.metadata.totalTasks++;
        this.metadata.lastActive = new Date().toISOString();

        const executionId = this.generateExecutionId();

        try {
            await this.logExecution(executionId, 'start', { task: task.id, context: context?.taskId });

            const result = await this.performTask(task, context);

            await this.validateResult(result);

            this.metadata.successfulTasks++;
            await this.logExecution(executionId, 'success', { result });

            return result;

        } catch (error) {
            await this.logExecution(executionId, 'error', { error: error.message });
            throw error;
        } finally {
            this.currentLoad = Math.max(0, this.currentLoad - 1);
            this.updateStatus(this.currentLoad > 0 ? 'busy' : 'idle');
        }
    }

    async performTask(task, context) {
        const startTime = Date.now();

        const enrichedContext = await this.enrichContext(task, context);

        const solution = await this.generateSolution(task, enrichedContext);

        const executionTime = Date.now() - startTime;

        return {
            taskId: task.id,
            agentId: this.id,
            domain: this.domain,
            output: solution,
            quality: this.assessQuality(solution, task),
            executionTime,
            metadata: {
                contextUsed: !!context,
                knowledgeApplied: this.getAppliedKnowledge(task),
                timestamp: new Date().toISOString()
            }
        };
    }

    async enrichContext(task, context) {
        const enriched = {
            task,
            globalContext: context?.globalContext || {},
            domainKnowledge: this.knowledge,
            agentCapabilities: this.capabilities,
            relevantPatterns: this.findRelevantPatterns(task),
            bestPractices: this.getRelevantBestPractices(task)
        };

        return enriched;
    }

    async generateSolution(task, context) {
        const template = this.findRelevantTemplate(task);

        if (template) {
            return this.applyTemplate(template, task, context);
        }

        return this.customSolution(task, context);
    }

    findRelevantTemplate(task) {
        if (!this.knowledge.templates || !task.type) {
            return null;
        }

        return this.knowledge.templates[task.type] ||
               this.knowledge.templates['default'];
    }

    applyTemplate(template, task, context) {
        let solution = template.content || template;

        if (typeof solution === 'string') {
            solution = solution.replace(/\{\{taskId\}\}/g, task.id || 'unknown');
            solution = solution.replace(/\{\{domain\}\}/g, this.domain);
            solution = solution.replace(/\{\{agentId\}\}/g, this.id);
        }

        return {
            type: 'template-based',
            content: solution,
            template: template.name || 'default',
            customizations: this.getTemplateCustomizations(task)
        };
    }

    customSolution(task, context) {
        return {
            type: 'custom',
            content: `Custom solution for ${task.type || 'unknown'} task in ${this.domain} domain`,
            reasoning: this.explainReasoning(task, context),
            recommendations: this.getRecommendations(task)
        };
    }

    assessQuality(solution, task) {
        let quality = 0.7; // Base quality

        if (solution.content && solution.content.length > 50) {
            quality += 0.1;
        }

        if (solution.reasoning || solution.template) {
            quality += 0.1;
        }

        if (this.expertise.some(skill =>
            task.requiredSkills?.includes(skill))) {
            quality += 0.1;
        }

        return Math.min(1.0, quality);
    }

    async estimateEffort(task) {
        const baseEffort = this.getBaseEffort(task);
        const complexityMultiplier = this.getComplexityMultiplier(task);
        const skillMatch = this.getSkillMatchBonus(task);

        const estimatedTime = baseEffort * complexityMultiplier * skillMatch;

        return {
            estimatedTime: Math.round(estimatedTime),
            confidence: this.getConfidence(task),
            factors: {
                baseEffort,
                complexityMultiplier,
                skillMatch
            }
        };
    }

    getBaseEffort(task) {
        const effortMap = {
            'simple': 300,    // 5 minutes
            'medium': 900,    // 15 minutes
            'complex': 1800,  // 30 minutes
            'advanced': 3600  // 1 hour
        };

        return effortMap[task.complexity] || effortMap['medium'];
    }

    getComplexityMultiplier(task) {
        if (!task.requirements) return 1.0;

        const requirementCount = task.requirements.length;
        return Math.min(3.0, 1.0 + (requirementCount * 0.2));
    }

    getSkillMatchBonus(task) {
        if (!task.requiredSkills) return 1.0;

        const matchingSkills = task.requiredSkills.filter(skill =>
            this.expertise.includes(skill)
        ).length;

        const matchRatio = matchingSkills / task.requiredSkills.length;
        return Math.max(0.5, 1.2 - matchRatio);
    }

    getConfidence(task) {
        let confidence = 0.7;

        if (task.requiredSkills) {
            const skillMatch = task.requiredSkills.filter(skill =>
                this.expertise.includes(skill)
            ).length / task.requiredSkills.length;

            confidence = Math.min(0.95, 0.5 + skillMatch * 0.4);
        }

        return Math.round(confidence * 100) / 100;
    }

    findRelevantPatterns(task) {
        if (!this.knowledge.commonPatterns) return [];

        return this.knowledge.commonPatterns.filter(pattern =>
            task.type === pattern.type ||
            (task.domain && task.domain === pattern.domain)
        );
    }

    getRelevantBestPractices(task) {
        if (!this.knowledge.bestPractices) return [];

        return this.knowledge.bestPractices.filter(practice =>
            practice.applicable?.includes(task.type) ||
            practice.domain === this.domain
        );
    }

    getAppliedKnowledge(task) {
        return {
            patterns: this.findRelevantPatterns(task).length,
            bestPractices: this.getRelevantBestPractices(task).length,
            templates: this.findRelevantTemplate(task) ? 1 : 0
        };
    }

    explainReasoning(task, context) {
        return `Applied ${this.domain} expertise to solve ${task.type} task using available context and domain knowledge`;
    }

    getRecommendations(task) {
        return [
            `Consider ${this.domain} best practices`,
            'Validate results against requirements',
            'Review for optimization opportunities'
        ];
    }

    getTemplateCustomizations(task) {
        return {
            taskSpecific: true,
            domainOptimized: true,
            timestamp: new Date().toISOString()
        };
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

    getCapabilities() {
        return this.capabilities;
    }

    async updateCapabilities() {
        this.capabilities = [
            ...this.getDefaultCapabilities(),
            ...this.getDynamicCapabilities()
        ];

        await this.saveConfig();
    }

    getDefaultCapabilities() {
        return [
            `${this.domain}-analysis`,
            `${this.domain}-implementation`,
            `${this.domain}-optimization`,
            'task-estimation',
            'quality-assessment'
        ];
    }

    getDynamicCapabilities() {
        const dynamic = [];

        if (this.metadata.successfulTasks > 10) {
            dynamic.push('experienced-agent');
        }

        if (this.getSuccessRate() > 0.9) {
            dynamic.push('high-quality-output');
        }

        return dynamic;
    }

    getSuccessRate() {
        if (this.metadata.totalTasks === 0) return 0;
        return this.metadata.successfulTasks / this.metadata.totalTasks;
    }

    getQualityThreshold() {
        return 0.7 + (this.getSuccessRate() * 0.2);
    }

    async validateResult(result) {
        const threshold = this.getQualityThreshold();

        if (result.quality < threshold) {
            throw new Error(`Quality ${result.quality} below threshold ${threshold}`);
        }
    }

    async saveConfig() {
        const config = {
            maxLoad: this.maxLoad,
            capabilities: this.capabilities,
            metadata: this.metadata,
            settings: {
                timeout: 30000,
                retryAttempts: 3,
                qualityThreshold: this.getQualityThreshold()
            }
        };

        await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
    }

    generateExecutionId() {
        return `${this.id}_exec_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    }

    async logExecution(executionId, status, data) {
        try {
            const logs = await this.loadLogs();
            logs.push({
                executionId,
                status,
                timestamp: new Date().toISOString(),
                agentId: this.id,
                data
            });

            const maxLogs = 50;
            if (logs.length > maxLogs) {
                logs.splice(0, logs.length - maxLogs);
            }

            await fs.writeFile(this.logPath, JSON.stringify(logs, null, 2));
        } catch (error) {
            console.error('Failed to log execution:', error);
        }
    }

    async loadLogs() {
        try {
            const data = await fs.readFile(this.logPath, 'utf8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    getStats() {
        return {
            id: this.id,
            domain: this.domain,
            expertise: this.expertise,
            currentLoad: this.currentLoad,
            maxLoad: this.maxLoad,
            status: this.status,
            capabilities: this.capabilities,
            metadata: this.metadata,
            successRate: this.getSuccessRate(),
            qualityThreshold: this.getQualityThreshold()
        };
    }
}

module.exports = AbstractSpecializedAgent;