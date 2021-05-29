import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MenuItems from './MenuItems'
import { verifyPermission } from '../../lib/permissions'
import { routes } from '../../lib/backofficeRoutes'

export default class MenuContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            baseRoute: ""
        }
    }

    render() {

        // const routes = [
        //     [['ADMIN', 'AMIBA'], 'backoffice/organizations', 'Organizações', 'Gestão de Organizações', 'organizations'],
        //     [['ADMIN', 'AMIBA'], 'backoffice/organizations', 'Listar Organização', 'Gestão de Organizações', 'organizations/'],
        //     [['ADMIN'], 'backoffice/explorations', 'Explorações', 'Gestão de Explorações', 'explorations'],
        //     [['ADMIN'], 'backoffice/users', 'Utilizadores', 'Gestão de Utilizadores']
        // ]

        

        return (
            <Container>
                { this.state.baseRoute}
                < Row >
                    {
                        routes.map((value, index) => {
                            if (verifyPermission(value.permission, this.props.permissions) && value.level === this.state.baseRoute) {
                                return (
                                    <Col sm="2" style={{ minWidth: '150px' }} onClick={() => this.setState({ baseRoute: value.nextLevel })}>
                                        <MenuItems
                                            route={value.route}
                                            title={value.title}
                                            subtitle={value.description}
                                        />
                                    </Col>
                                )
                            }
                        })
                    }

                </Row >
            </Container >
        )
    }
}