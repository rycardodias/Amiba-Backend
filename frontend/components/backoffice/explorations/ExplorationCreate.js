import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { getExplorationTypes, createExploration } from '../../../lib/requests/explorationsRequests'
import { getOrganizations } from '../../../lib/requests/organizationsRequests'
import Router from 'next/router'
export default class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            OrganizationId: undefined,
            ExplorationTypeId: undefined,
            name: undefined,
            address: undefined,
            locale: undefined,
            zipcode: undefined,
            telephone: undefined,
            mobilePhone: undefined,
            fiscalNumber: undefined,
            gpsLocalization: undefined,
            isButtonDisabled: true,
            explorationTypes: [],
            organizations: []
        }
    }

    componentDidMount() {
        this.getTypes()
    }

    getTypes = async () => {
        const explorationTypes = (await getExplorationTypes()).data.data
        if (explorationTypes.length > 0) {
            this.setState({
                explorationTypes: explorationTypes,
                ExplorationTypeId: explorationTypes[0].id,
            })
        }
        const organizations = (await getOrganizations()).data.data
        if (organizations.length > 0) {
            this.setState({
                organizations: organizations,
                OrganizationId: organizations[0].id,
            })
        }
    }

    createExploration = async () => {
        const { OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization } = this.state
        const res = await createExploration(OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization)

        if (res.data.error) {
            alert(res.data.error)
            console.log("err:", res.data.err)
        } else {
            Router.push('/backoffice/explorations/list', null, { shallow: true })
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization } = this.state

        if (OrganizationId && ExplorationTypeId && name && address && locale && zipcode && telephone && mobilePhone && fiscalNumber, gpsLocalization) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization, isButtonDisabled, organizations, explorationTypes } = this.state
        return (
            <>
                <Link href="/backoffice/explorations">Voltar</Link>
                <Form >
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>

                    <Form.Group controlId="OrganizationId">
                        <Form.Label>Organização</Form.Label>
                        <Form.Control as="select" name="OrganizationId" onChange={this.saveToState} placeholder="Organização" >
                            {
                                organizations.map((type) => { return (<option key={type.id} value={type.id}>{type.name}</option>) })
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="ExplorationTypeId">
                        <Form.Label>Tipo Exploração</Form.Label>
                        <Form.Control as="select" name="ExplorationTypeId" onChange={this.saveToState} placeholder="Tipo Exploração" >
                            {
                                explorationTypes.map((type) => { return (<option key={type.id} value={type.id}>{type.name}</option>) })
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
                    <Form.Group controlId="gpsLocalization">
                        <Form.Label>Telemóvel</Form.Label>
                        <Form.Control name="gpsLocalization" value={gpsLocalization} onChange={this.saveToState} placeholder="GPS" />
                    </Form.Group>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.createExploration} disabled={isButtonDisabled}>Adicionar Exploração</Button>
                    </div>
                </Form>
            </>
        )
    }
}
