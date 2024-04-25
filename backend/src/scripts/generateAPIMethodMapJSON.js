const fs = require('fs');
const path = require('path');

// Path to your JSON file
const apiMethodFilePath = path.join(__dirname, '/path_to_your_json_file.json');
// Path to your TypeScript API method map file
const apiMethodMapFilePath = path.join(__dirname, '/APIMethodMap.json');

try {
  // Parse the JSON data
  const apiMethodMap = JSON.parse(fs.readFileSync(apiMethodMapFilePath, 'utf8'));

  const apiMethod = JSON.parse(fs.readFileSync(apiMethodFilePath, 'utf8'));

  // Define the new API method details
  const newApiMethod = {
    domainName: apiMethod.domainName,
    handlerName: apiMethod.handlerName,
    methodName: `${apiMethod.domainName}.${apiMethod.apiName}`,
    requestType: `${apiMethod.handlerName}Payload`,
    responseType: `${apiMethod.handlerName}Output`,
  };

  // Append the new API method to the existing list
  apiMethodMap.apiMethods.push(newApiMethod);

  // Convert the updated object back to JSON
  const updatedJson = JSON.stringify(apiMethodMap, null, 4);

  // Write the updated JSON back to the file synchronously
  fs.writeFileSync(apiMethodMapFilePath, updatedJson, 'utf8');

  console.log('Successfully updated apiMethodMap.json');
} catch (err) {
  console.error('Error processing file:', err);
}
