import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'


function Player() {

    const {store} = useContext(GlobalStoreContext);

    const play = () => {player.playVideo()}
    const pause = () => {player.pauseVideo()}
    const forward = () => {player.nextVideo()}
    const backward = () => {player.previousVideo()}
    /*
    We recommend that you set this parameter to false while
     the user drags the mouse along a video progress bar and
      then set it to true when the user releases the mouse. 
      This approach lets a user scroll to different points of 
      a video without requesting new video streams by scrolling 
      past unbuffered points in the video. When the user releases 
      the mouse button, the player advances to the desired point 
      in the video and requests a new video stream if necessary.
      */
    let playing = "stop"
    let index = 0
    
    let currentSong = "dQw4w9WgXcQ";

    if(store.currentList == null){
        currentSong = "";
    }

    let link = "http://www.youtube.com/embed/"+currentSong+"?enablejsapi=1&origin=http://example.com"


    let player;
    let PLAYER_NAME = 'youtube_player';
    


    return (
        <div id="youtube_player"> 
            <script src="./Player.js"></script>
            <iframe id="player" type="text/html" width="640" height="390"
  src={link}
  frameBorder="0"></iframe>
            <Box>
                <Typography>
                    Playlist: <Typography display="inline">sda</Typography>
                </Typography>
                <Typography>
                    Song #: <Typography display="inline">sdas</Typography>
                </Typography>
                <Typography>
                    Title: <Typography display="inline">dasda</Typography>
                </Typography>
                <Typography>
                    Artist: <Typography display="inline">sadsad</Typography>
                </Typography>
                <Box
                    alignContent={"center"}
                    alignItems="center">
                    <Button onClick={backward}>Backward</Button>
                    <Button onClick={pause}>Pause</Button>
                    <Button onClick={play}>Play</Button>
                    <Button onClick={forward}>Forward</Button>
                </Box>
            </Box>
        </div>
        );
}

export default Player;