import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../features/userdetailsSlice";

const UpdateUsers = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [updateUserData, setUpdateUserData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
    });

    const allusers = useSelector((state) => state.userDetails.users);

    // const user = allusers.find((user) => user.id === id);
    // console.log(user);
    // const { name, email, age, gender } = user;

    const newData = (e) => {
        setUpdateUserData({
            ...updateUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateUserData));
        navigate("/");
    };

    useEffect(() => {
        if (id) {
            const user = allusers.find((user) => user.id === id);
            setUpdateUserData(user);
        }
    }, [id]);

    const { name, email, age, gender } = updateUserData;

    return (
        <div className="create-user">
            <h1>Update User</h1>
            <form
                onSubmit={handleUpdateSubmit}
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
                        onChange={newData}
                        value={name}
                    />
                </div>

                <div className="create-from-list">
                    <label>Email</label>
                    <input
                        required
                        name="email"
                        type="email"
                        onChange={newData}
                        value={email}
                    />
                </div>

                <div className="create-from-list">
                    <label>Age</label>
                    <input
                        required
                        name="age"
                        type="number"
                        onChange={newData}
                        value={age}
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
                            onChange={newData}
                            checked={gender === "Male"}
                        />
                    </div>
                    <div>
                        <label>Female</label>

                        <input
                            required
                            type="radio"
                            value="Female"
                            name="gender"
                            onChange={newData}
                            checked={gender === "Female"}
                        />
                    </div>
                </div>

                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUsers;
