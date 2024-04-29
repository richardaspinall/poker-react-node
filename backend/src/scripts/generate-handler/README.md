# Generating API method:

Note: arrays inside of and array (and so on) will not be checked for schema types

To generate:

1. Create the metadata file in `src/shared/api/metadata` using `./metadata_template.json` as an example (or see other metadata files in `src/shared/api/metadata`)
2. Run: `npm run generate_handler --metadata_file=new_api_method.json`
3. If it is a brand new API method, then you will see a gen folder under the domain for the handler. There will be an AbstractHandler that will have the concrete handler in the comments to copy and create a new file for. This will need to extend the AbstractHandler and then away you go!

Notes:

1. For now we must include the following as a property in the output:

```
 {
    "name": "ok",
    "type": "boolean",
    "required": true
},

```
