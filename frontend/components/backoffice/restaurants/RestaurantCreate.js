import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createRestaurant } from '../../../lib/requests/restaurantsRequests'
import { getUsers } from '../../../lib/requests/usersRequests'
import Router from 'next/router'
import { TitleAndBack } from '../TitleAndBack'

export default class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            UserId: "",
            name: "",
            description: "",
            address: "",
            locale: "",
            zipcode: "",
            fiscalNumber: "",
            telephone: "",
            mobilePhone: "",
            isButtonDisabled: true,
            users: []
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async () => {
        const users = (await getUsers()).data.data
        if (users.length > 0) {
            this.setState({
                users: users,
                UserId: users[0].id,
            })
        }
    }

    createRestaurant = async () => {
        const { UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state
        const res = await createRestaurant(UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone)

        if (res.data.error) {
            alert(res.data.error)
            console.log("err:", res.data.err)
        } else {
            Router.push('/backoffice/restaurants/list', null, { shallow: true })
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state

        if (UserId && name && description && address && locale && zipcode && fiscalNumber && telephone && mobilePhone) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone, isButtonDisabled, users } = this.state
        return (
            <>
                <TitleAndBack backLink="/backoffice/restaurants" title="Criar Restaurante" />
                <Form >
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>

                    <Form.Group controlId="description" >
                        <Form.Label >Descrição</Form.Label>
                        <Form.Control name="description" value={description} onChange={this.saveToState} placeholder="Inserir Descrição" />
                    </Form.Group>

                    <Form.Group controlId="UserId">
                        <Form.Label>Responsável</Form.Label>
                        <Form.Control as="select" name="UserId" onChange={this.saveToState} placeholder="Inserir Responsável" >
                            {
                                users.map((item) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })
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
                        <Button variant="outline-success" onClick={this.createRestaurant} disabled={isButtonDisabled}>Adicionar Organização</Button>
                    </div>
                </Form>
            </>
        )
    }
}
