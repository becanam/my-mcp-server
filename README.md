# my-mcp-server

A custom MCP (Model Context Protocol) server with study utility tools, built as a learning exercise based on [mcp_tutorial](https://github.com/hongsw/mcp_tutorial).

## Tools

| Tool | Description | Parameters | Example Output |
|------|-------------|------------|----------------|
| `bmi_calculator` | Calculate BMI and weight category | `weight_kg`, `height_cm` | `BMI: 22.9 (Normal weight)` |
| `celsius_to_fahrenheit` | Convert temperature | `celsius` | `100°C = 212°F` |
| `word_count` | Count words and characters | `text` | `Words: 7 \| Characters: 45` |

## Setup

```bash
npm install
node server.js
```

## Debug via Terminal

```bash
# List all tools
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node server.js

# Call bmi_calculator
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"bmi_calculator","arguments":{"weight_kg":70,"height_cm":175}}}' | node server.js

# Call celsius_to_fahrenheit
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"celsius_to_fahrenheit","arguments":{"celsius":100}}}' | node server.js

# Call word_count
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"word_count","arguments":{"text":"Hello world"}}}' | node server.js
```

## OpenCode Integration

Add to `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "my_utility_mcp": {
      "type": "local",
      "command": ["node", "/absolute/path/to/my-mcp-server/server.js"],
      "enabled": true
    }
  }
}
```

Then verify:

```bash
opencode mcp list
```

## References

- [MCP Tutorial](https://github.com/hongsw/mcp_tutorial)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
