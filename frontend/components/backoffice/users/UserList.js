import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getUsers } from '../../../lib/requests/usersRequests'
import { TitleAndBack } from '../TitleAndBack'
export default class list extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            usersData: []
        }
    }

    getUsers = async () => {
        const res = await getUsers()
        this.setState({ usersData: res.data.data })
    }
    componentDidMount() {
        this.getUsers()
    }

    render() {
        return (
            <>

                <TitleAndBack backLink="/backoffice/users" title="Lista de Utilizadores" />
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Nome</th>
                            <th >NIF</th>
                            <th >Email</th>
                            <th >Telefone</th>
                            <th >Telemovel</th>
                            <th >Localidade</th>
                            <th >Código-Postal</th>
                            <th >Morada</th>
                            <th >Permissões</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usersData.map((item, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${item.id}` }} >
                                    <tr key={index}>
                                        <td>{item.name + " " + item.surname}</td>
                                        <td>{item.fiscalNumber}</td>
                                        <td>{item.email}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.mobilePhone}</td>
                                        <td>{item.locale}</td>
                                        <td>{item.zipcode}</td>
                                        <td>{item.address}</td>
                                        <td>{item.permission}</td>
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
