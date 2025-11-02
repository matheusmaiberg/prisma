// Auto-generated from src\prompts\spec\create-spec-with-agents.md
// DO NOT EDIT MANUALLY

export const frontmatter = {
  "id": "create-spec-with-agents",
  "name": "Create Spec with Subagents",
  "version": "1.0.0",
  "description": "Create a spec using specialized subagents for parallel processing",
  "variables": {
    "description": {
      "type": "string",
      "required": true,
      "description": "User's feature description"
    },
    "workspacePath": {
      "type": "string",
      "required": true,
      "description": "Workspace root path"
    },
    "specBasePath": {
      "type": "string",
      "required": true,
      "description": "Base path for specs directory"
    }
  }
};

export const content = "<user_input>\nLAUNCH A SPEC DEVELOPMENT WORKFLOW\n\nCreate a requirements document for a new feature\n\nFeature Description: {{description}}\n\nWorkspace path: {{workspacePath}}\nSpec base path: {{specBasePath}}\n\nPlease:\n1. Choose an appropriate kebab-case name for this spec based on the description\n2. Create the directory structure with Prisma standard folders:\n   ```\n   {{specBasePath}}/{your-chosen-name}/\n   ├── requirements.md (pendente)\n   ├── design.md (pendente)\n   ├── tasks.md (pendente)\n   ├── artifacts/\n   ├── decisions/\n   └── reports/\n   ```\n3. Follow the spec development workflow\n\nYou have full control over the naming and file creation.\n</user_input>\n";

export default {
  frontmatter,
  content
};
