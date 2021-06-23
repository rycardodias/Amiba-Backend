import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getOrganizationTypes, updateOrganization, deleteOrganization } from '../../../../lib/organizationsRequests'
import Link from 'next/link'
import Router from 'next/router'

export default class OrganizationUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: undefined,
            OrganizationTypeId: undefined,
            name: undefined,
            address: undefined,
            locale: undefined,
            zipcode: undefined,
            telephone: undefined,
            mobilePhone: undefined,
            fiscalNumber: undefined,
            isButtonDisabled: true,
            types: [],
        }

    }

    componentDidMount() {
        this.getTypes()
        this.getOrganizations()
    }


    getOrganizations = async () => {
        const organizations = (await getOrganizations()).data.data
        const params = this.props.id

        const org = organizations.filter(organization => (organization.id === params))[0]

        if (org) {
            this.setState({
                id: params ? org.id : organizations[0].id,
                OrganizationTypeId: params ? org.OrganizationTypeId : organizations[0].OrganizationTypeId,
                name: params ? org.name : organizations[0].name,
                address: params ? org.address : organizations[0].address,
                locale: params ? org.locale : organizations[0].locale,
                zipcode: params ? org.zipcode : organizations[0].zipcode,
                telephone: params ? org.telephone : organizations[0].telephone,
                mobilePhone: params ? org.mobilePhone : organizations[0].mobilePhone,
                fiscalNumber: params ? org.fiscalNumber : organizations[0].fiscalNumber,
                organizations: organizations,
                isButtonDisabled: false
            })
        } else {
            this.setState({
                type: undefined,
                name: undefined,
                address: undefined,
                locale: undefined,
                zipcode: undefined,
                telephone: undefined,
                mobilePhone: undefined,
                fiscalNumber: undefined,
                isButtonDisabled: true
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
        // alert(res.data.data)
        if (res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
            return
        }
        Router.push('/backoffice/organizations', null, { shallow: true }
        )
    };

    deleteOrganizations = async () => {
        const { id } = this.state
        const res = (await deleteOrganization(id)).data
        if (res.error) {
            alert(res.error)
        } else {
            this.getOrganizations()
            alert(res.sucess)
        }

    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { id, OrganizationTypeId, name, fiscalNumber } = this.state

        if (id && OrganizationTypeId && name && fiscalNumber) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        return (
            <>
                <Link href="/backoffice/organizations/list">Voltar</Link>

                <Form>
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={this.state.name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>
                    <Form.Group controlId="OrganizationTypeId">
                        <Form.Label>Tipo Organização</Form.Label>
                        <Form.Control as="select" name="OrganizationTypeId" onChange={this.saveToState} placeholder="Tipo Organização" >
                            {
                                this.state.types.map((type) => {
                                    return (<option key={type.id} value={type.id}>{type.name}</option>)
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="fiscalNumber">
                        <Form.Label>NIF</Form.Label>
                        <Form.Control name="fiscalNumber" value={this.state.fiscalNumber} onChange={this.saveToState} placeholder="NIF" />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.Label>Morada</Form.Label>
                        <Form.Control name="address" value={this.state.address} onChange={this.saveToState} placeholder="Morada" />
                    </Form.Group>
                    <Form.Group controlId="locale">
                        <Form.Label>Localidade</Form.Label>
                        <Form.Control name="locale" value={this.state.locale} onChange={this.saveToState} placeholder="Localidade" />
                    </Form.Group>

                    <Form.Group controlId="zipcode">
                        <Form.Label>Código-Postal</Form.Label>
                        <Form.Control name="zipcode" value={this.state.zipcode} onChange={this.saveToState} placeholder="Código-Postal" />
                    </Form.Group>
                    <Form.Group controlId="telephone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control name="telephone" value={this.state.telephone} onChange={this.saveToState} placeholder="Telefone" />
                    </Form.Group>
                    <Form.Group controlId="mobilePhone">
                        <Form.Label>Telemóvel</Form.Label>
                        <Form.Control name="mobilePhone" value={this.state.mobilePhone} onChange={this.saveToState} placeholder="mobilePhone" />
                    </Form.Group>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.updateOrganizations} disabled={this.state.isButtonDisabled}>Modificar Organização</Button>
                        <Button variant="outline-danger" onClick={this.deleteOrganizations} disabled={this.state.isButtonDisabled}>Eliminar Organização</Button>
                    </div>
                </Form >
            </>
        )
    }
}
