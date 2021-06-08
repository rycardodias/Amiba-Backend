import React, { Component } from 'react'
import Me from '../../components/Me'
import MenuItems from '../../components/backoffice/MenuItems'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { routes } from '../../lib/backofficeRoutes'
import { verifyPermission } from '../../lib/permissions'

export default class Index extends Component {
    render() {
        return (
            <Me>
                {(items, isLoaded, fetch) => {

                    if (!isLoaded) {
                        return <p>Loading...</p>
                    }
                    if (items.error) {
                        return <p>{items.error}</p>
                    }
                    return (
                        <Container>
                            <Row>
                                <>
                                    {
                                        routes.map((value, index) => {
                                            if (verifyPermission(value.permission, items.data.permission) && (value.route === "")) {
                                                return (
                                                    <Col key={index} sm="2" style={{ minWidth: '150px' }}>
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

                                    {/* <Col key={1} sm="2" style={{ minWidth: '150px' }} >
                                        <MenuItems route="" title="Voltar" subtitle="" />
                                    </Col> */}


                                </>

                            </Row>
                        </Container>
                    )
                }
                }
            </Me >
        )
    }
}
