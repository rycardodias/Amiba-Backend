import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { getOrganizationTypes, createOrganization } from '../../../lib/organizationsRequests'

export default class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: undefined,
            name: undefined,
            address: undefined,
            locale: undefined,
            zipcode: undefined,
            telephone: undefined,
            mobilePhone: undefined,
            fiscalNumber: undefined,
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
            alert(res.data.success)
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = this.state

        if (name && address && locale && zipcode && telephone && mobilePhone && fiscalNumber) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, isButtonDisabled, types } = this.state
        return (
            <>
                <Link href="/backoffice/organizations">Voltar</Link>
                <Form >
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>

                    <Form.Group controlId="OrganizationTypeId">
                        <Form.Label>Tipo Organização</Form.Label>
                        <Form.Control as="select" name="OrganizationTypeId" onChange={this.saveToState} placeholder="Tipo Organização" >
                            {
                                types.map((type) => { return (<option key={type.id} value={type.id}>{type.name}</option>) })
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="fiscalNumber">
                        <Form.Label>Número Identificação Fiscal</Form.Label>
                        <Form.Control name="fiscalNumber" value={fiscalNumber} onChange={this.saveToState} placeholder="NIF" />
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Morada</Form.Label>
                        <Form.Control name="address" value={address} onChange={this.saveToState} placeholder="Morada" />
                    </Form.Group>
                    <Form.Group controlId="locale">
                        <Form.Label>Localidade</Form.Label>
                        <Form.Control name="locale" value={locale} onChange={this.saveToState} placeholder="Localidade" />
                    </Form.Group>
                    <Form.Group controlId="zipcode">
                        <Form.Label>Código-Postal</Form.Label>
                        <Form.Control name="zipcode" value={zipcode} onChange={this.saveToState} placeholder="Código-Postal" />
                    </Form.Group>

                    <Form.Group controlId="telephone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control name="telephone" value={telephone} onChange={this.saveToState} placeholder="Telefone" />
                    </Form.Group>
                    <Form.Group controlId="mobilePhone">
                        <Form.Label>Telemóvel</Form.Label>
                        <Form.Control name="mobilePhone" value={mobilePhone} onChange={this.saveToState} placeholder="Telemovel" />
                    </Form.Group>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.createOrganization} disabled={isButtonDisabled}>Adicionar Organização</Button>
                    </div>
                </Form>
            </>
        )
    }
}
