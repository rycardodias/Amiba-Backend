import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Me from '../components/Me'
import { updateAddress } from '../components/lib/users/userRequests'
import Cookies from 'js-cookie';

export default class perfil extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            address: "",
            locale: "",
            zipcode: "",
            isButtonDisabled: true
        }
    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.value!="") {
            this.setState({isButtonDisabled: false})
        } else {
            this.setState({isButtonDisabled: true})
        }
    };

    updateUser = async () => {
        return await updateAddress('47568992-e254-4746-b483-140776c5b9f6', Cookies.get('token'),
            this.state.address, this.state.locale, this.state.zipcode)
    };



    render() {
        return (
            <Me>
                {(items, isLoaded, fetch) => {

                    if (!isLoaded) {
                        return <p>Loading...</p>
                    }
                    if (items.error) {
                        return <p>{items.error}</p>
                    }
                    return (

                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">Dados Utilizador</Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Container>
                                            <Row border="success">
                                                <Col ></Col>
                                                <Col>
                                                    {/* <Row>Nome: {items.data.name} {items.data.surname}</Row>
                                                    <Row>Email: {items.data.email}</Row>
                                                    <Row>Nif: {items.data.fiscalNumber}</Row> */}
                                                    <Row>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id=""  style={{ width: '8rem' }}>Morada</InputGroup.Text>
                                                            <Form.Control name="address" onChange={this.saveToState} defaultValue={items.data.address} />
                                                        </InputGroup>
                                                    </Row>
                                                    <Row>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="">Localidade</InputGroup.Text>
                                                            <Form.Control name="locale" onChange={this.saveToState} defaultValue={items.data.locale} />
                                                        </InputGroup>
                                                    </Row>
                                                {/* </Col>
                                                <Col> */}
                                                    {/* <Row>Organização: {items.data.organization}</Row>
                                                    <Row>Restaurante: {items.data.restaurant}</Row> */}
                                                    <Row>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="">Código-Postal</InputGroup.Text>
                                                            <Form.Control name="zipcode" onChange={this.saveToState} defaultValue={items.data.zipcode} />
                                                        </InputGroup>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Button variant="outline-success" onClick={this.updateUser} disabled={this.state.isButtonDisabled}>Alterar Morada</Button>
                                        </Container>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">Dados Organização</Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>


                    )
                }}
            </Me>

        )
    }
}

