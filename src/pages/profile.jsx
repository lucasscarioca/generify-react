import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { Context } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Profile() {

    const { authenticated, currentUser, updateUserData, updatePassword, checkUpdateErrors, updateErrors, deleteUser, updateUser } = useContext(Context);
    const navigate = useNavigate();
    updateUser();
    useEffect(() => {
        if (authenticated) {
            updateUser()
        } else {
            navigate("/login");
        }
    }, [authenticated, navigate]);

    const userValues = { // User values structure
        username: currentUser.username,
        email: currentUser.email,
        birthDate: currentUser.birthDate
    };

    const passwordValues = { // Password values structure
        password: "",
        passwordCheck: ""
    };

    const [newUserData, setNewUserData] = useState(userValues);
    const [newUserPassword, setNewUserPassword] = useState(passwordValues);
    const [updateToast, setUpdateToast] = useState(false);
    const [updateMsg, setUpdateMsg] = useState("Informações atualizadas com sucesso!");
    const [isSubmitUser, setIsSubmitUser] = useState(false);    // Handle if userDate form was submitted for useEffect
    const [isSubmitPassword, setIsSubmitPassword] = useState(false);    // Handle if password form was submitted for useEffect

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });    // Set user values to input
        //console.log(formValues);
    };

    const handleUserPasswordChange = (e) => {
        const { name, value } = e.target;
        setNewUserPassword({ ...newUserPassword, [name]: value });    // Set user values to input
        //console.log(formValues);
    };

    const handleUserDataSubmit = (e) => {
        e.preventDefault();
        checkUpdateErrors(newUserData);
        setUpdateMsg('Usuário atualizado com sucesso!');
        setIsSubmitUser(true);
        setIsSubmitPassword(false);
    };

    const handleUserPasswordSubmit = (e) => {
        e.preventDefault();
        checkUpdateErrors(newUserPassword);
        setUpdateMsg('Senha atualizada com sucesso!');
        setIsSubmitPassword(true);
        setIsSubmitUser(false);
    };

    const handleDeleteUser = (e) => {
        e.preventDefault();
        deleteUser();
    }

    useEffect(() => {   // Update user
        if (Object.keys(updateErrors).length === 0) {
            if (isSubmitPassword) {
                updatePassword(newUserPassword);
                setUpdateToast(true);
                setIsSubmitPassword(false);
            } else if (isSubmitUser) {
                updateUserData(newUserData);
                setUpdateToast(true);
                setIsSubmitUser(false);
            }
        }
    }, [updateErrors, updatePassword, updateUserData, newUserData, newUserPassword, isSubmitUser, isSubmitPassword, setIsSubmitPassword, setIsSubmitUser, setUpdateToast]);



    return (
        <div className="pg-form container">
            {authenticated && <div className="row align-items-center">
                <div className='col mx-5 d-flex justify-content-center rounded bg-light bg-opacity-50 text-dark shadow-lg'>
                    <Form onSubmit={handleUserDataSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Seus Dados</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type='text' name='username' placeholder={currentUser.username} defaultValue={currentUser.username} onChange={handleUserDataChange} />
                            {updateErrors.username ? <Form.Text className="text-muted">
                                {updateErrors.username}
                            </Form.Text> : <></>}
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" name='email' placeholder={currentUser.email} defaultValue={currentUser.email} onChange={handleUserDataChange} />
                            {updateErrors.email ? <Form.Text className="text-muted">
                                {updateErrors.email}
                            </Form.Text> : <></>}
                        </Form.Group>

                        <Form.Group controlId="formBasicDatePicker">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="date" name='birthDate' placeholder={currentUser.birthDate} defaultValue={currentUser.birthDate} onChange={handleUserDataChange} />
                            {updateErrors.birthDate ? <Form.Text className="text-muted">
                                {updateErrors.birthDate}
                            </Form.Text> : <></>}
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3 mb-3' variant='primary' type='submit'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='col mx-5 d-flex justify-content-center rounded bg-light bg-opacity-50 text-dark shadow-lg'>
                    <Form onSubmit={handleUserPasswordSubmit}>
                        <Form.Group className="mt-3" controlId="formTitle">
                            <Form.Label><h1>Alterar a senha</h1></Form.Label>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Digite uma senha' onChange={handleUserPasswordChange} />
                            {updateErrors.password ? <Form.Text className="text-muted">
                                {updateErrors.password}
                            </Form.Text> : <></>}
                        </Form.Group>

                        <Form.Group controlId='formBasicPasswordDoubleCheck'>
                            <Form.Label>Confirme a senha</Form.Label>
                            <Form.Control type='password' name='passwordCheck' placeholder='Repita a senha' onChange={handleUserPasswordChange} />
                            {updateErrors.passwordCheck ? <Form.Text className="text-muted">
                                {updateErrors.passwordCheck}
                            </Form.Text> : <></>}
                        </Form.Group>

                        <div className='d-flex justify-content-center'>
                            <Button className='mt-3 mb-3' variant='primary' type='submit'>
                                Alterar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>}
            <div className='d-flex justify-content-center mt-5'>
                <Button className='mt-3 mb-3' variant='danger' onClick={handleDeleteUser}>
                    Excluir Conta
                </Button>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Toast className="loginAlert" onClose={() => setUpdateToast(false)} variant="success" show={updateToast} delay={2000} autohide>
                    <Toast.Body>{updateMsg}</Toast.Body>
                </Toast>
            </div>
        </div>
    )
};