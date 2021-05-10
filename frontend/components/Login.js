import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'

export default function Login(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link onClick={handleShow}>Entrar</Nav.Link>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Entrar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Endereço de email</Form.Label>
                            <Form.Control type="email" placeholder="Insira o email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Palavra-chave</Form.Label>
                            <Form.Control type="password" placeholder="Palavra-chave" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <button onClick={() => props.handleLogin()}>Login</button>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="primary" onClick={handleClose}>Entrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// fetch = async () => {
//     const user = await getUser('http://127.0.0.1:5000/users');
//     this.setState({ ...user });
//   };