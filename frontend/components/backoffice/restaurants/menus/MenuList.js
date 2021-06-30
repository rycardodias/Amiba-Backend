import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getMenus } from '../../../../lib/requests/menusRequests'

import { TitleAndBack } from '../../TitleAndBack'
export default class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menusData: []
        }
    }

    getMenus = async () => {
        const res = await getMenus()
        this.setState({ menusData: res.data.data })
    }
    componentDidMount() {
        this.getMenus()
    }

    render() {
        return (
            <>
                <TitleAndBack backLink="/backoffice/restaurants/menus" title="Menus de Restaurantes"/>
                
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Titulo</th>
                            <th >Descrição</th>
                            <th >Restaurante</th>
                            <th >Imagem</th>
                            <th >Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.menusData.map((item, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${item.id}` }} >
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.Restaurant.name}</td>
                                        <td>{item.image}</td>
                                        <td>{item.active}</td>
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
