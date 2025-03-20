import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import React from "react";

interface Story {
  id: number;
  title: string;
}

const Home = () => {
  const stories: Story[] = useSelector((state: RootState) => state.stories.stories);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <button id="myLibraryButton" onClick={() => handleNavigation('/library')}>My Library</button>
      <button id="createNewStory" onClick={() => handleNavigation('/storyCreator')}>Create a New Story</button>
      <button id="logoutButton" onClick={() => handleNavigation('/login')}>Logout</button>
      
      <div>
        {stories.map((story: Story) => (
          <div key={story.id} onClick={() => alert(`Opening ${story.title}`)}>
            <p>{story.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
