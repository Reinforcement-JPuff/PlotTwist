import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentStory } from "../storySlice";
import { useGetStoryCoverQuery } from "../features/apiSlice";
import { useGetCommentsQuery, usePostCommentMutation } from "../features/apiSlice";
import Comments from "../components/comments";

const Story = () => {
  const { id } = useParams();
  const storyID = Number(id);
  const dispatch = useDispatch();

  //const story = useSelector((state: RootState) => state.stories.currentStory);
  const { data: story, isLoading, isError } = useGetStoryCoverQuery(storyID);

  const [notification, setNotification] = useState(false);

  // if (!story) {
  //   return <p>Story not found. Please select a story.</p>;
  // }

  const handleAddToLibrary = () => {
    if (story) {
    dispatch(setCurrentStory(story));
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
    }
  };

  if (isLoading) return <p>Loading story...</p>;
  if (isError || !story) return <p>Story not found.</p>;

  return (
    <div>
      <h1>{story.title}</h1>
      <img src={story.cover} alt="Cover" width="200" />
      <p>{story.bio}</p>

      <div>
        <button onClick={() => alert("Reading story...")}>Read</button>
        <button onClick={handleAddToLibrary}>Add to Library</button>
      </div>

      <Comments storyID={story.id} />

      {notification && <div>Added to Library!</div>}
    </div>
  );
};

export default Story;