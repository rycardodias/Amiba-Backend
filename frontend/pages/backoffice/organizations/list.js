import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getOrganizations } from '../../../lib/organizationsRequests'

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

                <Link href="/backoffice/organizations">Voltar</Link>
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th key="1">Nome</th>
                            <th key="2">Tipo</th>
                            <th key="3">Telefone</th>
                            <th key="4">Telemovel</th>
                            <th key="5">Localidade</th>
                            <th key="6">Código-Postal</th>
                            <th key="7">Morada</th>
                            <th key="8">NIF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.organizationsData.map((organization, index) => {
                            return (
                                <Link href={{ pathname: `update/${organization.id}` }} ><tr key={index}>
                                    <td>{organization.name}</td>
                                    <td>{organization.OrganizationType.name}</td>
                                    <td>{organization.telephone}</td>
                                    <td>{organization.mobilePhone}</td>
                                    <td>{organization.locale}</td>
                                    <td>{organization.zipcode}</td>
                                    <td>{organization.address}</td>
                                    <td>{organization.fiscalNumber}</td>
                                </tr></Link>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}
