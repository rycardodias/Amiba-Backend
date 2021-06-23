import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import { createOrganizationTypes } from '../../../../lib/requests/organizationsTypesRequests'

export default class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: undefined,
            description: undefined,
            isButtonDisabled: true,
        }
    }

    createType = async () => {
        const { name, description } = this.state
        const res = await createOrganizationTypes(name, description)

        if (res.data.error) {

            alert(res.data.error)
            console.log(res.data.err)
        } else {
            this.setState({
                name: undefined,
                description: undefined,
                isButtonDisabled: true
            })
            
            alert(res.data.success)
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { name, description } = this.state

        if (name && description) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { name, description, isButtonDisabled } = this.state
        return (
            <>
                <Link href="/backoffice/organizations/organizationTypes">Voltar</Link>
                <Form >
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control name="description" value={description} onChange={this.saveToState} placeholder="Descrição" />
                    </Form.Group>

                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.createType} disabled={isButtonDisabled}>Adicionar Tipo Organização</Button>
                    </div>
                </Form>
            </>
        )
    }
}
