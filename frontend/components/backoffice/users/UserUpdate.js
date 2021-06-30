import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getUserId, updateUser } from '../../../lib/requests/usersRequests'
import Router from 'next/router'
import { TitleAndBack } from '../TitleAndBack'
import Cookies from 'js-cookie';

const componentName = 'Utilizador'
const backURL = '/backoffice/users/list'

export default class UserUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            id: "",
            name: "",
            surname: "",
            email: "",
            address: "",
            locale: "",
            zipcode: "",
            fiscalNumber: "",
            telephone: "",
            mobilePhone: "",
            isButtonDisabled: true,
        }

    }

    componentDidMount() {
        this.getUserId()
    }


    getUserId = async () => {
        const user = (await getUserId(this.props.id)).data.data
        const token = Cookies.get('token')
        
        if (user) {
            this.setState({
                token: token,
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                address: user.address,
                locale: user.locale,
                zipcode: user.zipcode,
                fiscalNumber: user.fiscalNumber,
                telephone: user.telephone,
                mobilePhone: user.mobilePhone,
                isButtonDisabled: false
            })
        } else {
            Router.push(backURL, null, { shallow: true })
        }
    }



    update = async () => {
        const { token, id, name, surname, email, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state

        const res = await updateUser(token, id, name, surname, email, address, locale, zipcode, fiscalNumber, telephone, mobilePhone)
        // alert(res.data.data)
        if (res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
            return
        }
        Router.push(backURL, null, { shallow: true })

    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { token, id, name, surname, email, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state

        if (token && id && name && surname && email && address && locale && zipcode && fiscalNumber && telephone && mobilePhone) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { token, id, name, surname, email, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = this.state
        return (
            <>
                <TitleAndBack backLink={backURL} title={`Alterar ${componentName}`} />
                <Form>
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>
                    <Form.Group controlId="surname" >
                        <Form.Label >Apelido</Form.Label>
                        <Form.Control name="surname" value={surname} onChange={this.saveToState} placeholder="Inserir apelido" />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={email} onChange={this.saveToState} placeholder="Email" />
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
                    </div>
                </Form >
            </>
        )
    }
}
