import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updateAddress } from '../../lib/users/userRequests'
import Cookies from 'js-cookie'

export default class ProfileAddress extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            address: undefined,
            locale: undefined,
            zipcode: undefined,
            isButtonDisabled: false
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            address: this.props.address,
            locale: this.props.locale,
            zipcode: this.props.zipcode
        })
    }


    updateUser = async () => {
        if (this.state.address != "" && this.state.locale != "" && this.state.zipcode != "") {
            return await updateAddress(this.state.id, Cookies.get('token'),
                this.state.address, this.state.locale, this.state.zipcode)
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // if ((this.state.address != "" || this.state.address == undefined) && this.state.locale != "" && this.state.zipcode != "") {
        //     this.setState({ isButtonDisabled: false }) //mostra o botao
        // } else {
        //     this.setState({ isButtonDisabled: true })
        // }
    };



    render() {
        const { name, surname, email, fiscalNumber, organization, restaurant, address, locale, zipcode } = this.props
        return (
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="name" style={{ width: '8rem' }}>Nome</InputGroup.Text>
                                <Form.Control name="name" disabled={true} defaultValue={name + ' ' + surname} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="email" style={{ width: '8rem' }}>Email</InputGroup.Text>
                                <Form.Control name="email" disabled={true} defaultValue={email} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="fiscalNumber" style={{ width: '8rem' }}>NIF</InputGroup.Text>
                                <Form.Control name="fiscalNumber" disabled={true} defaultValue={fiscalNumber} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="organization" style={{ width: '8rem' }} >Organização</InputGroup.Text>
                                <Form.Control name="organization" disabled={true} defaultValue={organization} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="restaurant" style={{ width: '8rem' }}>Restaurante</InputGroup.Text>
                                <Form.Control name="restaurant" disabled={true} defaultValue={restaurant} />
                            </InputGroup>

                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="address" style={{ width: '8rem' }}>Morada</InputGroup.Text>
                                <Form.Control name="address" onChange={this.saveToState} defaultValue={address} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="" style={{ width: '8rem' }}>Localidade</InputGroup.Text>
                                <Form.Control name="locale" onChange={this.saveToState} defaultValue={locale} />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="" style={{ width: '8rem' }}>Código-Postal</InputGroup.Text>
                                <Form.Control name="zipcode" onChange={this.saveToState} defaultValue={zipcode} />
                            </InputGroup>
                            <Button variant="outline-success" onClick={this.updateUser} disabled={this.state.isButtonDisabled}>Alterar Morada</Button>
                        </Col>
                    </Row>

                </Container>

            </Card.Body>
        )
    }
}
