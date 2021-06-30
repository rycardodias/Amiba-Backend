import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getRestaurantId, updateRestaurant, deleteRestaurant } from '../../../lib/requests/restaurantsRequests'
import { getUsers } from '../../../lib/requests/usersRequests'
import Router from 'next/router'
import { TitleAndBack } from '../TitleAndBack'

const componentName = 'Restaurante'
const backURL = '/backoffice/restaurants/list'

export default class OrganizationUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
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
            usersData: []
        }

    }

    componentDidMount() {
        this.getRestaurant()
        this.getUsers()
    }

    getUsers = async () => {
        const users = (await getUsers()).data.data
        if (users) {
            this.setState({
                usersData: users
            })
        }
    }


    getRestaurant = async () => {
        const restaurant = (await getRestaurantId(this.props.id)).data.data
        if (restaurant) {
            this.setState({
                id: restaurant.id,
                UserId: restaurant.UserId,
                name: restaurant.name,
                description: restaurant.description,
                address: restaurant.address,
                locale: restaurant.locale,
                zipcode: restaurant.zipcode,
                fiscalNumber: restaurant.fiscalNumber,
                telephone: restaurant.telephone,
                mobilePhone: restaurant.mobilePhone
            })
        } else {
            Router.push(backURL, null, { shallow: true })
        }
    }



    update = async () => {
        const { id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state

        const res = await updateRestaurant(id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone)
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
        const res = (await deleteRestaurant(id)).data
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
        const { id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state

        if (id && UserId && name && description && address && locale && zipcode && fiscalNumber && telephone && mobilePhone) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone, isButtonDisabled, usersData } = this.state
        return (
            <>
                <TitleAndBack backLink={backURL} title={`Alterar ${componentName}`} />
                <Form>
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>
                    <Form.Group controlId="description" >
                        <Form.Label >Descrição</Form.Label>
                        <Form.Control name="description" value={description} onChange={this.saveToState} placeholder="Inserir descrição" />
                    </Form.Group>

                    <Form.Group controlId="UserId">
                        <Form.Label>Responsável</Form.Label>
                        <Form.Control as="select" name="UserId" value={UserId} onChange={this.saveToState} placeholder="Responsável" >
                            {
                                usersData.map((item) => {
                                    return (<option key={item.id} value={item.id}>{item.name}</option>)
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
