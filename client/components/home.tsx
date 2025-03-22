import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../loginSlice";
import React, { MouseEventHandler } from "react";
import { useGetStoriesFeedQuery } from "../features/apiSlice";

interface Story {
  id: number;
  title: string;
  cover: string | undefined;
  bio: string;
  created_at?: string;
}


const Home = () => {
  const storedStories: Story[] = useSelector((state: RootState) => state.stories.stories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: stories, error, isLoading } = useGetStoriesFeedQuery();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('In the handleLogout');
    dispatch(logout({username: "", password: ""}));
    alert("Logging out of PlotTwist.");
    navigate("/");
  }

  // loading story handling
  if (isLoading) {
    return <div>Loading stories...</div>;
  }

  // error handling for loading home story feed
  if (error) {
    return <div>Error loading stories.</div>;
  }

  const storiesToDisplay = stories || storedStories;

  return (
    <div id="homeFeed">
      <h1>PlotTwist</h1>
      <button className="homeFeedButtons" id="myLibraryButton" onClick={() => handleNavigation('/library')}>My Library</button>
      <button className="homeFeedButtons"id="createNewStory" onClick={() => handleNavigation('/storyCreator')}>Create a New Story</button>
      <button className="homeFeedButtons"id="logoutButton" onClick={handleLogout}>Logout</button>
      
      <div className="homeFeedCardContainer">
        {storiesToDisplay?.map((story: Story) => (
          <div className="homeFeedCard" key={story.id} onClick={() => handleNavigation('/story')}>
            <img className="homeFeedImg" src={story.cover}></img>
            <p className="homeFeedTitle">{story.title}</p>
            <p className="homeFeedBio">{story.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
