import React from 'react';

import {useLocation} from "react-router-dom";
import UpdateProfile from "../component/UpdateProfile";
import Header from "../component/Header";

export default function EditProfilePage() {
    const location = useLocation()

    return (
        <>
            <Header/>
            <UpdateProfile username={location.pathname.split("/")[2]}/>
        </>
    );
}