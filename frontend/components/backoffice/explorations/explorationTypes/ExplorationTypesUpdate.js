import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getOrganizationTypes, updateOrganizationTypes, deleteOrganizationTypes } from '../../../../lib/requests/organizationsTypesRequests'
import Router from 'next/router'
import { TitleAndBack } from '../../TitleAndBack'

const componentName = 'Tipo de Exploração'
const backURL = '/backoffice/explorations/explorationTypes/list'

export default class OrganizationUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            description: "",
            isButtonDisabled: true,
        }
    }

    componentDidMount() {
        this.getOrganizationTypes()
    }


    getOrganizationTypes = async () => {
        const organizations = (await getOrganizationTypes()).data.data
        const params = this.props.id

        const org = organizations.filter(organization => (organization.id === params))[0]

        if (org) {
            this.setState({
                id: params ? org.id : organizations[0].id,
                name: params ? org.name : organizations[0].name,
                description: params ? org.description : organizations[0].description,
                isButtonDisabled: false
            })
        } else {
            Router.push(backURL, null, { shallow: true })
        }
    }


    update = async () => {
        const { id, name, description } = this.state

        const res = await updateOrganizationTypes(id, name, description)
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

        const res = (await deleteOrganizationTypes(id)).data
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
        const { id, name, description } = this.state

        if (id && name && description) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        return (
            <>
                <TitleAndBack backLink={backURL} title={`Alterar ${componentName}`} />

                <Form>
                    <Form.Group controlId="name" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control name="name" value={this.state.name} onChange={this.saveToState} placeholder="Inserir nome" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control name="description" value={this.state.description} onChange={this.saveToState} placeholder="Descrição" />
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
