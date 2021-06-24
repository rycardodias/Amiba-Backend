import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { verifyPermission } from '../../lib/permissions'
import { routes } from '../../lib/backofficeRoutes'
import MenuItems from '../backoffice/MenuItems'

export const RoutesList = (props) => {
   
    return (
        <Container>
            <Row>
                <>
                    {
                        routes.map((value, index) => {
                            if (verifyPermission(value.permission, props.permission) && (value.route === props.route)) {
                                return (
                                    <Col key={index} sm="2" style={{ minWidth: '200px', paddingBottom: '.5rem' }}>
                                        <MenuItems
                                            route={value.nextRoute}
                                            title={value.title}
                                            subtitle={value.description}
                                        />
                                    </Col>
                                )
                            }
                        })
                    }
                    {props.route === "/backoffice" ? null : 
                        <Col key={1} sm="2" style={{ minWidth: '150px' }} >
                            <MenuItems route={props.previousRoute} title="Voltar" subtitle="" />
                        </Col>
                    }
                </>
            </Row>
        </Container>
    )
}
