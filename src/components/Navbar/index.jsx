import React, { useEffect, useState, useContext } from "react";
import { Nav, NavLink, LogoLink } from "./NavbarElements";
import logo from '../../images/notas-musicais.png'
import Toast from 'react-bootstrap/Toast'
import { Context } from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';

const Navbar = () => {

    const [showAlert, setShowAlert] = useState(false);
    const { authenticated, alertMsg, handleLogout, currentUser } = useContext(Context); // Authentication validations

    useEffect(() => {
        if (authenticated) {
            setShowAlert(true);
        }
    }, [authenticated, setShowAlert]);

    return (
        <Nav className="navbar navbar-expand-sm navbar-dark fixed-top">
            {authenticated ?
                <div className="container-fluid">
                    <img src={logo} alt="Generify Music Logo" style={{ width: '50px', height: 'auto', paddingRight: '10px' }} />
                    <LogoLink className="navbar-brand" to="/playlists" ><b className="main-font">Generify</b></LogoLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Toast className="loginAlert" onClose={() => setShowAlert(false)} variant="success" show={showAlert} delay={2000} autohide>
                        <Toast.Body>{alertMsg}</Toast.Body>
                    </Toast>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar" >
                        <ul className="navbar-nav ms-auto"  >
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/playlists" >
                                    Playlists
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={currentUser ? `/users/${currentUser._id}/playlists` : `/playlists`} >
                                    MyJam
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile" >
                                    Perfil
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <Button variant="clear" className="text-white" onClick={handleLogout}>Logout</Button>
                            </li>
                        </ul>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <img src={logo} alt="Generify Music Logo" style={{ width: '50px', height: 'auto', paddingRight: '10px' }} />
                    <LogoLink className="navbar-brand" to="/" ><b className="main-font">Generify</b></LogoLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Toast className="loginAlert" onClose={() => setShowAlert(false)} variant="success" show={showAlert} delay={2000} autohide>
                        <Toast.Body>{alertMsg}</Toast.Body>
                    </Toast>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar" >
                        <ul className="navbar-nav ms-auto"  >
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" >
                                    Início
                                </NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/form" >
                                    Cadastro
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login" >
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/faq" >
                                    FAQ
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>}
        </Nav>
    );
};

export default Navbar;