const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

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
try {
  const apiMetaDataJSON = process.argv[2]; // The user must provide the path as an argument 'src/scripts/path_to_your_json_file.json'
  const apiMethodMapFilePath = path.join(__dirname, '/APIMethodMap.json');

  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, `../shared/api/metadata/${apiMetaDataJSON}`), 'utf8'));
  const apiMethodMap = JSON.parse(fs.readFileSync(apiMethodMapFilePath, 'utf8'));

  const newApiMethod = {
    domainName: schema.domainName,
    apiVerb: schema.apiVerb,
    methodName: `${schema.domainName}.${schema.apiVerb}`,
    handlerName: schema.handlerName,
    httpMethod: schema.httpMethod,
    requestType: `${schema.handlerName}Payload`,
    responseType: `${schema.handlerName}Output`,
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

  apiMethodMap.apiMethods.sort((a, b) => a.methodName.localeCompare(b.methodName));

  // Always update the JSON file with new or updated method info
  const updatedJson = JSON.stringify(apiMethodMap, null, 4);
  fs.writeFileSync(apiMethodMapFilePath, updatedJson, 'utf8');

  // Render and save files
  const apiMethodSchema = JSON.parse(fs.readFileSync('src/scripts/apiMethodMap.json', 'utf8'));

  // APIMethodMap.ts
  renderAndSave('api-method-map.ejs', `../shared/api/gen/APIMethodMap.ts`, apiMethodSchema);

  // APIMethods.ts
  renderAndSave('api-methods.ejs', `../shared/api/gen/APIMethods.ts`, apiMethodSchema);

  // AbstractHandler.ts
  renderAndSave(
    'handler-class.ejs',
    `../handlers/${schema.domainName}/gen/Abstract${schema.handlerName}Handler.ts`,
    schema,
  );

  // Payload Output and Error Enum types
  renderAndSave('type-defs.ejs', `../shared/api/gen/${schema.domainName}/types/${schema.handlerName}.ts`, schema);

  // Payload and Output schema validation
  renderAndSave(
    'validation-schemas.ejs',
    `../shared/api/gen/${schema.domainName}/schemas/${schema.handlerName}Schemas.ts`,
    schema,
  );

  // Errors
  schema.errors.forEach((error) => {
    renderAndSave('error-class.ejs', `../handlers/${schema.domainName}/gen/errors/${error.errorName}.ts`, error);
  });

  console.log('TypeScript files generated successfully.');
} catch (err) {
  console.error('Error processing file:', err);
}
