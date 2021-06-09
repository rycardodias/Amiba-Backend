import React from 'react'
import Table from 'react-bootstrap/Table'
import { getOrganizations } from '../../../lib/organizationsRequests'
import MenuItems  from '../../../components/backoffice/MenuItems'

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
                <MenuItems route="/backoffice/organizations" title="Voltar" subtitle="" />

                <Table responsive>
                <thead>
                    <tr key="0">
                        <th key="1">Tipo</th>
                        <th key="2">Nome</th>
                        <th key="3">Morada</th>
                        <th key="4">Localidade</th>
                        <th key="5">Código-Postal</th>
                        <th key="6">Telefone</th>
                        <th key="7">Telemovel</th>
                        <th key="8">NIF</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.organizationsData.map((organization, index) => {
                        return (
                            <tr key={index}>
                                <td>{organization.OrganizationType.name}</td>
                                <td>{organization.name}</td>
                                <td>{organization.adress}</td>
                                <td>{organization.locale}</td>
                                <td>{organization.zipcode}</td>
                                <td>{organization.telephone}</td>
                                <td>{organization.mobilePhone}</td>
                                <td>{organization.fiscalNumber}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            </>
        )
    }
}
