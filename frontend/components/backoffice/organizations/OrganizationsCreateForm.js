import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getOrganizationTypes, createOrganization } from '../../../lib/organizationsRequests'

export default class OrganizationsCreateForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: undefined,
            name: undefined,
            adress: undefined,
            locale: undefined,
            zipcode: undefined,
            telephone: undefined,
            mobilePhone: undefined,
            fiscalNumber: undefined,
            isButtonDisabled: false,
            types: []
        }

    }

    componentDidMount() {
        this.getTypes()
    }

    getTypes = async () => {
        const organizationTypes = (await getOrganizationTypes()).data.data
        this.setState({
            types: organizationTypes,
            type: organizationTypes[0].id ? organizationTypes[0].id : undefined,
        })
    }

    createOrganization = async () => {
        const { type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = this.state
        const res = await createOrganization(type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber)
        if(res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
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
                                <InputGroup.Text id="name" >Nome</InputGroup.Text>
                                <Form.Control name="name" onChange={this.saveToState} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="adress" >Morada</InputGroup.Text>
                                <Form.Control name="adress" onChange={this.saveToState} />
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
                                                
                                                this.state.types.map((type) => {
                                                    return (<option key={type.id} value={type.id}>{type.name}</option>)
                                                })
                                            }
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                                <Col>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="fiscalNumber" >NIF</InputGroup.Text>
                                        <Form.Control name="fiscalNumber" onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="locale" >Localidade</InputGroup.Text>
                                        <Form.Control name="locale" onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="zipcode">Código-Postal</InputGroup.Text>
                                        <Form.Control name="zipcode" onChange={this.saveToState} />
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
                                        <Form.Control name="telephone" onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="mobilePhone" >Telemóvel</InputGroup.Text>
                                        <Form.Control name="mobilePhone" onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Button variant="outline-success" onClick={this.createOrganization} disabled={this.state.isButtonDisabled}>Adicionar Organização</Button>
                        </Col>
                    </Row>
                </Container >
            </Card.Body >
        )
    }
}
