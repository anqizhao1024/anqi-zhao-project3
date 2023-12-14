import * as React from "react";
import {useEffect} from "react";
import Card from '@mui/joy/Card';
import {styled} from '@mui/joy/styles';
import Grid from "@mui/joy/Grid";
import Sheet from '@mui/joy/Sheet';
import {Avatar} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {apiPrefix} from "../constants";

export default function TweetCard(props) {
    const Item = styled(Sheet)(({theme}) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        borderRadius: 4,
    }));

    const loggedInUsername = useSelector((state) => state.userReducer.username)
    const navigate = useNavigate();

    const [displayName, setDisplayName] = React.useState("");


    useEffect(() => {
        axios.post(apiPrefix + 'user/get', {
            username: props.username,
        }).then(resp => {
            setDisplayName(resp.data.displayName)
        }).catch(error => {
        });
    },  []);

    const handleClick = () => {
        navigate("/user/" + props.username)
    }

    const handleDelete = () => {
        axios.post(apiPrefix + 'tweet/delete', {
            id: props.id
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
            });
    }


    const handleEdit = () => {
        navigate("/tweet/" + props.id + "/edit")
    }

    return (
        <div style={{cursor: 'default'}}>
            <div>
                <Card variant="plain">
                    <div onClick={handleClick}>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{xs: 1, sm: 2, md: 3}}
                            sx={{width: '100%'}}
                        >
                            <Grid xs={0.5}>
                                <Avatar alt={props.username} src="/static/images/avatar/1.jpg"/>
                            </Grid>
                            <Grid xs={11.5}>
                                <Item>
                                    <div>
                                        <span style={{fontWeight: "800"}}>{displayName}</span>
                                        <span style={{marginLeft: "5px"}}>@{props.username}</span>
                                        <span style={{marginLeft: "5px"}}>·</span>
                                        <span
                                            style={{marginLeft: "5px"}}>{new Date(props.updatedAt).toLocaleString()}</span>
                                    </div>
                                    <div>{props.content}</div>
                                </Item>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        props.username === loggedInUsername ?
                            <div style={{
                                color: "blue",
                                marginLeft: "10px",
                                cursor: 'default',
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                                <span onClick={handleEdit}> edit</span>
                                <span style={{marginLeft: "10px"}} onClick={handleDelete}> delete</span>
                            </div>
                            : <div/>
                    }
                </Card>
            </div>
        </div>
    )
}
