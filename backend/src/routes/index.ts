import express from 'express';

import routes from './routeConfig';

const router = express.Router();

// Automatically set up routes based on the route configuration
routes.forEach((route) => {
  import(route.handler)
    .then((module) => {
      const HandlerClass = module[route.handlerClass];
      const handlerInstance = new HandlerClass();

      router[route.httpMethod](route.path, (req, res) => {
        handlerInstance['runHandler'](req, res);
      });
    })
    .catch((error) => {
      console.error(`Failed to load route '${route.path}':`, error);
    });
});

export default router;
