// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { LoginState } from '../loginSlice';
import { Story, StoryState } from '../storySlice';
export type { LoginState }

// resources: RTK Query - https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics, https://www.youtube.com/watch?v=-8WEd578fFw (Pedro Tech)

// import any types / interfaces needed, then export them (?)


// Define our single API slice object
export const apiSlice  = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        credentials: "include", // send cookies
    }), 
  // The "endpoints" represent operations and requests for this server
  // Login / logout
    endpoints: (builder) => ({
        // <LoginState.username, LoginState.password> ({
        loginUser: builder.mutation<{message : string} , {username : string; password: string}> ({
            query: (credentials) => ({
                url: 'login',
                method : "POST",
                body: credentials,
            }),
    }),
        newUser: builder.mutation <{message : string} , {username : string; password: string}> ({
            query: (credentials) => ({
                url: 'newLogin',
                method : "POST",
                body: credentials,
            }),
        }),
        // New user login
        // Home page (e.g., grab latest stories)
        getStoriesFeed: builder.query <Story[], void> ({
            query: () => '/home'
        }),
        // Library (e.g., stories written by user, their saved stories)
        // Story Creator (e.g., saving a finished story)
        // Story cover (e.g., getting a story cover with bio, comments)
        getStoryCover: builder.query <{ id: number, title: string, cover: string, bio: string }, void> ({
            query: () => '/story/:id'
        })
        // Comments (fetching saved comments for a story)
        // Read Story (getting a story text)
    }),
});

// Export the auto-generated hook for the query endpoints
export const {
    useLoginUserMutation,
    useNewUserMutation,
    useGetStoriesFeedQuery,
    useGetStoryCoverQuery,
    } = apiSlice;