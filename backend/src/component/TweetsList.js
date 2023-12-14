import React from 'react';
import TweetCard from "./TweetCard";
import {sortTweetsByDate} from "../utils/sort";

export default function TweetsList(props) {
    let tweetList = sortTweetsByDate(props.tweets)

    return (
        <div>
            {tweetList.map((tweet, index) => (
                <div style={{margin: '20px'}}>
                    <TweetCard
                        id={tweet._id}
                        displayName={tweet.displayName}
                        username={tweet.username}
                        content={tweet.text}
                        updatedAt={tweet.updatedAt}/>
                </div>
            ))}
        </div>
    );
}