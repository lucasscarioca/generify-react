import { Link } from 'react-router-dom';
import React, { useEffect, useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;

const PlaylistList = () => {

    const { authenticated } = useContext(Context);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (authenticated) {
            axios.get("http://localhost:8080/playlists")
                .then(
                    (response) => {
                        setPlaylists(response.data);
                    }
                )
        } else {
            navigate("/login");
        }
    }, [authenticated, navigate]);

    const dados = playlists.map
        ((p) => {
            return (
                <Col className="flex-fill mb-3" key={p.id}>
                    <Link to={`/playlists/${p.id}`}>
                        <img className="card-img-top" src={p.cover} alt="" />
                    </Link>
                </Col>

            )
        })

    return (
        <div className="pg-faq container" >
            <div className="row">
                <span style={{ textAlign: 'center', paddingBottom: '20px' }}><b className="main-font">Generi - Lists</b></span>
            </div>
            <Container>
                <Row md={4}>
                    {dados}
                </Row>
            </Container>
        </div>
    );
}

export default PlaylistList