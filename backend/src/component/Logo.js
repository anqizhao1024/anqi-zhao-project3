import * as React from "react";
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

export default function Logo() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    };

    return (
        <div onClick={handleClick}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{display: {xs: 'none', sm: 'block'}}}
            >
                Twitter
            </Typography>
        </div>
    )

}
