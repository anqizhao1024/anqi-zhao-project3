import React, {useEffect} from 'react';
import UserMetadata from "../component/UserMetadata";
import TweetsList from "../component/TweetsList";
import Header from "../component/Header";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import {apiPrefix} from "../constants";

function UserPage() {
    const location = useLocation()
    const [profile, setProfile] = React.useState({});
    const [tweets, setTweets] = React.useState([]);

    useEffect(() => {
        axios.post(apiPrefix + 'user/get', {
            username: location.pathname.substring(6),
        })
            .then(userResp => {
                axios.post(apiPrefix + 'tweet/getForUser', {
                    username: location.pathname.substring(6),
                })
                    .then(tweetsResp => {
                        setProfile({
                            username: userResp.data.username,
                            displayName: userResp.data.displayName,
                            description: userResp.data.desc,
                            joinedAt: userResp.data.joinedAt,
                        })

                        setTweets(tweetsResp.data)
                    })
                    .catch(error => {
                    });
            })
            .catch(error => {
            });
    }, []);

    return (
        <div>
            <Header/>
            <UserMetadata
                JoinedAt={new Date(profile.joinedAt).toDateString()}
                DisplayName={profile.displayName}
                Username={profile.username}
                Desc={profile.description}/>
            <TweetsList tweets={tweets}/>
        </div>

    );
}

export default UserPage;
