import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getOrganizationTypes } from '../../../../lib/requests/organizationsTypesRequests'
import { TitleAndBack } from '../../TitleAndBack'
export default class list extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            organizationsData: []
        }
    }

    getAllOrganizationTypes = async () => {
        const res = await getOrganizationTypes()
        this.setState({ organizationsData: res.data.data })
    }
    componentDidMount() {
        this.getAllOrganizationTypes()
    }

    render() {
        return (
            <>

                <TitleAndBack backLink="/backoffice/explorations/explorationTypes" title="Lista de Tipos de Explorações" />
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Nome</th>
                            <th >Descrição</th>
                            <th >Data Registo</th>
                            <th >Data Alteração</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.organizationsData.map((item, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${item.id}` }} >
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
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
