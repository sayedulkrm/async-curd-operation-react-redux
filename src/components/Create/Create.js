import React, { useState } from "react";
import "./Create.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/userdetailsSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [users, setUsers] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUsersData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createUser(users));
        navigate("/");
        document.getElementsByName("name")[0].value = "";
        document.getElementsByName("email")[0].value = "";
        document.getElementsByName("age")[0].value = "";
        document.getElementsByName("gender")[0].checked = false;
        document.getElementsByName("gender")[1].checked = false;
    };

    return (
        <div className="create-user">
            <h1>Create User</h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <div className="create-from-list">
                    <label>Name</label>
                    <input
                        required
                        name="name"
                        type="text"
                        onChange={getUsersData}
                    />
                </div>

                <div className="create-from-list">
                    <label>Email</label>
                    <input
                        required
                        name="email"
                        type="email"
                        onChange={getUsersData}
                    />
                </div>

                <div className="create-from-list">
                    <label>Age</label>
                    <input
                        required
                        name="age"
                        type="number"
                        onChange={getUsersData}
                    />
                </div>

                <div className="create-from-list">
                    <div>
                        <label>Male</label>

                        <input
                            required
                            type="radio"
                            value="Male"
                            name="gender"
                            onChange={getUsersData}
                        />
                    </div>
                    <div>
                        <label>Female</label>

                        <input
                            required
                            type="radio"
                            value="Female"
                            name="gender"
                            onChange={getUsersData}
                        />
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Create;
