import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updatePassword } from '../../lib/users/userRequests'
import Cookies from 'js-cookie'

export default class OrganizationsCreateForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isButtonDisabled: false
        }
    }

    componentDidMount() {
        // const actualPassword = await getPassword()
        this.setState({
            id: this.props.id,
            // actualPassword: actualPassword
        })

    }

    changePassword = async () => {
        if (this.state.newPassword == this.state.newPassword2) {
            return await updatePassword(this.state.id, Cookies.get('token'), this.state.newPassword)
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    };

    render() {
        return (
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="type" style={{ width: '14rem' }}>Tipo</InputGroup.Text>
                                <Form.Control name="type" onChange={this.saveToState} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="name" style={{ width: '14rem' }}>Nome</InputGroup.Text>
                                <Form.Control name="name" onChange={this.saveToState} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="adress" style={{ width: '14rem' }}>Morada</InputGroup.Text>
                                <Form.Control name="adress" onChange={this.saveToState} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="locale" style={{ width: '14rem' }}>Localidade</InputGroup.Text>
                                <Form.Control name="locale" onChange={this.saveToState} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="zipcode" style={{ width: '14rem' }}>Código-Postal</InputGroup.Text>
                                <Form.Control name="zipcode" onChange={this.saveToState} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="telephone" style={{ width: '14rem' }}>Telefone</InputGroup.Text>
                                <Form.Control name="telephone" onChange={this.saveToState} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="mobilePhone" style={{ width: '14rem' }}>Telemóvel</InputGroup.Text>
                                <Form.Control name="mobilePhone" onChange={this.saveToState} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="fiscalNumber" style={{ width: '14rem' }}>NIF</InputGroup.Text>
                                <Form.Control name="fiscalNumber" onChange={this.saveToState} />
                            </InputGroup>
                            <Button variant="outline-success" onClick={this.changePassword} disabled={this.state.isButtonDisabled}>Alterar Palavra-Passe</Button>
                        </Col>
                        <Col>

                        </Col>



                    </Row>

                </Container>

            </Card.Body>
        )
    }
}
