import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import {styled} from "@mui/material/styles";
import Grid from '@mui/joy/Grid';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {apiPrefix} from "../constants";


const CreatePostContainer = styled('div')(({theme}) => ({
    margin: "20px"
}));

const CreatePostButtonContainer = styled('div')(({theme}) => ({
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
}));

export default function UpsertPost(props) {
    const username = useSelector((state) => state.userReducer.username)
    const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)

    const [text, setText] = React.useState('');
    const navigate = useNavigate();
    const location = useLocation()

    const buttonLabel = props.isCreating ? "Post" : "Update"

    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

    const handleCreate = (event) => {
        event.preventDefault();

        if (props.isCreating) {
            axios.post(apiPrefix + 'tweet/create', {
                username: username,
                text: text,
            })
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                });
        } else {
            axios.post(apiPrefix + 'tweet/update', {
                id: location.pathname.split("/")[2],
                text: text,
            })
                .then(response => {
                    navigate("/")
                })
                .catch(error => {
                });
        }
    };

    return (
        <CreatePostContainer>
            <Textarea
                placeholder="Type in here…"
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxRows={3}
                endDecorator={
                    <Grid container spacing={3} sx={{flexGrow: 1}}>
                        <Grid xs>
                            <Box sx={{display: 'flex', gap: 0.5}}>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                                    👍
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                                    🏖
                                </IconButton>
                                <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                                    😍
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid xs={6}>
                        </Grid>
                        <Grid xs>
                            <Typography level="body-xs" sx={{ml: 'auto', textAlign: 'center'}}>
                                {text.length} character(s)
                            </Typography>
                        </Grid>
                    </Grid>
                }
                sx={{minWidth: 300}}
            />
            <Grid container spacing={3} sx={{flexGrow: 1}}>
                <Grid xs>
                </Grid>
                <Grid xs={6}>
                </Grid>
                <Grid xs>
                    <CreatePostButtonContainer>
                        <Button onClick={handleCreate} disabled={!isLoggedIn || text.length === 0}>{buttonLabel}</Button>
                    </CreatePostButtonContainer>
                </Grid>
            </Grid>
        </CreatePostContainer>
    );
}