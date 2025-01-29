import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feedData) return;
    try {
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(feed.data);
      dispatch(addFeed(feed.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) return;

  if (feedData.length <= 0)
    return (
      <h1 className="font-bold text-white justify-center flex my-10">
        No more users found!
      </h1>
    );

  return (
    feedData && (
      <div>
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
