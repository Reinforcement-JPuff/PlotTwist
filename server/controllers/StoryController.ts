import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import jwtService from '../services/jwtService';
import 'dotenv/config';

export const StoryController: object = {
    // getStoryCover: async (req: Request, res: Response, next: NextFunction) => {}

    // getStoryText: async (req: Request, res: Response, next: NextFunction) => {}

    // getSavedStory: async (req: Request, res: Response, next: NextFunction) => {}

    // return next();
}

export default StoryController;