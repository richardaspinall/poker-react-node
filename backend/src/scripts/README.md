# Generating API method:

Note: arrays inside of and array (and so on) will not be checked for schema types

To generate:

1. Create the metadata file in `src/shared/api/metadata`
2. Run: `npm run generate_handler --metadata_file=new_api_method.json`