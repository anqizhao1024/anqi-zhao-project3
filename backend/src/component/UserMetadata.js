import * as React from "react";
import {styled} from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const UserMetadata = React.memo(function UserMetadata(props) {
    const navigate = useNavigate();
    const loggedInUsername = useSelector((state) => state.userReducer.username)

    const RootContainer = styled(Sheet)(({theme}) => ({
        padding: theme.spacing(1),
        textAlign: 'left',
        borderRadius: 4,
        margin: "20px"
    }));


    const handleEditDesc = () => {
        navigate("/user/" + props.Username + "/edit")
    }

    return (
        <div>
            <RootContainer style={{textAlign: "left"}}>
                <div style={{fontSize: "50px"}}>{props.DisplayName}</div>
                <div style={{fontSize: "20px"}}>@{props.Username}</div>
                <div style={{fontSize: "15px", display: "flex", textAlign: "center"}}>
                    {
                        props.Desc ? <div style={{marginRight: "15px"}}> {props.Desc}</div> :
                            <div style={{marginRight: "15px"}}> no description</div>
                    }
                    {
                        props.Username === loggedInUsername ?
                            <div style={{fontSize: "15px", color: "blue", cursor: 'default'}} onClick={handleEditDesc}> edit</div>
                            : <div/>
                    }
                </div>
                <div style={{fontSize: "20px"}}>Joined {props.JoinedAt}</div>
            </RootContainer>
        </div>
    )
});

export default UserMetadata
