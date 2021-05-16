import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { updatePassword } from '../../lib/users/userRequests'
import Cookies from 'js-cookie'

export default class ProfileChangePassoword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            actualPassword: undefined,
            oldPassword: undefined,
            newPassword: undefined,
            newPassword2: undefined,
            isButtonDisabled: false
        }
    }

    componentDidMount() {
        // const actualPassword = await getPassword()
        this.setState({
            id: this.props.id,
            // actualPassword: actualPassword
        })

    }

    changePassword = async () => {
        if (this.state.newPassword == this.state.newPassword2) {
            return await updatePassword(this.state.id, Cookies.get('token'), this.state.newPassword)
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
        return (
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="oldPassword" style={{ width: '14rem' }}>Palavra-passe Antiga</InputGroup.Text>
                                <Form.Control name="oldPassword" onChange={this.saveToState} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="newPassword" style={{ width: '14rem' }}>Nova Palavra-passe</InputGroup.Text>
                                <Form.Control name="newPassword" onChange={this.saveToState} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="newPassword2" style={{ width: '14rem' }}>Repetir Nova Palavra-passe</InputGroup.Text>
                                <Form.Control name="newPassword2" onChange={this.saveToState} />
                            </InputGroup>
                            <Button variant="outline-success" onClick={this.changePassword} disabled={this.state.isButtonDisabled}>Alterar Palavra-Passe</Button>
                        </Col>
                        <Col>

                        </Col>



                    </Row>

                </Container>

            </Card.Body>
        )
    }
}
