import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { goToPage } from "../readStorySlice";

interface StoryPage {
  id: number;
  title: string;
  text: string;
  choices: { text: string; nextPage: number }[];
}

const ReadStory = () => {
  const dispatch = useDispatch();
  const { pages, currentPage } = useSelector((state: RootState) => state.readStory);

  const current: StoryPage = pages.find((p) => p.id === currentPage) || pages[0];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{current.title}</h2>
      <p>{current.text}</p>
      <div>
        {current.choices.map((choice, i) => (
          <button key={i} onClick={() => dispatch(goToPage(choice.nextPage))}>
            {choice.text}
          </button>
        ))}
      </div>
      <p>Page {currentPage}</p>
    </div>
  );
};

export default ReadStory;