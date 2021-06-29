import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { deleteExploration, getExplorationId, getExplorationTypes, updateExploration } from '../../../lib/requests/explorationsRequests'
import Router from 'next/router'
import { TitleAndBack } from '../TitleAndBack'
export default class OrganizationUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: undefined,
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
        }

    }

    componentDidMount() {
        this.getTypes()
        this.getExploration()
    }

    getExploration = async () => {
        const exploration = (await getExplorationId(this.props.id)).data.data

        if (exploration) {
            this.setState({
                id: exploration.id,
                OrganizationId: exploration.OrganizationId,
                ExplorationTypeId: exploration.ExplorationTypeId,
                name: exploration.name,
                address: exploration.address,
                locale: exploration.locale,
                zipcode: exploration.zipcode,
                telephone: exploration.telephone,
                mobilePhone: exploration.mobilePhone,
                fiscalNumber: exploration.fiscalNumber,
                gpsLocalization: exploration.gpsLocalization,
                isButtonDisabled: false
            })
        } else {
            Router.push('/backoffice/explorations/list', null, { shallow: true })
        }
    }


    getTypes = async () => {
        const explorationTypes = (await getExplorationTypes()).data.data
        if (explorationTypes.length > 0) {
            this.setState({
                explorationTypes: explorationTypes,
            })
        }
    }

    updateExploration = async () => {
        const { id, OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization } = this.state

        const res = await updateExploration(id, OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization)
        // alert(res.data.data)
        if (res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
            return
        }
        Router.push('/backoffice/explorations/list', null, { shallow: true })
    };

    deleteExploration = async () => {
        const { id } = this.state
        const res = (await deleteExploration(id)).data
        if (res.error) {
            alert(res.error)
        } else {
            Router.push('/backoffice/explorations/list', null, { shallow: true })
        }

    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
        console.log(this.state.defaultValue)
    };

    verifyNulls = () => {
        const { id, OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization } = this.state

        if (id && OrganizationId && ExplorationTypeId && name && address && locale && zipcode && telephone && mobilePhone && fiscalNumber && gpsLocalization) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { id, OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization, explorationTypes } = this.state
        return (
            <>
                <TitleAndBack backLink="/backoffice/explorations/list" title="Alterar Exploração" />

                <Form>
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>
                    <Form.Group controlId="ExplorationTypeId">
                        <Form.Label>Tipo Exploração</Form.Label>
                        <Form.Control as="select" name="ExplorationTypeId" onChange={this.saveToState} placeholder="Tipo Exploração" >
                            {
                                explorationTypes.map((type) => {
                                    if (type.id === ExplorationTypeId) {
                                        return (<option key={type.id} value={type.id} selected>{type.name}</option>)
                                    }
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
                    <Form.Group controlId="gpsLocalization">
                        <Form.Label>GPS</Form.Label>
                        <Form.Control name="gpsLocalization" value={gpsLocalization} onChange={this.saveToState} placeholder="GPS" />
                    </Form.Group>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.updateExploration} disabled={this.state.isButtonDisabled}>Modificar Exploração</Button>
                        <Button variant="outline-danger" onClick={this.deleteExploration} disabled={this.state.isButtonDisabled}>Eliminar Exploração</Button>
                    </div>
                </Form >
            </>
        )
    }
}
