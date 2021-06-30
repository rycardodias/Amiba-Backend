import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getOrganizations } from '../../../lib/requests/organizationsRequests'
import { TitleAndBack } from '../TitleAndBack'
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

                <TitleAndBack backLink="/backoffice/organizations" title="Lista de Organizações" />
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Nome</th>
                            <th >Tipo</th>
                            <th >Telefone</th>
                            <th >Telemovel</th>
                            <th >Localidade</th>
                            <th >Código-Postal</th>
                            <th >Morada</th>
                            <th >NIF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.organizationsData.map((organization, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${organization.id}` }} >
                                    <tr key={index}>
                                        <td>{organization.name}</td>
                                        <td>{organization.OrganizationType.name}</td>
                                        <td>{organization.telephone}</td>
                                        <td>{organization.mobilePhone}</td>
                                        <td>{organization.locale}</td>
                                        <td>{organization.zipcode}</td>
                                        <td>{organization.address}</td>
                                        <td>{organization.fiscalNumber}</td>
                                    </tr>
                                </Link>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}
