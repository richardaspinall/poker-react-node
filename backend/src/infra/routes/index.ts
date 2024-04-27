import express, { NextFunction, Request, Response } from 'express';

import { APIHandler } from '@shared/api/APIMethodMap';

import { routes } from './routeConfig';

export const router = express.Router();

// Automatically set up routes based on the route configuration
routes.forEach((route) => {
  import(route.handler)
    .then((module) => {
      const HandlerClass = module[route.handlerName];
      const handlerInstance = new HandlerClass() as APIHandler;

      // Define the primary route handler
      const routeHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handlerInstance['runHandler'](req, res, next);
        } catch (error) {
          next(error); // Pass any caught errors to next() for error handling
        }
      };

      // Apply the route handler and the error handler wrapper
      router[route.httpMethod](route.path, routeHandler);
    })
    .catch((error) => {
      console.error(`Failed to load handler for route '${route.path}':`, error);
    });
});
