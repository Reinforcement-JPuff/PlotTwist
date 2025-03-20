import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import jwtService from '../services/jwtService';
import 'dotenv/config';


const StoryController = {
    // get story cover page
    getStory: async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const queryText = "SELECT id, title, cover, bio FROM stories WHERE id = $1";
        const values = [id];
  
        const result: QueryResult = await pool.query(queryText, values);
  
        if (result.rows.length === 0) {
          return next({
            log: "Story not found",
            status: 404,
            message: { err: "Story not found" },
          });
        }
  
        res.locals.story = result.rows[0];
        return next();
      } catch (err) {
        return next({
          log: "Error in StoryController.getStory",
          status: 500,
          message: { err: "An error occurred" },
        });
      }
    },
  // Get full story text 
    getFullStory: async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const queryText = "SELECT text FROM stories WHERE id = $1";
        const values = [id];
  
        const result: QueryResult = await pool.query(queryText, values);
  
        if (result.rows.length === 0) {
          return next({
            log: "Story text not found",
            status: 404,
            message: { err: "Story text not found" },
          });
        }
  
        res.locals.fullStory = result.rows[0];
        return next();
      } catch (err) {
        return next({
          log: "Error in StoryController.getFullStory",
          status: 500,
          message: { err: "An error occurred" },
        });
      }
    },
  // Get saved stories for the Library 
    getLibraryStories: async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const queryText = "SELECT id, title, cover FROM stories WHERE saved = true";
        const result: QueryResult = await pool.query(queryText, []);


        res.locals.library = result.rows;
        return next();
      } catch (err) {
        return next({
          log: "Error in StoryController.getLibraryStories",
          status: 500,
          message: { err: "An error occurred" },
        });
      }
    },
  };

export default StoryController;