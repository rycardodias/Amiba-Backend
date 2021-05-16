import React, { Component } from 'react'
import Me from '../../components/Me'

import MenuItems from '../../components/backend/MenuItems'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default class Index extends Component {

    handleChange = () => {

    }
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
                        <Container fluid style={{ paddingLeft: '3%', paddingRight: '3%', paddingTop: '1.5%' }}>
                            <Row>
                                <Col sm="2">
                                    <MenuItems
                                        route="backoffice/organizations"
                                        title="Organizações"
                                        subtitle="Gestão de Organizações"
                                    />
                                </Col>
                                <Col sm="2">
                                    <MenuItems
                                        route="backoffice/explorations"
                                        title="Explorações"
                                        subtitle="Gestão de Explorações"
                                    />
                                </Col>
                                <Col sm="2">
                                    <MenuItems
                                        route="backoffice/users"
                                        title="Utilizadores"
                                        subtitle="Gestão de Utilizadores"
                                    />
                                </Col>
                                <Col sm="2">
                                    <MenuItems
                                        route="backoffice/explorations"
                                        title="Explorações"
                                        subtitle="Gestão de Explorações"
                                    />
                                </Col>
                                <Col sm="2">
                                    <MenuItems
                                        route="backoffice/explorations"
                                        title="Explorações"
                                        subtitle="Gestão de Explorações"
                                    />
                                </Col>
                                <Col sm="2">
                                    <MenuItems
                                        route="backoffice/explorations"
                                        title="Explorações"
                                        subtitle="Gestão de Explorações"
                                    />
                                </Col>
                            </Row>
                            <Row>
                            <Col sm="2">
                                    <MenuItems
                                        route="backoffice/explorations"
                                        title="Explorações"
                                        subtitle="Gestão de Explorações"
                                    />
                                </Col>
                            </Row>
                        </Container>
                    )
                }}
            </Me>
        )
    }
}
