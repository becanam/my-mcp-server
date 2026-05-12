#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// Tools will be added here

async function main() {
  console.error("[DEBUG] Server starting with stdio transport...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[DEBUG] Server connected!");
}

main().catch(console.error);
