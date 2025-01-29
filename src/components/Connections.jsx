import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsData) return;

  if (connectionsData.length === 0)
    return (
      <h1 className="font-bold text-white justify-center flex my-10">
        No Connections Found!
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections</h1>
      {connectionsData.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        } = connection;

        return (
          <div className="p-4 m-4 bg-base-300 flex w-1/2 mx-auto" key={_id}>
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
