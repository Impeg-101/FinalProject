import { Box, Typography, List, TextField ,ListItemButton, Collapse,ListItem} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import ListCard from './ListCard.js'


function PanelLeft () {
    const {store} = useContext(GlobalStoreContext);

    let condition = 'none';

    if(condition === "none"){
        store.loadIdNamePairs();
    }

    let playlists = store.idNamePairs;
    // console.log(playlists);

    return (
    <div className="panel-left">
        <Box id="playlists">

            <List>
            
                    {store.idNamePairs.map((list)=>{
                        return  <ListCard
                            idNamePair={{"_id" : list._id, "name" : list.name}}
                            selected={false}
                            />
                        }
                    )}
                
            </List>
            {"lists"}
        </Box>
    </div>

    )
}

export default PanelLeft;