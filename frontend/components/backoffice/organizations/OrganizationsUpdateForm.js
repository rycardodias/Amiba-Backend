import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getOrganizations, getOrganizationTypes, updateOrganization, deleteOrganization } from '../../../lib/organizationsRequests'

export default class OrganizationsUpdateForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            OrganizationTypeId: "",
            name: "",
            address: "",
            locale: "",
            zipcode: "",
            telephone: "",
            mobilePhone: "",
            fiscalNumber: "",
            isButtonDisabled: true,
            types: [],
            organizations: []
        }

    }

    componentDidMount() {
        this.getTypes()
        this.getOrganizations()
    }

    getOrganizations = async () => {
        const organizations = (await getOrganizations()).data.data

        if (organizations.length > 0) {
            this.setState({
                id: organizations[0].id,
                type: organizations[0].OrganizationTypeId,
                name: organizations[0].name,
                address: organizations[0].address,
                locale: organizations[0].locale,
                zipcode: organizations[0].zipcode,
                telephone: organizations[0].telephone,
                mobilePhone: organizations[0].mobilePhone,
                fiscalNumber: organizations[0].fiscalNumber,
                organizations: organizations,
                isButtonDisabled: false
            })
        } else {
            this.setState({
                id: "",
                OrganizationTypeId: "",
                name: "",
                address: "",
                locale: "",
                zipcode: "",
                telephone: "",
                mobilePhone: "",
                fiscalNumber: "",
                organizations: organizations,
                isButtonDisabled: true,
            })
        }
    }

    getTypes = async () => {
        const organizationTypes = (await getOrganizationTypes()).data.data
        if (organizationTypes.length > 0) {
            this.setState({
                types: organizationTypes,
            })
        }
    }

    updateOrganizations = async () => {
        const { id, OrganizationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = this.state
        const res = await updateOrganization(id, OrganizationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber)
        console.log(res.data)
        if (res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
        }
    };

    deleteOrganizations = async () => {
        const { id } = this.state
        const res = (await deleteOrganization(id)).data
        if (res.error) {
            console.log(res.error)
        } else {
            this.getOrganizations()
        }


    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    changeOrganizationState = (e) => {
        const organizacao = this.state.organizations.filter(organization => (organization.id === e.target.value))[0]


        this.setState({
            id: organizacao.id,
            type: organizacao.OrganizationTypeId,
            name: organizacao.name,
            address: organizacao.address,
            locale: organizacao.locale,
            zipcode: organizacao.zipcode,
            telephone: organizacao.telephone,
            mobilePhone: organizacao.mobilePhone,
            fiscalNumber: organizacao.fiscalNumber,
        })

    }

    render() {
        return (
            <Card.Body>
                <Container>
                    <Col>
                        <Form.Control as="select" name="id" onChange={this.changeOrganizationState} >
                            {
                                this.state.organizations.map((org, index) => {
                                    return (<option key={index} value={org.id}>{org.name}</option>)
                                })
                            }
                        </Form.Control>
                    </Col>
                    <Row>

                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="name" >Nome</InputGroup.Text>
                                <Form.Control name="name" value={this.state.name} onChange={this.saveToState} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="address" >Morada</InputGroup.Text>
                                <Form.Control name="address" value={this.state.address} onChange={this.saveToState} />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="OrganizationTypeId" >Tipo</InputGroup.Text>
                                        <Form.Control as="select" name="OrganizationTypeId" onChange={this.saveToState} >
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
                                        <Form.Control name="fiscalNumber" value={this.state.fiscalNumber} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="locale" >Localidade</InputGroup.Text>
                                        <Form.Control name="locale" value={this.state.locale} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="zipcode">Código-Postal</InputGroup.Text>
                                        <Form.Control name="zipcode" value={this.state.zipcode} onChange={this.saveToState} />
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
                                        <Form.Control name="telephone" value={this.state.telephone} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="mobilePhone" >Telemóvel</InputGroup.Text>
                                        <Form.Control name="mobilePhone" value={this.state.mobilePhone} onChange={this.saveToState} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col>
                            <Button variant="outline-success" onClick={this.updateOrganizations} disabled={this.state.isButtonDisabled}>Modificar Organização</Button>
                            <Button variant="outline-danger" onClick={this.deleteOrganizations} disabled={this.state.isButtonDisabled}>Eliminar Organização</Button>
                        </Col>

                    </Row>
                </Container >
            </Card.Body >
        )
    }
}
