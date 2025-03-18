import jwtService from '../services/jwtService';
// import plotTwistModel from '../models/plotTwistModel';
import pool from '../models/plotTwistModel';
import query from '../models/plotTwistModel';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const AuthController = {
    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        // console.log('In AuthController.verifyUser');
        const { user, pass } = req.body;
        
        try {
            // error handling for user or password
            if (!user || !pass) {
                return next({
                    log: 'In AuthController.verifyUser, missing username or password',
                    status: 400,
                    message: { err: 'Unsuccesful login attempt'}
                });
            }

            // query string for checking the DB for user and password
            const queryString = `SELECT * FROM user WHERE username = $1 AND password = $2`;
            const values = [user, pass];

            // query database to fetch user if they exist in DB
            const loginResult: any = await pool.query(queryString, values);
            // error handling if user doesn't exist, crediential are incorrect, etc.
            if (loginResult.rows.length === 0) {
                return next({
                    log: 'In AuthController.verifyUser, invalid username or password',
                    status: 401,
                    message: { err: 'Invalid login credentials'}
                });
            } else {
                // NOTE: function to create a JWT --- see Services folder
                const token = generateJwtToken(values[0]);

                res.cookie('token', token, { maxAge: 3600000, httpOnly: true, secure: true });
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
    
    // not sure if necessary? can set cookie after verifying user
    // setCookie: async (req: any, res: any, next: any) => {
        
        
    //     return next();
    // },

    checkCookie: async (req: any, res: any, next: any) => {
        const token = req.cookies.token;

        if (!token) {
            return next({
                log: 'In AuthController.checkCookie, no token found',
                status: 401,
                message: { err: 'Please sign in to view this page.' }
            });
        }
    
        // need to check & decode for token, give access to protected routes
        try {
            const decoded = verifyJwtToken(token);
            res.locals.verifiedUser = decoded;
            return next();
        } catch (err) {
            return next({
                log: 'In AuthController.checkCookie, invalid or expired token',
                status: 401,
                message: { err: 'Invalid token'}
            })
        }
    }
}

export default AuthController;

function generateJwtToken(arg0: any) {
    throw new Error('Function not implemented.');
}
function verifyJwtToken(token: any) {
    throw new Error('Function not implemented.');
}