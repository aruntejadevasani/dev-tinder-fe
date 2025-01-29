import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills, about, photoUrl } = user;
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src={
              photoUrl ||
              "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
            }
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {age && gender && <p>{age + ", " + gender}</p>}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
