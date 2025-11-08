import { getVSCodeLanguage } from '../utils/language';

export interface Translations {
    views: {
        specs: string;
        agents: string;
        steering: string;
        mcpServers: string;
        hooks: string;
        settings: string;
    };
    agents: {
        userAgents: string;
        userAgentsTooltip: string;
        projectAgents: string;
        projectAgentsTooltip: string;
        loadingAgents: string;
    };
    commands: {
        createSpec: string;
        deleteSpec: string;
        openSpec: string;
        createSteering: string;
        deleteSteering: string;
        openSteering: string;
        refreshSpecs: string;
        refreshSteering: string;
        refreshAgents: string;
        refreshMcpServers: string;
        refreshHooks: string;
        openSettings: string;
        checkUpdates: string;
        setupInitialize: string;
    };
    notifications: {
        specCreated: string;
        specDeleted: string;
        steeringCreated: string;
        steeringDeleted: string;
        updateAvailable: string;
        noUpdateAvailable: string;
        error: string;
        success: string;
    };
    messages: {
        welcomeTitle: string;
        welcomeMessage: string;
        noWorkspace: string;
        loadingSpecs: string;
        noSpecsFound: string;
        confirmDelete: string;
        yes: string;
        no: string;
        selectViewsToShow: string;
    };
    loading: {
        hooks: string;
        mcpServers: string;
        serverDetails: string;
        specs: string;
        steeringDocs: string;
    };
    titles: {
        openAgent: string;
        openRequirements: string;
        openDesign: string;
        openTasks: string;
        openGlobalClaude: string;
        openProjectClaude: string;
        openConfigFile: string;
        openSteeringDoc: string;
        createGlobalClaude: string;
        createProjectClaude: string;
        copyCommand: string;
    };
    labels: {
        createGlobalRule: string;
        createProjectRule: string;
        globalRule: string;
        projectRule: string;
        steeringDocs: string;
    };
    config: {
        specsPath: string;
        steeringPath: string;
        agentsPath: string;
        mcpServersPath: string;
        hooksPath: string;
        settingsPath: string;
        autoRefresh: string;
        checkUpdatesOnStartup: string;
    };
}

const pt: Translations = {
    views: {
        specs: 'Especificações',
        agents: 'Agentes',
        steering: 'Direcionamento',
        mcpServers: 'Servidores MCP',
        hooks: 'Hooks',
        settings: 'Configurações'
    },
    agents: {
        userAgents: 'Agentes do Usuário',
        userAgentsTooltip: 'Agentes globais disponíveis para todos os projetos',
        projectAgents: 'Agentes do Projeto',
        projectAgentsTooltip: 'Agentes específicos deste projeto',
        loadingAgents: 'Carregando agentes...'
    },
    commands: {
        createSpec: 'Criar Nova Especificação',
        deleteSpec: 'Deletar Especificação',
        openSpec: 'Abrir Especificação',
        createSteering: 'Criar Novo Direcionamento',
        deleteSteering: 'Deletar Direcionamento',
        openSteering: 'Abrir Direcionamento',
        refreshSpecs: 'Atualizar Especificações',
        refreshSteering: 'Atualizar Direcionamento',
        refreshAgents: 'Atualizar Agentes',
        refreshMcpServers: 'Atualizar Servidores MCP',
        refreshHooks: 'Atualizar Hooks',
        openSettings: 'Abrir Configurações',
        checkUpdates: 'Verificar Atualizações',
        setupInitialize: 'Inicializar Estrutura Prisma'
    },
    notifications: {
        specCreated: 'Especificação criada com sucesso',
        specDeleted: 'Especificação deletada com sucesso',
        steeringCreated: 'Direcionamento criado com sucesso',
        steeringDeleted: 'Direcionamento deletado com sucesso',
        updateAvailable: 'Atualização disponível',
        noUpdateAvailable: 'Nenhuma atualização disponível',
        error: 'Erro',
        success: 'Sucesso'
    },
    messages: {
        welcomeTitle: 'Bem-vindo ao Prisma',
        welcomeMessage: 'Gerencie suas especificações, agentes e configurações do Claude',
        noWorkspace: 'Nenhum workspace aberto',
        loadingSpecs: 'Carregando especificações...',
        noSpecsFound: 'Nenhuma especificação encontrada',
        confirmDelete: 'Tem certeza que deseja deletar?',
        yes: 'Sim',
        no: 'Não',
        selectViewsToShow: 'Selecione as visualizações para exibir'
    },
    loading: {
        hooks: 'Carregando hooks de agentes...',
        mcpServers: 'Carregando servidores MCP...',
        serverDetails: 'Carregando detalhes do servidor...',
        specs: 'Carregando especificações...',
        steeringDocs: 'Carregando documentos de direcionamento...'
    },
    titles: {
        openAgent: 'Abrir Agente',
        openRequirements: 'Abrir Requisitos',
        openDesign: 'Abrir Design',
        openTasks: 'Abrir Tarefas',
        openGlobalClaude: 'Abrir CLAUDE.md Global',
        openProjectClaude: 'Abrir CLAUDE.md do Projeto',
        openConfigFile: 'Abrir Arquivo de Configuração',
        openSteeringDoc: 'Abrir Documento de Direcionamento',
        createGlobalClaude: 'Criar CLAUDE.md Global',
        createProjectClaude: 'Criar CLAUDE.md do Projeto',
        copyCommand: 'Copiar Comando'
    },
    labels: {
        createGlobalRule: 'Criar Regra Global',
        createProjectRule: 'Criar Regra do Projeto',
        globalRule: 'Regra Global',
        projectRule: 'Regra do Projeto',
        steeringDocs: 'Documentos de Direcionamento'
    },
    config: {
        specsPath: 'Caminho para as especificações',
        steeringPath: 'Caminho para o direcionamento',
        agentsPath: 'Caminho para os agentes',
        mcpServersPath: 'Caminho para os servidores MCP',
        hooksPath: 'Caminho para os hooks',
        settingsPath: 'Caminho para as configurações',
        autoRefresh: 'Atualizar automaticamente',
        checkUpdatesOnStartup: 'Verificar atualizações ao iniciar'
    }
};

