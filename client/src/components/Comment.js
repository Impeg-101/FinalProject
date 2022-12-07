import { Box, Typography, List, TextField } from '@mui/material';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'


function Player() {

    const {store} = useContext(GlobalStoreContext);

    let sample = ["vaswfqdwf","hsdf","whrt","meyt"]

    const handleKeyDown = (event) =>{
        console.log("comment");
    }

    return (
            <Box id="comment">

                <List>
                    {
                        sample.map((comment) => (
                            <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                <Typography>author</Typography>
                                <Typography>comment</Typography>
                            </Box>
                        ))
                    }
                </List>
                
                <TextField fullWidth id="comment-basic" label="Comment" variant="filled" />
                    
            </Box>
        );
}

export default Player;