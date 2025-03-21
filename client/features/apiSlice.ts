// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { LoginState } from '../loginSlice';
export type { LoginState }

// resources: RTK Query - https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics, https://www.youtube.com/watch?v=-8WEd578fFw (Pedro Tech)

// import any types / interfaces needed, then export them
// Redux example below, edit for our stuff

// Define our single API slice object
export const apiSlice  = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({
        baseUrl: 'localhost:8080/',
        credentials: "include", // send cookies
    }), 
  // The "endpoints" represent operations and requests for this server
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
    }),
});

// Export the auto-generated hook for the query endpoints
 export const { useLoginUserMutation, useNewUserMutation } = apiSlice;