import React, { useEffect, useState } from "react";

import "./Read.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../features/userdetailsSlice";
import { Link } from "react-router-dom";
import ViewUsers from "../ViewUsers/ViewUsers";

const Read = () => {
    const [id, setId] = useState();

    const [showPopUp, setShowPopUp] = useState(false);

    const [radioData, setRadioData] = useState("");

    const dispatch = useDispatch();
    const { isLoading, users, error, searchUser } = useSelector(
        (state) => state.userDetails
    );

    const handleViewUser = (id) => {
        setId(id);
        setShowPopUp(true);
    };

    const getUsersGender = (e) => {
        setRadioData(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <div className="read-section">
            {showPopUp && (
                <ViewUsers
                    id={id}
                    setShowPopUp={setShowPopUp}
                    showPopUp={showPopUp}
                />
            )}

            <h1>All Users</h1>
            <p> Number of Users: {users.length} </p>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <input
                    required
                    type="radio"
                    value=""
                    name="gender"
                    checked={radioData === ""}
                    onChange={getUsersGender}
                />
                <label>All</label>

                <input
                    required
                    type="radio"
                    value="Male"
                    name="gender"
                    checked={radioData === "Male"}
                    onChange={getUsersGender}
                />
                <label>Male</label>
                <input
                    required
                    type="radio"
                    value="Female"
                    name="gender"
                    checked={radioData === "Female"}
                    onChange={getUsersGender}
                />
                <label>Female</label>
            </div>

            <div className="read-section-all-card">
                {error && (
                    <h1>{error.message || "oops something went wrong"}</h1>
                )}
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    users &&
                    users
                        .filter((user) => {
                            if (searchUser === "") {
                                return user;
                            } else {
                                return user.name
                                    .toLowerCase()
                                    .includes(searchUser.toLowerCase());
                            }
                        })
                        .filter((user) => {
                            // if (radioData === "Male") {
                            //     return user.gender === radioData;
                            // } else if (radioData === "Female") {
                            //     return user.gender === radioData;
                            // } else return user;

                            switch (radioData) {
                                case "Male":
                                case "Female":
                                    return user.gender === radioData;

                                case "":
                                    return user;

                                default:
                                    return user;
                            }
                        })

                        .map((user) => {
                            const { name, email, age, gender, id } = user;

                            return (
                                <div
                                    className="read-section-main-card"
                                    key={id}
                                >
                                    <img
                                        src={`https://robohash.org/${id}?size=200x200`}
                                        alt={name}
                                    />
                                    <h3>Name: {name} </h3>
                                    <p>Email: {email} </p>
                                    {/* <p>Age: {age} </p> */}
                                    <p>Gender: {gender} </p>
                                    <div className="card-button">
                                        <button
                                            onClick={() => handleViewUser(id)}
                                        >
                                            View
                                        </button>

                                        <Link to={`/edit/${id}`}>
                                            <button>Edit</button>
                                        </Link>

                                        <button
                                            onClick={() =>
                                                dispatch(deleteUser(id))
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    );
};

export default Read;
