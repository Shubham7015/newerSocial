import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";

function PostCard({ $id, title, featuredImage, likes = [], dislikes = [] }) {
  const [imageUrl, setImageUrl] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  
  // Ensure arrays
  const [currentLikes, setCurrentLikes] = useState(Array.isArray(likes) ? likes : []);
  const [currentDislikes, setCurrentDislikes] = useState(Array.isArray(dislikes) ? dislikes : []);
  
  // Check status
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (userData) {
      setLiked(currentLikes.includes(userData.$id));
      setDisliked(currentDislikes.includes(userData.$id));
    }
  }, [userData, currentLikes, currentDislikes]);

  useEffect(() => {
    setImageUrl(service.getFileURL(featuredImage));
  }, [featuredImage]);

  const handleLike = async () => {
    if (!userData) return;

    let newLikes = [...currentLikes];
    let newDislikes = [...currentDislikes];

    if (liked) {
      // Unlike
      newLikes = newLikes.filter(id => id !== userData.$id);
    } else {
      // Like
      newLikes.push(userData.$id);
      // Remove from dislikes if present
      if (disliked) {
        newDislikes = newDislikes.filter(id => id !== userData.$id);
      }
    }

    // Optimistic Update
    setCurrentLikes(newLikes);
    setCurrentDislikes(newDislikes);
    setLiked(!liked);
    if (disliked && !liked) setDisliked(false);

    // Backend Update
    await service.updatePost($id, {
        likes: newLikes,
        dislikes: newDislikes
    });
  };

  const handleDislike = async () => {
    if (!userData) return;

    let newLikes = [...currentLikes];
    let newDislikes = [...currentDislikes];

    if (disliked) {
      // Remove Dislike
      newDislikes = newDislikes.filter(id => id !== userData.$id);
    } else {
      // Dislike
      newDislikes.push(userData.$id);
      // Remove from likes if present
      if (liked) {
        newLikes = newLikes.filter(id => id !== userData.$id);
      }
    }

    // Optimistic Update
    setCurrentLikes(newLikes);
    setCurrentDislikes(newDislikes);
    setDisliked(!disliked);
    if (liked && !disliked) setLiked(false);

    // Backend Update
    await service.updatePost($id, {
        likes: newLikes,
        dislikes: newDislikes
    });
  };

  return (
  <div className="bg-blue-100 rounded-xl p-4 shadow-lg w-[300px] h-[350px] flex flex-col mx-3">
    
    {/* Image */}
    <Link to={`/post/${$id}`}>
      <div className="w-full h-[200px] overflow-hidden rounded-xl mb-3">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "/placeholder.png" }}
        />
      </div>
    </Link>

    {/* Title (max 2 lines, fixed height) */}
    <h2 className="text-lg font-bold mb-3 line-clamp-2 min-h-12">
      {title}
    </h2>

    {/* Like / Dislike Buttons ALWAYS stay at bottom */}
    <div className="flex items-center gap-5 mt-auto">
      {/* LIKE */}
      <button
        onClick={handleLike}
        className="flex items-center gap-1 text-green-700 hover:text-green-900 cursor-pointer"
      >
        {liked ? <AiFillLike size={22} /> : <AiOutlineLike size={22} />}
        <span>{currentLikes.length}</span>
      </button>
      {/* DISLIKE */}
      <button
        onClick={handleDislike}
        className="flex items-center gap-1 text-red-700 hover:text-red-900 cursor-pointer"
      >
        {disliked ? <AiFillDislike size={22} /> : <AiOutlineDislike size={22} />}
        <span>{currentDislikes.length}</span>
      </button>
    </div>

  </div>
);

}

export default PostCard;
  