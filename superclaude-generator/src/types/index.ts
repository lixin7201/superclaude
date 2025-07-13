// SuperClaude Command Generator Types

export interface Command {
  id: string;
  name: string;
  description: string;
  category: string;
  flags: string[];
  examples: string[];
}

export interface UniversalFlag {
  flag: string;
  alias?: string;
  description: string;
  category: string;
}

export interface Persona {
  id: string;
  flag: string;
  name: string;
  expertise: string;
  bestFor: string;
  description: string;
}

export interface MCPServer {
  id: string;
  flag: string;
  name: string;
  description: string;
}

export interface CommandBuilder {
  selectedCommand: Command | null;
  selectedFlags: string[];
  selectedPersona: Persona | null;
  selectedMCPServers: string[];
  customArguments: string;
}

export interface CommandCategories {
  Development: string;
  Analysis: string;
  Operations: string;
  Design: string;
  Workflow: string;
}