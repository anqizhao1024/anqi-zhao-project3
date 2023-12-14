import * as React from 'react';
import Logo from "./Logo";
import LoginNav from "./navs/LoginNav";
import LogoutMenu from "./navs/LogoutNav";
import Grid from "@mui/joy/Grid";
import {useSelector} from "react-redux";

export default function PrimarySearchAppBar() {
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)

    return (
        <div style={{backgroundColor: "rgb(29, 155, 240)"}}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={2}>
                    <div style={{color: "white", marginLeft: "20px", cursor: 'default'}}>
                        <Logo/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={2}>
                    {
                        isLoggedIn ? <LoginNav/> : <LogoutMenu/>
                    }
                </Grid>
            </Grid>
        </div>
    );
}