import React from 'react'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getCertifications } from '../../../../lib/requests/certificationsRequests'
import { TitleAndBack } from '../../TitleAndBack'
export default class list extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            certificationsData: []
        }
    }

    getCertifications = async () => {
        const res = await getCertifications()
        this.setState({ certificationsData: res.data.data })
    }
    componentDidMount() {
        this.getCertifications()
    }

    render() {
        return (
            <>

                <TitleAndBack backLink="/backoffice/explorations/certifications" title="Lista de Certificações" />
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th >Exploração</th>
                            <th >Código</th>
                            <th >Data Inicio</th>
                            <th >Data Fim</th>
                            <th >Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.certificationsData.map((item, index) => {
                            return (
                                <Link key={index} href={{ pathname: `update/${item.id}` }} >
                                    <tr key={index}>
                                        <td>{item.Exploration.name}</td>
                                        <td>{item.certificationCode}</td>
                                        <td>{item.initialDate}</td>
                                        <td>{item.finalDate}</td>
                                        <td>{item.description}</td>
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
