import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import AuthController from './controllers/AuthController';
import StoryController from "./controllers/StoryController";
import CreateStoryController from './controllers/CreateStoryController';
import 'dotenv/config';
import cors from 'cors';
import CommentsController from './controllers/CommentsController';

const app = express();
const PORT = 3000;

// parse text from html forms
app.use(express.urlencoded({ extended: true }));
// parse JSON
app.use(express.json());
// parse cookies
app.use(cookieParser());
// enable CORS for frontend requests
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

// serve static assests in build folder
app.use(express.static(path.resolve(__dirname, '../assets')));

// route for root
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/*
  Login 
  */

// route for login & auth
app.post('/login', AuthController.checkCookie, AuthController.verifyUser, (req: Request, res: Response) => {
  res.status(200).json(`Welcome, ${res.locals.verifiedUser.username}`)
});

// route for new users, redirect to login after a new account is made
app.post('/newLogin', AuthController.createUser, (req: Request, res: Response) => {
  res.status(200).json(`Welcome to PlotTwist, ${res.locals.user}!`)
});

/* 
  Story 
  */

//route for fetching story info 
app.get('/story/:id', StoryController.getStory, (req: Request, res: Response) => {
  res.status(200).json(res.locals.story);
});

//route for getting the story text
app.get('/story/:storyId/page/:pageId', StoryController.getPage, (req, res) => {
  res.status(200).json(res.locals.page);
});

//route for getting saved stories
app.get("/library", StoryController.getLibraryStories, (req: Request, res: Response) => {
  res.status(200).json(res.locals.library);
});

// route for getting stories in the feed for home
app.get("/home", StoryController.getStoriesFeed, (req: Request, res: Response) => {
  res.status(200).json(res.locals.storiesFeed);
});

/*
  Story Creator
  */
 
// route for story creation (saving a full story graph)
app.post('/saveStory', CreateStoryController.saveStory, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Story saved successfully', storyId: res.locals.savedStoryId });
});

/* Comments */

// route to get comments
app.get('/story/:id/comments', CommentsController.getComments, (req: Request, res: Response) => {
  res.status(200).json(res.locals.fetchedComments)});
  
// route to post comments
app.post("/story/:id/comments", CommentsController.postComment, (req: Request, res: Response) => {
  res.status(200).json(res.locals.newComment)});


// Serves React frontend for all unmatched routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// global error handler
app.use((err: any, req: any, res: any, next: any) => {
  const defaultError = {
      log: 'Express error handler caught an error in middleware',
      status: 500,
      message: { err: 'An error occurred' }
  };

  const error = { ...defaultError, ...err };
  console.error(error.log);
  return res.status(error.status).json(error.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});