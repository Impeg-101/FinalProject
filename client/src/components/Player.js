import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'


function Player() {

    const {store} = useContext(GlobalStoreContext);

    const play = () => {}
    const pause = () => {}
    const forward = () => {}
    const backward = () => {}
    const stop = () => {}

    let currentMode = "stop"

    const handlePlayButton = () => {}
    const handleForwardButton = () => {}
    const handleBackwardButton = () => {}
    const handlePauseButton = () => {}

    var player;
    // function onYouTubeIframeAPIReady() {
    //     player = new YT.Player('player', {
    //         height: '390',
    //         width: '640',
    //         videoId: 'M7lc1UVf-VE',
    //         playerVars: {
    //             'playsinline': 1
    //     },
    //     events: null
    //     });
    // }

    return (
        <div>
            <iframe id="player" type="text/html" width="640" height="390"
            src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
            frameborder="0"></iframe>
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
                    <Button>csa</Button>
                    <Button>csac</Button>
                    <Button>csac</Button>
                    <Button>scas</Button>
                </Box>
                
            </Box>
        </div>
        );
}

export default Player;