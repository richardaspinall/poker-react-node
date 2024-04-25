const fs = require('fs');
const path = require('path');

// Path to your JSON file
const jsonFilePath = path.join(__dirname, '/path_to_your_json_file.json');
// Path to your TypeScript API method map file
const tsFilePath = path.join(__dirname, '../shared/api/ApiMethodMap.ts');

// Read and parse the JSON file for a single handler
const handler = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Function to ensure type imports
function ensureImports(data, handler) {
  const importString = `import type { ${handler.handlerName}Output, ${handler.handlerName}Payload } from './${handler.domainName}/types/${handler.handlerName}';\n`;
  if (!data.includes(importString)) {
    return importString + data;
  }
  return data;
}

// Read the existing TypeScript file
let tsContent = fs.readFileSync(tsFilePath, 'utf8');

// Ensure necessary imports are added
tsContent = ensureImports(tsContent, handler);

// Construct the API method entry
const methodIdentifier = `'${handler.domainName}.${handler.apiName}'`;
const methodEntry = `${methodIdentifier}: {
    request: ${handler.handlerName}Payload;
    response: ${handler.handlerName}Output;
  };`;

// Locate the ApiMethodMap interface accurately
let startIndex = tsContent.indexOf('export interface ApiMethodMap {');
let endIndex = tsContent.indexOf('}', startIndex) + 1;
let interfaceContent = tsContent.substring(startIndex, endIndex);

// Split entries, sort, and manage commas
let entries = interfaceContent.substring(interfaceContent.indexOf('{') + 1, interfaceContent.lastIndexOf('}')).trim();
entries = entries.split(/,(?![^\[\]{}]*(\]|\}))/).map((e) => e.trim()); // Splitting while considering nested structures
entries = entries.filter((e) => e !== ''); // Remove any empty entries

if (!entries.some((e) => e.startsWith(methodIdentifier))) {
  entries.push(methodEntry);
  entries.sort(); // Sort entries alphabetically

  // Rebuild the interface with entries correctly comma-separated
  interfaceContent = `export interface ApiMethodMap {\n  ${entries.join('\n  ')}\n}`;
  tsContent = tsContent.substring(0, startIndex) + interfaceContent + tsContent.substring(endIndex);
}

// Write the modified content back to the TypeScript file
fs.writeFile(tsFilePath, tsContent, 'utf8', (err) => {
  if (err) console.error('Error writing the updated ApiMethodMap.ts file:', err);
  else console.log('ApiMethodMap.ts has been updated successfully.');
});
