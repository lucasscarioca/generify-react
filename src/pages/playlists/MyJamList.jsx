import { Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import React, { useEffect, useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from "react-bootstrap";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const MyJamList = () => {
    const { authenticated, currentUser } = useContext(Context);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    const userId = currentUser.id;

    const new_playlist = { // Playlist values structure
        id: "",
        name: "",
        cover: "",
        about: "",
        owner: "",
        songs: []
    };

    useEffect(() => {
        if (authenticated) {
            axios.get(`http://localhost:8080/users/${userId}/playlists`)
                .then(
                    (response) => {
                        response.data.push(new_playlist);
                        setPlaylists(response.data);
                    }
                )
        } else {
            navigate("/login");
        }
    }, [authenticated, navigate]);

    const dados = playlists.map((p) => {
        if (p.id != -1) {
            return (
                <Col className="flex-fill mb-3" key={p.id}>
                    <Link to={`/users/${userId}/playlist/?pname=${p.id}`}>
                        <img className="card-img-top" src={`/${p.cover}`} alt="" />
                    </Link>
                </Col>

            )
        } else {
            return (
                <Col className="flex-fill mb-3" key={p.id}>
                    <Link to={`/users/${userId}/new_playlist/`}>
                        <Button style={{
                            margin: "auto",
                            width: "100%",
                            height: "265px",
                            backgroundColor: "#10012b"
                        }}>
                            <BsPlusCircle style={{ fontSize: "100px", color: "#9e4dde" }} />
                        </Button>
                    </Link>
                </Col>
            )
        }
    })

    return (
        <div className="pg-faq container" >
            <div className="row">
                <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - Jam</b></span>
            </div>
            <Container>
                <Row md={4}>
                    {dados}
                </Row>
            </Container>
        </div>
    );
}

export default MyJamList