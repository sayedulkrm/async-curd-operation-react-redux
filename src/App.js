import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Create from "./components/Create/Create";
import { Route, Routes } from "react-router-dom";
import Read from "./components/Read/Read";
import UpdateUsers from "./components/Update/UpdateUsers";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Read />} />
                <Route path="/add" element={<Create />} />
                <Route path="/edit/:id" element={<UpdateUsers />} />
            </Routes>
        </div>
    );
};

export default App;
