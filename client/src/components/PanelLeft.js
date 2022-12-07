import { Box, Typography, List, TextField ,ListItemButton, Collapse,ListItem} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { GlobalStoreContext } from '../store'
import * as React from 'react';
import ListCard from './ListCard.js'
import { useContext, useEffect } from 'react'


function PanelLeft () {
    const {store} = useContext(GlobalStoreContext);

    // console.log(playlists);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    // console.log(store.idNamePairs)

    return (
    <div className="panel-left">
        <Box id="playlists">
            <List>
                {store.idNamePairs.map((list)=>{
                    return  <ListCard
                        idNamePair={list}
                        selected={false}
                        />
                    }
                )}
            </List>
        </Box>
    </div>

    )
}

export default PanelLeft;