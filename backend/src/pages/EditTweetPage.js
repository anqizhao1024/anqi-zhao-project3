import React from 'react';
import Header from "../component/Header";
import UpsertPost from "../component/UpsertPost";


export default function EditTweetPage() {
    return (
        <>
            <Header/>
            <div style={{marginTop: "20px"}}>
                <UpsertPost isCreating={false}/>
            </div>
        </>
    );
}