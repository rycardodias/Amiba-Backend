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
            // currentRoute: "",
            // previousRoute: "",
            stack: [""]
        }
    }

    addElement = (route) => {
        // this.setState({stack: this.state.stack.concat(route)})
        this.setState({ stack: [route, ...this.state.stack] })
    }

    removeElement = () => {
        this.setState({ stack: this.state.stack.splice(1) })
    }

    render() {
        return (
            <Container>
                <Row>
                    <>
                        {
                            routes.map((value, index) => {
                                if (verifyPermission(value.permission, this.props.permissions) && (value.previousLevel === this.state.stack[0])) {
                                    return (
                                        <Col key={index} sm="2" style={{ minWidth: '150px' }} onClick={() => this.addElement(value.nextLevel)}>
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
                        {(this.state.stack[0] === "") ? null :
                            <Col key={1} sm="2" style={{ minWidth: '150px' }} onClick={() => this.removeElement()}>
                                <MenuItems route="" title="Voltar" subtitle="" />
                            </Col>
                        }


                    </>
                </Row >
            </Container >
        )
    }
}