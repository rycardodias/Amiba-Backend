import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import OrganizationsCreateForm from '../../components/forms/OrganizationsCreateForm'
import OrganizationsList from '../../components/forms/OrganizationsList'
import { getOrganizations } from '../../lib/organizations/organizationsRequests'

export default class organizations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            organizationsData: []
        }
    }

    getAllOrganizations = async () => {
        const res = await getOrganizations()
        this.setState({ organizationsData: res.data.data })
    }


    render() {
        return (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">Criar Organização</Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">

                        <OrganizationsCreateForm />
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" onClick={this.getAllOrganizations}>Listar Organizações</Accordion.Toggle>
                    <Accordion.Collapse eventKey="1" >
                        <OrganizationsList data={this.state.organizationsData} />
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}
