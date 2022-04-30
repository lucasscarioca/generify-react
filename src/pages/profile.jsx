import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Context } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Profile() {

    const userValues = { // User values structure
        username: "",
        email: "",
        password: "",
        passwordCheck: "",
        birthDate: ""
    };

    const navigate = useNavigate();
    const { authenticated, currentUser } = useContext(Context);
    const [newUserData, setNewUserData] = useState(userValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });    // Set user values to input
        //console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (!authenticated) navigate("/login");
    }, [authenticated, navigate]);

    return (
        <div className="pg-form container">
            {authenticated && <div className="row align-items-center">
                <div className='col mx-5 d-flex justify-content-center rounded bg-light bg-opacity-50 text-dark shadow-lg'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Seus Dados</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type='text' name='username' defaultValue={currentUser.username} placeholder='Escolha um nome de usuário' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name='email' defaultValue={currentUser.email} placeholder="Digite seu e-mail" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDatePicker">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" name='birthDate' defaultValue={currentUser.birthDate} onChange={handleChange} />
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3 mb-3' variant='primary' type='submit'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='col mx-5 d-flex justify-content-center rounded bg-light bg-opacity-50 text-dark shadow-lg'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Alterar a senha</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Digite uma senha' onChange={handleChange} />
                            <Form.Text className="text-muted">
                                formErrors.password
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPasswordDoubleCheck'>
                            <Form.Label>Confirme a senha</Form.Label>
                            <Form.Control type='password' name='passwordCheck' placeholder='Repita a senha' onChange={handleChange} />
                            <Form.Text className="text-muted">
                                formErrors.passwordCheck
                            </Form.Text>
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3 mb-3' variant='primary' type='submit'>
                                Alterar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>}
        </div>
    )
};