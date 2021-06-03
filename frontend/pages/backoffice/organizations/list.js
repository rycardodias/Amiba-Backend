import React from 'react'
import OrganizationsList from '../../../components/backoffice/organizations/OrganizationsList'
import { getOrganizations } from '../../../lib/organizationsRequests'
import { removeElementStorage } from '../../../lib/storage'

import Col from 'react-bootstrap/Col'
import MenuItems from '../../../components/backoffice/MenuItems'


export default class list extends React.Component {
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
    componentDidMount() {
        this.getAllOrganizations()
    }

    render() {
        return (
            <>
                <Col key={1} sm="2" style={{ minWidth: '150px' }} onClick={() => removeElementStorage('menuStack')}>
                    <MenuItems route="/backoffice" title="Voltar" subtitle="" />
                </Col>
                <OrganizationsList data={this.state.organizationsData} />
            </>
        )
    }
}
