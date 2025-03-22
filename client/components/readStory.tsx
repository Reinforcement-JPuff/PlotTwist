import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetStoryPageQuery } from "../features/apiSlice";

const ReadStory  = () => {
  const { storyId, pageId } = useParams();
  const navigate = useNavigate();

  const numericStoryId = Number(storyId);
  const numericPageId = Number(pageId);

  const { data: page, isLoading, isError } = useGetStoryPageQuery({
    storyId: numericStoryId,
    pageId: numericPageId,
  });

  if (isLoading) return <p>Loading story page...</p>;
  if (isError || !page) return <p>Page not found.</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{page.title}</h2>
      <p>{page.text}</p>
      <div style={{ marginTop: "20px" }}>
        {page.choices.map((choice, i) => (
          <button
            key={i}
            style={{ margin: "5px", padding: "10px" }}
            onClick={() =>
              navigate(`/story/${numericStoryId}/page/${choice.nextPage}`)
            }
          >
            {choice.text}
          </button>
        ))}
      </div>
      <p style={{ marginTop: "10px" }}>Page {page.id}</p>
    </div>
  );
};

export default ReadStory;