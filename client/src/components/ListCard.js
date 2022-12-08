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
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
        if(!open){
            store.currentListId = idNamePair._id
            store.loadComment();
        }
        else if(open && store.currentListId == idNamePair._id){
            store.currentListId = null;
            store.currentComment = null;
        }
        setOpen(store.currentListId == idNamePair._id);
        console.log(store.currentListId)
      };
    

    const handleThumbsUp = () => {
        store.setLikes(idNamePair._id, idNamePair.opinion.likes + 1)
    }
    const handleThumbsDown = () => {
        store.setDislikes(idNamePair._id, idNamePair.opinion.dislikes + 1)
    }

    
    let list = [];
    if(store.currentList !== null){
        list = store.currentList.songs;
    }

    const handleDuplicate = () =>{
        store.duplicate(idNamePair.songs);
    }


    console.log(store.currentListId == idNamePair._id)
    console.log(store.currentListId)
    if(open && store.currentListId !== idNamePair._id){
        setOpen(false)
    }



    
    let cardElement =
                <ListItem sx={{borderRadius:"25px", p: "10px", bgcolor: '#f57c00', marginTop: '15px', display: 'flex', p: 1 }}
                style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}>
                    <Typography sx={{ p: 1, flexGrow: 1 ,fontSize: 34,fontWeight: 'bold',}}>{idNamePair.name+" from "+idNamePair.user.firstName + " " + idNamePair.user.lastName}</Typography>
                    <Box>
                    {/* <Typography>Listens : {idNamePair.opinion.listens}</Typography> */}
                    <Typography><ThumbUpIcon variant='contained'onClick = {handleThumbsUp}/>{idNamePair.opinion.likes}</Typography>
                    <Typography><ThumbDownIcon onClick = {handleThumbsDown}/>{idNamePair.opinion.dislikes}</Typography>
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
                    <Button onClick = {handleUndo}>UndoIcon</Button>
                    <Button onClick = {handleRedo}>RedoIcon</Button>
                    {/* <Button onClick = {handleUndo}>Publish</Button> */}
                    <Button onClick = {handleDuplicate}>ContentCopyIcon</Button>
                    
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