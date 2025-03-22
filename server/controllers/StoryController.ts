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
    // get full story by page
    getPage: async (req: Request, res: Response, next: NextFunction) => {
      const { storyId, pageId } = req.params;
      try {
        const result = await pool.query(
          "SELECT * FROM pages WHERE story_id = $1 AND id = $2",
          [storyId, pageId]
        );
    
        if (result.rows.length === 0) {
          return next({
            log: 'Page not found',
            status: 404,
            message: { err: 'Page not found' },
          });
        }
    
        res.locals.page = result.rows[0];
        return next();
      } catch (err) {
        return next({
          log: 'Error in getPage controller',
          status: 500,
          message: { err: 'Internal server error' },
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

  getStoriesFeed: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryText = "SELECT * FROM stories ORDER BY created_at DESC LIMIT 10";

      const result: QueryResult = await pool.query(queryText, []);

      if (result.rows.length === 0) {
        return next({
          log: "Error retrieving stories",
          status: 404,
          message: { err: "Couldn't retrieve stories" },
        });
      }

      res.locals.storiesFeed = result.rows;
      return next();
    } catch (err) {
      return next({
        log: "Error in StoryController.getStoriesFeed",
        status: 500,
        message: { err: "An error occurred" },
      });
    }
  }
};

export default StoryController;