import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { Box, Typography, List, TextField ,ListItemButton, Collapse,Button} from '@mui/material';
import ExpandLessButton from '@mui/icons-material/ExpandLess';
import ExpandMoreButton from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SongCard from './SongCard';
import AuthContext from '../auth';
import api from '../store/store-request-api'

/*

    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla

*/

function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { idNamePair, selected } = props;
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    // function handleLoadList(event, id) {
    //     console.log("handleLoadList for " + id);
    //     if (!event.target.disabled) {
    //         let _id = event.target.id;
    //         if (_id.indexOf('list-card-text-') >= 0)
    //             _id = ("" + _id).substring("list-card-text-".length);

    //         console.log("load " + event.target.id);

    //         // CHANGE THE CURRENT LIST
    //         store.setCurrentList(id);
    //     }
    // }

    

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    async function handleAddNewSong() {
        store.addNewSong(idNamePair._id);
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }



    // let selectClass = "unselected-list-card";
    // if (selected) {
    //     selectClass = "selected-list-card";
    // }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    const [open, setOpen] = React.useState(false);

    if (store.currentList == null){
        
    }

    const handleClick = () => {
        store.currentList = null;
        store.openList(idNamePair._id);
        setOpen(!open);
      };
    

    const handleThumbsUp = () => {
        console.log("up");
    }
    const handleThumbsDown = () => {
        console.log("down");
    }

    if (store.currentList == null){
    }
    
    let list = [];
    if(store.currentList !== null){
        list = store.currentList.songs;
    }
    
    let listen = store.getListens(idNamePair._id);
    let like = 0;
    let dislike = 0;

    console.log(idNamePair);


    let cardElement =
                <ListItem sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
                style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}>
                    <Typography sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Typography>
                    <Box>
                    <Typography>Listens : {listen}</Typography>
                    <Typography><ThumbUpIcon variant='contained'onClick = {handleThumbsUp}/>{store.getLikes(idNamePair._id)}</Typography>
                    <Typography><ThumbDownIcon onClick = {handleThumbsDown}/>{store.getDislikes(idNamePair._id)}</Typography>
                    <EditIcon onClick = {handleToggleEdit}/>
                    <Button onClick = {(event) => handleDeleteList(event,idNamePair._id)}>Delete</Button>
                    
                    {open ? <ExpandLessButton onClick={handleClick} /> : <ExpandMoreButton onClick={handleClick} />}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {list.map((song, index)=>(<SongCard
                                                id={'playlist-song-' + (index)}
                                                key={'playlist-song-' + (index)}
                                                index={index}
                                                song={song}
                                            />))}
                    </List>
                    <Button onClick={handleAddNewSong}>Add Song</Button>
                    <Button onClick = {handleUndo}>Undo</Button>
                    <Button onClick = {handleRedo}>Redo</Button>
                    <Button onClick = {handleUndo}>Publish</Button>
                    <Button onClick = {handleUndo}>Duplicate</Button>
                    
                </Collapse>
                </Box>
                </ListItem>
            
    
    let contentElement = "";

    // if(open){
    //     let list = [];
    //     if(store.currentList !== null){
    //         list = store.currentList.songs;
    //     }
    //     contentElement =
    //                 <Box >
    //                     <Button onClick={handleAddNewSong}>Add Song</Button>
    //                     <Button onClick = {handleUndo}>Undo</Button>
    //                     <Button onClick = {handleRedo}>Redo</Button>
    //                     <Button onClick = {handleUndo}>Publish</Button>
    //                     <Button onClick = {handleUndo}>Duplicate</Button>
    //                     <List sx={{
    //     bgcolor: 'background.paper',
    //     position: 'relative',
    //     overflow: 'auto',
    //     maxHeight: 700,
    //     '& ul': { padding: 0 },
    //   }} component="div" >
    //                     {list.map((song, index)=>(<SongCard
    //                                             id={'playlist-song-' + (index)}
    //                                             key={'playlist-song-' + (index)}
    //                                             index={index}
    //                                             song={song}
    //                                         />))}
    //                     <Button onClick={handleAddNewSong}>Add Song</Button>
    //                     </List>
    //                 </Box>

    // }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    return (
        cardElement
    );
}

export default ListCard;