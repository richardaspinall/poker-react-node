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

// Find the last '}' that closes the ApiMethodMap interface and insert before it
const lastIndex = tsContent.lastIndexOf('}');

if (lastIndex !== -1 && !tsContent.includes(methodIdentifier)) {
  // Inserting the entry directly before the last bracket without introducing a new line
  tsContent = tsContent.substring(0, lastIndex) + methodEntry + tsContent.substring(lastIndex);
}

// Write the modified content back to the TypeScript file
fs.writeFile(tsFilePath, tsContent, 'utf8', (err) => {
  if (err) console.error('Error writing the updated ApiMethodMap.ts file:', err);
  else console.log('ApiMethodMap.ts has been updated successfully.');
});
