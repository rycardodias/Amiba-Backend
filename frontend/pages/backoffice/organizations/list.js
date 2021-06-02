import React from 'react'
import OrganizationsList from '../../../components/forms/OrganizationsList'
import { getOrganizations } from '../../../lib/organizations/organizationsRequests'

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
            <OrganizationsList data={this.state.organizationsData} />
        )
    }
}
