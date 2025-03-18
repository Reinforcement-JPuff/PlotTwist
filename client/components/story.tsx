import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToLibrary } from "../storySlice"

interface StoryProps {
  id: number;
  title: string;
  cover: string;
  bio: string;
}

const Story = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);

  const story: StoryProps = {
    id: 1,
    title: "The Unexpected Twist",
    cover: "/cover.jpg",
    bio: "A mystery story full of surprises.",
  };

  const handleAddToLibrary = () => {
    dispatch(addToLibrary(story));
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

      <button>Comments</button>

      {notification && <div>Added to Library!</div>}
    </div>
  );
};


export default Story;
