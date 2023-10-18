import React, { useState } from 'react'

export const LikeButtonComponent = () => {

    // Initial number of Likes
    const [likes, setLikes] = useState(100);
    // tells whether the button has been liked
    const [liked, setLiked] = useState(false);

    // Fonction pour gérer le clic sur le bouton "J'aime"
    const handleLikeClick = () => {
        if (liked) {
            // If the button has been liked, decrease the "Likes" count and remove the "liked" class
            setLikes(likes - 1);
            setLiked(false);
        } else {
            // If the button hasn't been liked, increase the "Likes" count and add the "liked" class
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    // CSS class for the button based on the "liked" state (I'm not providing here a CSS file cause it's not the goal of the exercise)
    const buttonClassName = liked ? 'like-button liked' : 'like-button';
    return (
        <div>
            <button className={buttonClassName} onClick={handleLikeClick}>
                J'aime | <span className="likes-counter">{likes}</span>
            </button>
        </div>
    )
}

