import { Box, Typography, List, TextField ,ListItemButton, Collapse,ListItem} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import ListCard from './ListCard'


function PanelLeft () {
    const {store} = useContext(GlobalStoreContext);
    let playlists = ["a","a","a"]
    // playlists = store.getPlaylist();

    const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

    return (
        <div className="panel-left"><Box id="playlists">

        <List>
        {
                playlists.map((list)=>{
                    <ListCard
                        idNamePair={{"_id" : list, "name" : list}}
                        select={false}
                        />
                    }
                )

            }

        <List id={"playlist" } style={{maxHeight: 200, overflow: 'auto'}}>
                <ListItemButton >
                    <Typography>a</Typography>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {playlists.map((song)=>(<Typography>b</Typography>))}
                    </List>
                </Collapse>
        </List>
            
        </List>
            {"lists"}
    </Box></div>

    )
}

export default PanelLeft;