const en: Translations = {
    views: {
        specs: 'Specifications',
        agents: 'Agents',
        steering: 'Steering',
        mcpServers: 'MCP Servers',
        hooks: 'Hooks',
        settings: 'Settings'
    },
    agents: {
        userAgents: 'User Agents',
        userAgentsTooltip: 'Global agents available for all projects',
        projectAgents: 'Project Agents',
        projectAgentsTooltip: 'Agents specific to this project',
        loadingAgents: 'Loading agents...'
    },
    commands: {
        createSpec: 'Create New Specification',
        deleteSpec: 'Delete Specification',
        openSpec: 'Open Specification',
        createSteering: 'Create New Steering',
        deleteSteering: 'Delete Steering',
        openSteering: 'Open Steering',
        refreshSpecs: 'Refresh Specifications',
        refreshSteering: 'Refresh Steering',
        refreshAgents: 'Refresh Agents',
        refreshMcpServers: 'Refresh MCP Servers',
        refreshHooks: 'Refresh Hooks',
        openSettings: 'Open Settings',
        checkUpdates: 'Check for Updates',
        setupInitialize: 'Initialize Prisma Structure'
    },
    notifications: {
        specCreated: 'Specification created successfully',
        specDeleted: 'Specification deleted successfully',
        steeringCreated: 'Steering created successfully',
        steeringDeleted: 'Steering deleted successfully',
        updateAvailable: 'Update available',
        noUpdateAvailable: 'No updates available',
        error: 'Error',
        success: 'Success'
    },
    messages: {
        welcomeTitle: 'Welcome to Prisma',
        welcomeMessage: 'Manage your Claude specifications, agents, and settings',
        noWorkspace: 'No workspace open',
        loadingSpecs: 'Loading specifications...',
        noSpecsFound: 'No specifications found',
        confirmDelete: 'Are you sure you want to delete?',
        yes: 'Yes',
        no: 'No',
        selectViewsToShow: 'Select views to show'
    },
    loading: {
        hooks: 'Loading agent hooks...',
        mcpServers: 'Loading MCP servers...',
        serverDetails: 'Loading server details...',
        specs: 'Loading specs...',
        steeringDocs: 'Loading steering documents...'
    },
    titles: {
        openAgent: 'Open Agent',
        openRequirements: 'Open Requirements',
        openDesign: 'Open Design',
        openTasks: 'Open Tasks',
        openGlobalClaude: 'Open Global CLAUDE.md',
        openProjectClaude: 'Open Project CLAUDE.md',
        openConfigFile: 'Open Configuration File',
        openSteeringDoc: 'Open Steering Document',
        createGlobalClaude: 'Create Global CLAUDE.md',
        createProjectClaude: 'Create Project CLAUDE.md',
        copyCommand: 'Copy Command'
    },
    labels: {
        createGlobalRule: 'Create Global Rule',
        createProjectRule: 'Create Project Rule',
        globalRule: 'Global Rule',
        projectRule: 'Project Rule',
        steeringDocs: 'Steering Docs'
    },
    config: {
        specsPath: 'Path to specifications',
        steeringPath: 'Path to steering',
        agentsPath: 'Path to agents',
        mcpServersPath: 'Path to MCP servers',
        hooksPath: 'Path to hooks',
        settingsPath: 'Path to settings',
        autoRefresh: 'Auto refresh',
        checkUpdatesOnStartup: 'Check for updates on startup'
    }
};

export function getTranslations(): Translations {
    const lang = getVSCodeLanguage();
    return lang === 'pt' ? pt : en;
}

export function t(): Translations {
    return getTranslations();
}
