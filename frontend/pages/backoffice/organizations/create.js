import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { getOrganizationTypes, createOrganization } from '../../../lib/organizationsRequests'

export default class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: "",
            name: "",
            address: "",
            locale: "",
            zipcode: "",
            telephone: "",
            mobilePhone: "",
            fiscalNumber: "",
            isButtonDisabled: true,
            types: []
        }
    }

    componentDidMount() {
        this.getTypes()
    }

    getTypes = async () => {
        const organizationTypes = (await getOrganizationTypes()).data.data
        if (organizationTypes.length > 0) {
            this.setState({
                types: organizationTypes,
                type: organizationTypes[0].id,
            })
        }
    }

    createOrganization = async () => {
        const { type, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = this.state
        const res = await createOrganization(type, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber)

        if (res.data.error) {

            alert(res.data.error)
            console.log(res.data.err)
        } else {
            this.setState({
                type: "",
                name: "",
                address: "",
                locale: "",
                zipcode: "",
                telephone: "",
                mobilePhone: "",
                fiscalNumber: ""
            })
            alert(res.data.success)
        }
    };

    saveToState = async (e) => {
        const { name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, } = this.state
        await this.setState({ [e.target.name]: e.target.value });
        if (name != "" && address != "" && locale != "" && zipcode != "" && telephone != "" && mobilePhone != "" && fiscalNumber != "") {
            this.setState({ isButtonDisabled: false })
        }
    };

    render() {
        const { name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, isButtonDisabled, types } = this.state
        return (
            <Card.Body>
                <Container>

                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="name" >Nome</InputGroup.Text>
                                <Form.Control name="name" value={name} onChange={this.saveToState} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="address" >Morada</InputGroup.Text>
                                <Form.Control name="address" value={address} onChange={this.saveToState} />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="type" >Tipo</InputGroup.Text>
                                        <Form.Control as="select" name="type" onChange={this.saveToState} >
                                            {

                                                types.map((type) => {
                                                    return (<option key={type.id} value={type.id}>{type.name}</option>)
                                                })
                                            }
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                                <Col>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="fiscalNumber" >NIF</InputGroup.Text>
                                        <Form.Control name="fiscalNumber" value={fiscalNumber} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="locale" >Localidade</InputGroup.Text>
                                        <Form.Control name="locale" value={locale} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="zipcode">Código-Postal</InputGroup.Text>
                                        <Form.Control name="zipcode" value={zipcode} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="telephone" >Telefone</InputGroup.Text>
                                        <Form.Control name="telephone" value={telephone} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="mobilePhone" >Telemóvel</InputGroup.Text>
                                        <Form.Control name="mobilePhone" value={mobilePhone} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Button variant="outline-success" onClick={this.createOrganization} disabled={isButtonDisabled}>Adicionar Organização</Button>
                        </Col>
                    </Row>
                </Container >
            </Card.Body >
        )
    }
}
