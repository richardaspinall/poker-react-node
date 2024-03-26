# Style guide

## Import order

1. Standard Library Imports
   - `import path from 'path';`
   - `import fs from 'fs';`
2. External Library Imports
   - `import express from 'express';`
   - `import Joi from 'joi';`
3. Framework and Uitility Imports
   - `import React from 'react';`
   - `import lodash from 'lodash';`
4. Alias Imports
   - `import { BaseError } from '@infra/BaseError';`
   - `import { shutDownServer } from '@tests/helpers/shutDownServer';;`
5. RelativeImports
   - `import { MyComponent } from './components/MyComponent';`
   - `import { myHelperFunction } from '../helpers/myHelperFunction';`
