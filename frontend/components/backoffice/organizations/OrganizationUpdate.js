import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getOrganizationId, getOrganizationTypes, updateOrganization, deleteOrganization } from '../../../lib/requests/organizationsRequests'
import Router from 'next/router'
import { TitleAndBack } from '../TitleAndBack'

const componentName = 'Organização'
const backURL = '/backoffice/organizations/list'

export default class OrganizationUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            OrganizationTypeId: "",
            UserId: "",
            name: "",
            address: "",
            locale: "",
            zipcode: "",
            telephone: "",
            mobilePhone: "",
            fiscalNumber: "",
            isButtonDisabled: true,
            organizationTypes: [],
        }

    }

    componentDidMount() {
        this.getTypes()
        this.getOrganizations()
    }


    getOrganizations = async () => {
        const organization = (await getOrganizationId(this.props.id)).data.data

        if (organization) {
            this.setState({
                id: organization.id,
                OrganizationTypeId: organization.OrganizationTypeId,
                UserId: organization.UserId,
                name: organization.name,
                address: organization.address,
                locale: organization.locale,
                zipcode: organization.zipcode,
                telephone: organization.telephone,
                mobilePhone: organization.mobilePhone,
                fiscalNumber: organization.fiscalNumber,
                isButtonDisabled: false
            })
        } else {
            Router.push(backURL, null, { shallow: true })
        }
    }

    getTypes = async () => {
        const types = (await getOrganizationTypes()).data.data
        if (types.length > 0) {
            this.setState({
                organizationTypes: types,
            })
        }
    }

    update = async () => {
        const { id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = this.state

        const res = await updateOrganization(id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber)
        // alert(res.data.data)
        if (res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
            return
        }
        Router.push(backURL, null, { shallow: true })

    };

    delete = async () => {
        const { id } = this.state
        const res = (await deleteOrganization(id)).data
        if (res.error) {
            alert(res.error)
        } else {
            Router.push(backURL, null, { shallow: true })
        }

    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = this.state

        if (id && OrganizationTypeId && UserId && name && address && locale && zipcode && telephone && mobilePhone && fiscalNumber) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, organizationTypes } = this.state
        return (
            <>
                <TitleAndBack backLink={backURL} title={`Alterar ${componentName}`} />

                <Form>
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>
                    <Form.Group controlId="OrganizationTypeId">
                        <Form.Label>Tipo Organização</Form.Label>
                        <Form.Control as="select" name="OrganizationTypeId" value={OrganizationTypeId} onChange={this.saveToState} placeholder="Tipo Organização" >
                            {
                                organizationTypes.map((type) => {
                                    return (<option key={type.id} value={type.id}>{type.name}</option>)
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="fiscalNumber">
                        <Form.Label>NIF</Form.Label>
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
                        <Form.Control name="mobilePhone" value={mobilePhone} onChange={this.saveToState} placeholder="mobilePhone" />
                    </Form.Group>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.update} disabled={isButtonDisabled}>Alterar {componentName}</Button>
                        <Button variant="outline-danger" onClick={this.delete} disabled={isButtonDisabled}>Eliminar {componentName}</Button>
                    </div>
                </Form >
            </>
        )
    }
}
