import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Avatar} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../reducer/userReducer";


export default function LoginNav() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const username = useSelector((state) => state.userReducer.username)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGoToProfile = () => {
        navigate("/user/" + username)
    };

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <div style={{display: "flex", textAlign: "center", justifyContent:"center", alignItems:"center"}}>
            <div style={{marginRight: "10px", justifyContent:"center", alignItems:"center"}}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{textTransform: 'none', color: "white"}}
                >
                    {username}
                </Button>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

            </div>
            <div style={{textAlign: "center", marginTop: "5px", marginBottom: "5px"}} onClick={handleGoToProfile}>
                <Avatar alt={username} src="/static/images/avatar/1.jpg"/>
            </div>
        </div>
    );
}