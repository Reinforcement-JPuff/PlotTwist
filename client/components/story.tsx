import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateStory } from "../storySlice";
import Comments from "../components/comments";

const Story: React.FC = () => {
  const dispatch = useDispatch();
  const story = useSelector((state: RootState) => state.story);
  const [notification, setNotification] = useState(false);

  const handleAddToLibrary = () => {
    dispatch(updateStory(story)); // Updates Redux story state
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  return (
    <div>
      <h1>{story.title}</h1>
      <img src={story.cover} alt="Cover" width="200" />
      <p>{story.bio}</p>

      <div>
        <button onClick={() => alert("Reading story...")}>Read</button>
        <button onClick={handleAddToLibrary}>Add to Library</button>
      </div>

      <Comments />

      {notification && <div>Added to Library!</div>}
    </div>
  );
};

export default Story;