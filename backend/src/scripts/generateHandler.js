const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// Load JSON Schema
const schema = JSON.parse(fs.readFileSync('src/scripts/path_to_your_json_file.json', 'utf8'));

function ensureDirectoryExistence(dirPath) {
  const dirname = path.dirname(dirPath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Function to render templates and write files
function renderAndSave(templatePath, outputPath, data) {
  const fullPathNew = path.join(__dirname, outputPath);
  ensureDirectoryExistence(fullPathNew);

  const fullPath = path.join(__dirname, 'templates', templatePath);

  const template = fs.readFileSync(fullPath, 'utf8');
  const content = ejs.render(template, data);
  fs.writeFileSync(fullPathNew, content, 'utf8');
}

// Generate handler
renderAndSave('handler-class.ejs', `../handlers/${schema.domainName}/Abstract${schema.handlerName}Handler.ts`, schema);

// Generate type definitions
renderAndSave('type-defs.ejs', `../shared/api/${schema.domainName}/types/${schema.handlerName}.ts`, schema);

// Generate validation schemas
renderAndSave(
  'validation-schemas.ejs',
  `../shared/api/${schema.domainName}/schemas/${schema.handlerName}Schemas.ts`,
  schema
);

// Generate error classes
schema.errors.forEach((error) => {
  renderAndSave('error-class.ejs', `../handlers/${schema.domainName}/errors/${error.classFile}`, error);
});

// Generate test files
// renderAndSave('test-file.ejs', `../handlers/output/${schema.handlerName}.test.ts`, schema);

console.log('TypeScript files generated successfully.');
