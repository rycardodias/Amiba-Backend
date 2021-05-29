import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MenuItems from './MenuItems'
import {verifyPermission}  from '../../lib/permissions'

export default function MenuContainer(props) {
    const routes = [
        [['ADMIN', 'USER'], 'backoffice/organizations', 'Organizações', 'Gestão de Organizações'],
        [['ADMIN'], 'backoffice/explorations', 'Explorações', 'Gestão de Explorações'],
        [['ADMIN'], 'backoffice/users', 'Utilizadores', 'Gestão de Utilizadores']
    ]

   
    return (
        <Container>
            {props.permissions}
            <Row>
                {routes.map((value, index) => {
                    if (verifyPermission(value[0], props.permissions)) {
                        return (
                            <Col sm="2" style={{ minWidth: '150px' }}>
                                <MenuItems
                                    route={value[1]}
                                    title={value[2]}
                                    subtitle={value[3]}
                                />
                            </Col>
                        )
                    }
                })
                }

            </Row>
        </Container>
    )
}