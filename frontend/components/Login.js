import React, { Component, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import { login } from './lib/requests'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showWrongData: false,
            password: "",
            email: ""
        };
    }
    
    changeShow = () => {
        this.setState({ ...this.state, show: !this.state.show })
        this.setState({ showWrongData: false })
    }
    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    getData = async () => {
        const user = await login(this.state.email, this.state.password);
        
        if (user.data.data) {
            this.changeShow()
            // this.props.handleLogin()
            this.props.refetch();
        } else {
            this.setState({ showWrongData: true })
        }
    };

    render() {
        return (
            <>
                <Nav.Link onClick={this.changeShow}>Entrar</Nav.Link>

                <Modal centered show={this.state.show} onHide={this.changeShow}>
                    <Modal.Header>
                        <Modal.Title>Entrar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Endereço de email</Form.Label>
                                <Form.Control type="email" placeholder="Insira o email" name="email" onChange={this.saveToState} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Palavra-chave</Form.Label>
                                <Form.Control type="password" placeholder="Palavra-chave" name="password" onChange={this.saveToState} />
                            </Form.Group>
                            {this.state.showWrongData ? <p>Dados de utilizador incorretos.</p> : <></>}
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeShow}>Fechar</Button>
                        <Button variant="primary" onClick={() => { this.getData() }}>Entrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

