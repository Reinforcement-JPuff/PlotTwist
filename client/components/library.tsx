import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

// Define the Story type
interface Story {
  id: number;
  title: string;
  cover: string;
}

const Library = () => {
  const navigate = useNavigate();
  const { writtenStories, savedStories } = useSelector((state: RootState) => state.library);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Library</h1>

      <h2>Stories I've Written</h2>
      {writtenStories.map((story) => (
        <div key={story.id} onClick={() => navigate("/storyCreator")} style={{ cursor: "pointer" }}>
          <p>{story.title}</p>
        </div>
      ))}

      <h2>Stories I've Saved</h2>
      {savedStories.map((story) => (
        <div key={story.id} onClick={() => navigate(`/read/${story.id}`)} style={{ cursor: "pointer" }}>
          <p>{story.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Library;