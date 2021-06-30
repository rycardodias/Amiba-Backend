import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getRestaurants } from '../../../lib/requests/restaurantsRequests'
import { TitleAndBack } from '../TitleAndBack'
export default class list extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurantsData: []
        }
    }

    getRestaurants = async () => {
        const res = await getRestaurants()
        this.setState({ restaurantsData: res.data.data })
    }
    componentDidMount() {
        this.getRestaurants()
    }

    render() {
        return (
            <>

                <TitleAndBack backLink="/backoffice/restaurants" title="Lista de Restaurantes" />
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Nome</th>
                            <th >Descrição</th>
                            <th >Gestor</th>
                            <th >Localidade</th>
                            <th >Código-Postal</th>
                            <th >Morada</th>
                            <th >Telefone</th>
                            <th >Telemovel</th>
                            <th >NIF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.restaurantsData.map((item, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${item.id}` }} >
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.User.name + " " + item.User.surname}</td>
                                        <td>{item.locale}</td>
                                        <td>{item.zipcode}</td>
                                        <td>{item.address}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.mobilePhone}</td>
                                        <td>{item.fiscalNumber}</td>
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
