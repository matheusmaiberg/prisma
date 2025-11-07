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

export const content = "<user_input>\r\nLAUNCH A SPEC DEVELOPMENT WORKFLOW\r\n\r\nCreate a requirements document for a new feature\r\n\r\nFeature Description: {{description}}\r\n\r\nWorkspace path: {{workspacePath}}\r\nSpec base path: {{specBasePath}}\r\n\r\nYou have full control over the naming and file creation.\r\n</user_input>\r\n";

export default {
  frontmatter,
  content
};
