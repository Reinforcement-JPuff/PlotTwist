import React from "react";
import { useSelector } from "../../node_modules/react-redux/dist/react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

const Home = () => {
    const stories= useSelector((state:RootState) => state.stories.stories);
    const navigate = useNavigate();

    const handleMyLibraryClick = (e: any) => {
        e.preventDefault();
        navigate('/library');
    }

    const handleCreateStoryClick = (e: any) => {
        e.preventDefault();
        navigate('/storyCreator');
    }

    const handleLogoutClick = (e: any) => {
        e.preventDefault();
        navigate('/login');
    }

    return(
        <div>
            <button id="myLibraryButton" onClick={handleMyLibraryClick}>My Library</button>
            <button id="createNewStory" onClick={handleCreateStoryClick}>Create a New Story</button>
            <button id="logoutButton" onClick={handleLogoutClick}>Logout</button>
            <div>
                {stories.map((story) => (
                    <div key = {story.id} onClick={() => alert('Opening ${story.title')}>
                     <p> {story.title} </p>
                     </div>   
                ))}
            </div>
            <button onClick={() => navigate("/login")}> Log Out </button>
        </div>
    )
}

export default Home;