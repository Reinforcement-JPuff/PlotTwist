import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      body: {
        user?: string;
        pass?: string;
      };
      cookies: {
        token?: string;
      };
    }

    interface Response {
      cookie(name: string, value: string, options?: { maxAge?: number; httpOnly?: boolean; secure?: boolean }): Response;
      cookies: {
        token?: string;
      };
    }
  }
}
