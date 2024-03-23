// External
import express from 'express';
import { Request, Response, NextFunction } from 'express';

// Internal
import { routes } from './routeConfig';
import { IBaseError } from '@Infra/Result';

export const router = express.Router();

// Automatically set up routes based on the route configuration
routes.forEach((route) => {
  import(route.handler)
    .then((module) => {
      const HandlerClass = module[route.handlerName];
      const handlerInstance = new HandlerClass();

      // Define the primary route handler
      const routeHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handlerInstance['runHandler'](req, res, next);
        } catch (error) {
          next(error); // Pass any caught errors to next() for error handling
        }
      };

      // Define a wrapper for the route-specific error handler, if one exists
      const errorHandlerWrapper = (err: IBaseError, req: Request, res: Response, next: NextFunction) => {
        if (route.errorHandler) {
          route.errorHandler(err, req, res, next);
        } else {
          // No route-specific error handler; call next() to use the global error handler
          next(err);
        }
      };

      // Apply the route handler and the error handler wrapper
      router[route.httpMethod](route.path, routeHandler, errorHandlerWrapper);
    })
    .catch((error) => {
      console.error(`Failed to load handler for route '${route.path}':`, error);
    });
});
