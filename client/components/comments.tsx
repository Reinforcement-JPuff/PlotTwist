import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addComment } from "../commentsSlice";

const Comments = () => {
  const comments = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  return (
    <div>
      <h3>Comments</h3>
      <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid black", padding: "10px" }}>
        {comments.map((comment, i) => (
          <p key={i}>{comment}</p>
        ))}
      </div>
      <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={() => dispatch(addComment(newComment))}>+</button>
    </div>
  );
};
export default Comments;