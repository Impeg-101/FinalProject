import { Box, Typography, List, TextField } from '@mui/material';
import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';


function Player() {

    const {store} = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let sample = ["vaswfqdwf","hsdf","whrt","meyt"]

    const handleKeyDown = (event) =>{
        if (event.code === "Enter") {
            console.log(event.target.value);
            let input = {comment:event.target.value, commenter: auth.user.firstName + " " +auth.user.lastName}
            store.addComment(input)
            store.loadComment();
            event.target.value = ""
        }
    }


    useEffect(() => {
        if(store.currentListId !== null){
            store.loadComment();
        }
    }, []);

    let comments = [];
    if(store.currentComment !== null){
        comments = store.currentComment;
    }else{
        comments = [];
    }

    return (
            <Box id="comment">
                <TextField onKeyDown={handleKeyDown} fullWidth id="comment-basic" label="Comment" variant="filled" />
                <List >
                    {
                        comments.map((comment) => (
                            <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography>{comment.comment}</Typography>
                                <Typography>{comment.commenter}</Typography>
                            </Box>
                        ))
                    }
                </List>
                
                    
            </Box>
        );
}

export default Player;