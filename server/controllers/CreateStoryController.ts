import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import jwtService from '../services/jwtService';
import 'dotenv/config';

 const CreateStoryController: object = {
    saveStory: async (req: Request, res: Response, next : NextFunction) => {
        
    }
    // return next();
}

export default CreateStoryController