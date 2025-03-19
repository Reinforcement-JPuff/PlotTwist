import { Request, Response } from 'express';

// NOTE: type for environment variables to try and fix DB connectivity issue (queries not working when using env variable, but do work when hard coding the DB's URI)
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URI: string;
  }
}

// types for Express server requests, responses
declare global {
  namespace Express {
    interface Request {
      body: {
        username?: string;
        password?: string;
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
