import React, {useEffect} from 'react';
import Header from '../component/Header';
import UpsertPost from "../component/UpsertPost";
import TweetsList from "../component/TweetsList";
import axios from "axios";
import {getCookie} from "../cookies";
import {apiPrefix} from "../constants";

export default function Homepage() {
    const [tweets, setTweets] = React.useState([]);

    useEffect(() => {
        let usernameFromCookie = getCookie("username")
        if (usernameFromCookie === "") {
            axios.post(apiPrefix + 'tweet/getAll', {}).then(resp => {
                setTweets(resp.data)
            })
        } else {
            axios.post(apiPrefix + 'feeds/get', {
                username: usernameFromCookie,
            }).then(resp => {
                setTweets(resp.data)
            })
                .catch(error => {
                });
        }
    }, []);

    return (
        <div>
            <Header/>
            <UpsertPost isCreating={true}/>
            <TweetsList tweets={tweets}/>
        </div>
    );
}
