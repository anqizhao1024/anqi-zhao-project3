import './App.css';

import React, {useEffect} from 'react';
import UserPage from './pages/UserPage';
import SignInPage from "./pages/SignInPage";
import EditTweetPage from "./pages/EditTweetPage";
import EditProfilePage from "./pages/EditProfilePage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchCookie} from "./reducer/userReducer";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCookie())
    }, [dispatch]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/user/:name" element={<UserPage/>}/>
                <Route path="/signin" element={<SignInPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/tweet/:id/edit/" element={<EditTweetPage/>}/>
                <Route path="/user/:name/edit/" element={<EditProfilePage/>}/>
            </Routes>
        </div>
    )
}

export default App;
