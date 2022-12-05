import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Player from './Player.js';
import Comment from './Comment.js'



function PanelRight () {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
      };


    let content = <Player/>

    if (value === "two"){
        content = <Comment/>
    }

    return (
        <div id="panel-right" className={"panel-right"}>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab
                    value="one"
                    label="Player"
                    wrapped
                    />
                    <Tab 
                    value="two" 
                    label="Comment" 
                    />
                </Tabs>
            </Box>
            {content}
      </div>

    )
}

export default PanelRight;