import React, { useState } from "react";

const storyData = [
  {
    id: 1,
    title: "The Beginning",
    text: "You are in a dark cave. There's a path to the left and right.",
    choices: ["Go Left", "Go Right"],
    nextPages: [2, 3],
  },
  {
    id: 2,
    title: "The Left Path",
    text: "You find an old shrine. The door creaks open...",
    choices: ["Enter the shrine", "Go back"],
    nextPages: [4, 1],
  },
  {
    id: 3,
    title: "The Right Path",
    text: "You hear a groan. Something is watching you...",
    choices: ["Run!", "Stand still"],
    nextPages: [1, 5],
  },
];

const readStory = () => {
  const [page, setPage] = useState(1);

  const current = storyData.find((s) => s.id === page) || storyData[0];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{current.title}</h2>
      <p>{current.text}</p>
      <div>
        {current.choices.map((choice, i) => (
          <button key={i} onClick={() => setPage(current.nextPages[i])}>
            {choice}
          </button>
        ))}
      </div>
      <p>Page {page}</p>
    </div>
  );
};

export default readStory;