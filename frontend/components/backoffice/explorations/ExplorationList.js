import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getExplorations, getOrganizations } from '../../../lib/requests/explorationsRequests'
import { TitleAndBack } from '../TitleAndBack'
export default class list extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            explorationsData: []
        }
    }

    getAllExplorations = async () => {
        const res = await getExplorations()
        console.log(res)
        this.setState({ explorationsData: res.data.data })
    }
    componentDidMount() {
        this.getAllExplorations()
    }

    render() {
        return (
            <>
            
            <TitleAndBack backLink="/backoffice/explorations" title="Lista de Explorações" />
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Nome</th>
                            <th >Tipo</th>
                            <th >Organização</th>
                            <th >Telefone</th>
                            <th >Telemovel</th>
                            <th >Localidade</th>
                            <th >Código-Postal</th>
                            <th >Morada</th>
                            <th >NIF</th>
                            <th >GPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.explorationsData.map((exploration, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${exploration.id}` }} >
                                    <tr key={index}>
                                        <td>{exploration.name}</td>
                                        <td>{exploration.ExplorationType.name}</td>
                                        <td>{exploration.Organization.name}</td>
                                        <td>{exploration.telephone}</td>
                                        <td>{exploration.mobilePhone}</td>
                                        <td>{exploration.locale}</td>
                                        <td>{exploration.zipcode}</td>
                                        <td>{exploration.address}</td>
                                        <td>{exploration.fiscalNumber}</td>
                                        <td>{exploration.gpsLocalization}</td>
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
