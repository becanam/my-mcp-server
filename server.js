#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// Tool 1: BMI Calculator
server.tool(
  "bmi_calculator",
  "Calculate BMI given weight (kg) and height (cm)",
  { weight_kg: z.number(), height_cm: z.number() },
  async ({ weight_kg, height_cm }) => {
    console.error(`[DEBUG] bmi_calculator called with weight=${weight_kg}kg, height=${height_cm}cm`);
    const height_m = height_cm / 100;
    const bmi = weight_kg / (height_m * height_m);
    const rounded = Math.round(bmi * 10) / 10;
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    return {
      content: [{ type: "text", text: `BMI: ${rounded} (${category})` }],
    };
  }
);

// Tool 2: Celsius to Fahrenheit
server.tool(
  "celsius_to_fahrenheit",
  "Convert temperature from Celsius to Fahrenheit",
  { celsius: z.number() },
  async ({ celsius }) => {
    console.error(`[DEBUG] celsius_to_fahrenheit called with celsius=${celsius}`);
    const fahrenheit = (celsius * 9) / 5 + 32;
    return {
      content: [{ type: "text", text: `${celsius}°C = ${fahrenheit}°F` }],
    };
  }
);

// Tool 3: Word Count
server.tool(
  "word_count",
  "Count the number of words and characters in a given text",
  { text: z.string() },
  async ({ text }) => {
    console.error(`[DEBUG] word_count called with text="${text}"`);
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = text.length;
    const charNoSpace = text.replace(/\s/g, "").length;
    return {
      content: [{
        type: "text",
        text: `Words: ${wordCount} | Characters: ${charCount} | Characters (no spaces): ${charNoSpace}`
      }],
    };
  }
);

async function main() {
  console.error("[DEBUG] Server starting with stdio transport...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[DEBUG] Server connected!");
}

main().catch(console.error);
