// custom.d.ts
import { Request, Response } from 'express';

declare global {
  namespace Express {
    // Extending Request to include custom body and cookies
    interface Request {
      body: {
        user?: string;
        pass?: string;
      };
      cookies: {
        token?: string;
      };
    }

    // Extending Response to include custom cookies
    interface Response {
      cookie(name: string, value: string, options?: { maxAge?: number; httpOnly?: boolean; secure?: boolean }): Response;
      cookies: {
        token?: string;
      };
    }
   }
}
