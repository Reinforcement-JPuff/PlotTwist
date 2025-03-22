import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import jwtService from '../services/jwtService';
import 'dotenv/config';

const CommentsController = {
    // fetch comments from the DB
    getComments: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const queryText = `SELECT * FROM comments WHERE storyID = $1`;

            const result: QueryResult = await pool.query(queryText, []);

            if(result.rows.length === 0) {
                return next({
                    log: "In CommentsController, error retrieving comments",
                    status: 404,
                    message: { err: "Couldn't retrieve comments" }
                })
            }
            res.locals.fetchedComments = result.rows;
            return next();

        } catch (err) {
            return next({
                log: "Error in CommentsController.getComments",
                status: 500,
                message: { err: "An error occurred" },
            });
        }
    },
    postComment: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { username, text } = req.body;

        try {
            if (!text || !username) {
                return next({
                log: "Error in CommentsController.postComment: Missing text or username",
                status: 400,
                message: { err: "Both 'text' and 'username' are required" }
                })
            }
            const queryText = `INSERT INTO comments (storyID, text, username) VALUES ($1, 2, $3) RETURNING *`;
            const values = [id, text, username];

            const result: QueryResult = await pool.query(queryText, values);

            if (result.rows.length === 0) {
                return next({
                    log: "In CommentsController.postComment, error posting comment",
                    status: 500,
                    message: { err: "Failed to post comment"}
                })
            }
            res.locals.newComment = result.rows[0];

        } catch (err) {
            return next({
                log: "Error in CommentsController.postComments",
                status: 500,
                message: { err: "An error occurred" },
            });
        }
    }
}

export default CommentsController