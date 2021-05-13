import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Me from '../components/Me'
import { sendRequest } from '../components/lib/requests';

const USER_ID = '47568992-e254-4746-b483-140776c5b9f6'

export default class perfil extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
        }
    }

    render() {
        return (
            <Me>
                {(items, isLoaded, fetch) => {

                    if (!isLoaded) {
                        return <p>Loading...</p>
                    }
                    if (items.error) {
                        return <p>{error}</p>
                    }
                    return (
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">Dados Utilizador</Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Row>Nome: {items.data.name} {items.data.surname}</Row>
                                                    <Row>Email: {this.state.user.email}</Row>
                                                    <Row>Nif: {this.state.user.fiscalNumber}</Row>
                                                    <Row>Morada: {this.state.user.adress}</Row>
                                                    <Row>Localidade: {this.state.user.locale}</Row>
                                                </Col>
                                                {/* <Col>
                                                        <Row>Organização: {this.state.user.organization}</Row>
                                                        <Row>Restaurante: {this.state.user.restaurant}</Row>
                                                        <Row>Código-Postal: {this.state.user.zipcode}</Row>
                                                    </Col> */}
                                            </Row>
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

