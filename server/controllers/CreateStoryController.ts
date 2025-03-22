import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import jwtService from '../services/jwtService';
import 'dotenv/config';
import { populate } from 'dotenv';
import { node } from 'webpack';

 const CreateStoryController = {
    saveStory: async (req: Request, res: Response, next : NextFunction) => {
      const { nodes, edges } = req.body;
      console.log('Nodes:', nodes);
      console.log('Edges:', nodes);

    try {
        const token = req.cookies.token;
        const decoded = jwtService.verifyJwtToken(token);
        const userId = decoded.id;
        
        const storyInsertText = `
        INSERT INTO stories (user_id, title, cover) 
        VALUES ($1, $2, $3) RETURNING id `;
        const storyValues = [userId, 'untitled Story', '/placeolder.jpg'];
        const storyResult: QueryResult = await pool.query(storyInsertText, storyValues);
        const storyId = storyResult.rows[0].id;

        for(const node of nodes) {
            const { node_id, position_x, position_y, data } = node;
            await pool.query( 
            `INSERT INTO storyNodes (node_id, position_x, position_y, label, content, storyID) 
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [node_id, position_x, position_y, data.label, data.content, storyId]
            );
        }

        for(const edge of edges) {
            const { edge_id, source_id, target_id, storyID } = edge;
            await pool.query(`INSERT INTO storyEdges (source_id, target_id) VALUES $1, $2, $3`,
            [source_id, target_id, storyID]);
        }
        
        return next();

    } catch (error) {
        console.error('Error saving story:', error);
        return next({
          log: 'Error in CreateStoryController.saveStory',
          status: 500,
          message: { err: 'Failed to save story' },
        });
      }
    },
  };

export default CreateStoryController