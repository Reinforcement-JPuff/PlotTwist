import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import jwtService from '../services/jwtService';
import 'dotenv/config';

const AuthController = {
    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        try {
            // error handling for user or password
            if (!username || !password) {
                return next({
                    log: 'In AuthController.verifyUser, missing username or password',
                    status: 400,
                    message: { err: 'Unsuccesful login attempt'}
                });
            }

            // query string for checking the DB for user and password
            const queryString = `SELECT * FROM users WHERE username = $1 AND password = $2`;
            const values = [username, password];
            console.log(values);

            // query database to fetch user if they exist in DB
            const loginResult: QueryResult = await pool.query(queryString, values);
            console.log('Login DB result:', loginResult.rows);

            // error handling if user doesn't exist, credientials are incorrect, etc.
            if (loginResult.rows.length === 0) {
                console.log("User not found");
                return next({
                    log: 'In AuthController.verifyUser, invalid username or password',
                    status: 401,
                    message: { err: 'Invalid login credentials'}
                });
            } else {
                // console.log("Valid user found, generating token...");
                const token = jwtService.generateJwtToken({ id: loginResult.rows[0].userID, username: username });
                // console.log('Generated token:', token);

                res.locals.verifiedUser = { id: loginResult.rows[0].userID, username: username };
                res.cookie('token', token, { maxAge: 3600000, httpOnly: true, secure: false, sameSite: 'strict' });
                return next();
            }
        } catch (err) {
            return next({
                log: 'Error in AuthController.verifyUser',
                status: 500,
                message: { err: 'An error occurred' }
            });
        }
    },
    
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        // create query string for DB
        const queryString = `SELECT * FROM users WHERE username = $1 AND password = $2`;
        const values = [username, password];

        try {
            const results: QueryResult = await pool.query(queryString, values);
            console.log(results.rows);
            
            if (results.rows.length === 0) {
                const insertText = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`;
                const insertResults: QueryResult = await pool.query(insertText, values);
                console.log('Inserted results for newly created user:', insertResults.rows[0]);
                res.locals.user = insertResults.rows[0].username;
            } else {
                console.log(results.rows[0]);
                res.locals.user = results.rows[0].username;
            }
            return next();
        } catch (err) {
            return next({
                log: 'Error in AuthController.createUser',
                status: 500,
                message: { err: 'An error occurred' }
            });
        }
    },

    checkCookie: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token;

        if (!token) {
            return next();
        }
    
        // need to check & decode for token, give access to protected routes
        try {
            const decoded = jwtService.verifyJwtToken(token);
            res.locals.verifiedUser = decoded;
            return next();

        } catch (err) {
            // return next({
            //     log: 'In AuthController.checkCookie, invalid or expired token',
            //     status: 401,
            //     message: { err: 'Invalid token'}
            // })
            return next()
        }
    }
}

export default AuthController;