import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addReequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.requests);
      dispatch(addReequests(res.data.requests));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="font-bold text-white justify-center flex my-10">
        No Requests Found!
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;

        return (
          <div
            className="p-4 m-4 bg-base-300 flex w-2/3 mx-auto flex flex-row justify-between items-center"
            key={_id}
          >
            <div>
              <img
                src={
                  photoUrl ||
                  "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                }
                alt="photo"
                className="w-30 h-30 "
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-2xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
