import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useGetUserMadeStoriesQuery, useGetUserSavedStoriesQuery } from "../features/apiSlice";

// Define the Story type
interface Story {
  id: number;
  title: string;
  cover: string;
}

const Library = () => {
  const navigate = useNavigate();
  // const { writtenStories, savedStories } = useSelector((state: RootState) => state.library);

  // RTK Query custom hooks to fetch user stories from DB
  const { data: writtenStories, error: writtenError, isLoading: writtenLoading } = useGetUserMadeStoriesQuery();
  const { data: savedStories, error: savedError, isLoading: savedLoading } = useGetUserSavedStoriesQuery();

  // handle loading of stories
  if (writtenLoading || savedLoading) {
    return <div>Loading...</div>;
  }

  // error handling for story loading
  if (writtenError || savedError) {
    return <div>Error occurred while fetching stories.</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Library</h1>

      <h2>Stories I've Written</h2>
      {writtenStories && writtenStories.length > 0 ?
        (writtenStories.map((story) => (
          <div key={story.id} onClick={() => navigate("/storyCreator")} style={{ cursor: "pointer" }}>
            <p>{story.title}</p>
          </div>
        ))
      ) : (
          <p>You haven't written any stories yet.</p>
      )}

      <h2>Stories I've Saved</h2>
      {savedStories && savedStories.length > 0 ? (
        savedStories.map((story) => (
          <div key={story.id} onClick={() => navigate(`/read/${story.id}`)} style={{ cursor: "pointer" }}>
            <p>{story.title}</p>
          </div>
        ))
      ) : (
        <p>You haven't saved any stories yet.</p>
      )}
    </div>
  );
};

export default Library;