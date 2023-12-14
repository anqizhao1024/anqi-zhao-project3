import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import {styled} from "@mui/material/styles";
import Grid from '@mui/joy/Grid';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {apiPrefix} from "../constants";


const CreatePostContainer = styled('div')(({theme}) => ({
    margin: "20px"
}));

const CreatePostButtonContainer = styled('div')(({theme}) => ({
    display: "flex",
    marginTop: "20px",
    justifyContent: "flex-end",
}));

export default function UpdateProfile(props) {
    const [text, setText] = React.useState('');
    const navigate = useNavigate();

    const handleCreate = (event) => {
        event.preventDefault();

        axios.post(apiPrefix + 'user/update', {
            username: props.username,
            desc: text,
        })
            .then(response => {
                navigate("/user/" + props.username)
            })
            .catch(error => {
            });
    };

    return (
        <CreatePostContainer>
            <Textarea
                placeholder="Your profile description ..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxRows={3}
                sx={{minWidth: 300}}
            />
            <Grid container spacing={3} sx={{flexGrow: 1}}>
                <Grid xs>
                </Grid>
                <Grid xs={6}>
                </Grid>
                <Grid xs>
                    <CreatePostButtonContainer>
                        <Button onClick={handleCreate} disabled={text.length === 0}>Update</Button>
                    </CreatePostButtonContainer>
                </Grid>
            </Grid>
        </CreatePostContainer>
    );
}