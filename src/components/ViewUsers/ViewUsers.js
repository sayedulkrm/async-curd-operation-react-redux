import React from "react";
import "./ViewUsers.css";
import { useSelector } from "react-redux";

const ViewUsers = ({ id, setShowPopUp, showPopUp }) => {
    const allusers = useSelector((state) => state.userDetails.users);
    console.log(allusers);

    const user = allusers.find((user) => user.id === id);
    console.log(user);
    const { name, email, age, gender } = user;

    return (
        <div className="viewUsers-modal">
            <div className="viewusers">
                <button onClick={() => setShowPopUp(false)}>Close</button>
                <h3>Name: {name} </h3>
                <p>Email: {email} </p>
                <p>Age: {age} </p>
                <p>Gender: {gender} </p>
            </div>
        </div>
    );
};

export default ViewUsers;
