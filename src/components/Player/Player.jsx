import React, { useRef, useState, useEffect } from "react";
import PlayerControls from "./PlayerControls";

const Player = (props) => {

    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        console.log(props.songs[props.currentSongIndex])
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }
                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }
                return temp;
            });
        }
    };

    return (
        <div className="player">
            <audio src={props.songs[props.currentSongIndex].file} ref={audioEl}></audio>
            <PlayerControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
        </div>
    );
};

export default Player;