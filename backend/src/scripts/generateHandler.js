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

function renderAndSave(templatePath, outputPath, data) {
  const fullPathNew = path.join(__dirname, outputPath);
  ensureDirectoryExistence(fullPathNew);

  const fullPath = path.join(__dirname, 'templates', templatePath);
  const template = fs.readFileSync(fullPath, 'utf8');
  const content = ejs.render(template, data);
  fs.writeFileSync(fullPathNew, content, 'utf8');
}

// Paths
const apiMethodFilePath = path.join(__dirname, '/path_to_your_json_file.json');
const apiMethodMapFilePath = path.join(__dirname, '/APIMethodMap.json');

try {
  const apiMethodMap = JSON.parse(fs.readFileSync(apiMethodMapFilePath, 'utf8'));
  const apiMethod = JSON.parse(fs.readFileSync(apiMethodFilePath, 'utf8'));

  const newApiMethod = {
    domainName: apiMethod.domainName,
    handlerName: apiMethod.handlerName,
    httpMethod: apiMethod.httpMethod,
    apiName: apiMethod.apiName,
    methodName: `${apiMethod.domainName}.${apiMethod.apiName}`,
    requestType: `${apiMethod.handlerName}Payload`,
    responseType: `${apiMethod.handlerName}Output`,
  };

  // Find index of existing method if it exists
  const index = apiMethodMap.apiMethods.findIndex((method) => method.methodName === newApiMethod.methodName);

  if (index !== -1) {
    // Update existing method
    apiMethodMap.apiMethods[index] = newApiMethod;
    console.log('API method updated in apiMethodMap.json');
  } else {
    // Add as new method
    apiMethodMap.apiMethods.push(newApiMethod);
    console.log('New API method added to apiMethodMap.json');
  }

  // Always update the JSON file with new or updated method info
  const updatedJson = JSON.stringify(apiMethodMap, null, 4);
  fs.writeFileSync(apiMethodMapFilePath, updatedJson, 'utf8');

  // Render and save files
  const apiMethodSchema = JSON.parse(fs.readFileSync('src/scripts/apiMethodMap.json', 'utf8'));
  renderAndSave('api-method-map.ejs', `./output/ApiMethodMap.ts`, apiMethodSchema);
  renderAndSave('api-methods.ejs', `./output/ApiMethods.ts`, apiMethodSchema);

  renderAndSave(
    'handler-class.ejs',
    `../handlers/${schema.domainName}/Abstract${schema.handlerName}Handler.ts`,
    schema,
  );
  renderAndSave('type-defs.ejs', `../shared/api/${schema.domainName}/types/${schema.handlerName}.ts`, schema);
  renderAndSave(
    'validation-schemas.ejs',
    `../shared/api/${schema.domainName}/schemas/${schema.handlerName}Schemas.ts`,
    schema,
  );
  schema.errors.forEach((error) => {
    renderAndSave('error-class.ejs', `../handlers/${schema.domainName}/errors/${error.classFile}`, error);
  });

  console.log('TypeScript files generated successfully.');
} catch (err) {
  console.error('Error processing file:', err);
}
