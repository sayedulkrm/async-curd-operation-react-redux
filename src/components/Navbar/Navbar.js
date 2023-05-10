import React, { useEffect, useState } from "react";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchUser } from "../../features/userdetailsSlice";

const Navbar = () => {
    const [user, setSearchUser] = useState("");
    const dispatch = useDispatch();

    const handleSearchUser = (e) => {
        setSearchUser(e.target.value);
    };

    useEffect(() => {
        dispatch(searchUser(user));
    }, [user]);

    return (
        <div className="navbar">
            <h1>
                <Link to={"/"}>Redux-Toolkit-CURD</Link>
            </h1>

            <ul>
                <li>
                    <Link to={"/create-post"}>Create Post</Link>
                </li>
                <li>
                    <Link to={"/add"}>Add User</Link>
                </li>
                <input
                    type="text"
                    placeholder="Search Users"
                    value={user}
                    onChange={handleSearchUser}
                />
            </ul>
        </div>
    );
};

export default Navbar;
