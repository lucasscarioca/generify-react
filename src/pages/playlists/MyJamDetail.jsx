import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams, useSearchParams } from 'react-router-dom';
import Player from "../../components/Player/Player";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const MyJamDetail = () => {
  const { id } = useParams();

  const playlistFormat = { // Playlist values structure
    _id: "",
    name: "",
    cover: "",
    about: "",
    owner: "",
    songs: []
  };
  const songsFormat = {
    _id: "",
    artist: "",
    name: "",
    file: ""
  }

  const [playlist, setPlaylist] = useState(playlistFormat);
  const [playlistSongs, setPlaylistSongs] = useState(songsFormat);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  const { authenticated, currentUser, updateUser } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let pId = searchParams.get('pname');

  useEffect(() => {
    if (authenticated) {
      axios.get(`http://localhost:8080/playlists/${pId}`)
        .then(
          (response) => {
            setPlaylist(response.data);
            axios.get(`http://localhost:8080/playlists/${pId}/songs`)
              .then(
                (response) => {
                  setPlaylistSongs(response.data);
                }
              )
          }
        )
    } else {
      navigate("/login");
    }
  }, [id, authenticated, navigate]);

  function removeSong(index) {
    let updatedSongs = [...playlistSongs];
    let currentPlaylist = { ...playlist };
    let removedSong = updatedSongs.splice(index, 1);
    currentPlaylist.songs = playlist.songs.filter(id => id !== removedSong[0]._id);

    if (currentPlaylist.songs == 0) {
      setPlaylist(playlistFormat);
      axios.delete(`http://localhost:8080/playlists/${pId}`);
      let userPlaylists = {
        userPlaylists: currentUser.userPlaylists.filter(id => id !== pId)
      }
      axios.put(`http://localhost:8080/users/${currentUser._id}`, userPlaylists);
      updateUser();
      navigate(`/users/${currentUser._id}/playlists/`);
    } else {
      setPlaylist(currentPlaylist);
      axios.put(`http://localhost:8080/playlists/${pId}`, currentPlaylist);
    }
  }

  const renderSongs = playlistSongs.map((p) => {
    return (
      <tr key={p._id}>
        <td>
          <Row>
            <Col md={1}>
              <Button variant="danger" onClick={() => { removeSong(playlistSongs.indexOf(p)) }}>-</Button>
            </Col>
            <Col md={11}>
              <Button variant="clear" className="w-100" onClick={() => { setCurrentSongIndex(playlistSongs.indexOf(p)) }}>
                {p.artist} - {p.name}
              </Button>
            </Col>
          </Row>
        </td>
      </tr>
    )
  });


  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > playlist.songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, playlist]);

  return (
    <div className="pg-faq container" >
      <div className="row" >

        <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - {playlist.name}</b></span>
        <p className="text-center text-muted">{playlist.about}</p>
        <p className="text-center font-weight-bold">Tocando: {playlistSongs[currentSongIndex].artist} - {playlistSongs[currentSongIndex].name}</p>
        <Player songs={playlistSongs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} nextSongIndex={nextSongIndex} />

        <Container>
          <Row md={2} className="justify-content-md-center">
            <Col className="justify-content-md-center">
              <img className="w-75" src={`/${playlist.cover} `} alt="" />
            </Col>
            <Col>
              <Table borderless hover size="lg" style={{ borderRadius: "10px", backgroundColor: "#b27cde", color: "#491d6c", fontWeight: "bold" }}>
                <tbody>
                  {renderSongs}
                  <tr>
                    <td>
                      <Row>
                        <Col md={1}>
                          <Button onClick={() => { navigate(`/users/${currentUser._id}/edit_playlist/?playlist_id=${pId}`) }}>+</Button>
                        </Col>
                        <Col md={11}>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div >
  );
};

export default MyJamDetail;