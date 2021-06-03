import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MenuItems from './MenuItems'
import { verifyPermission } from '../../lib/permissions'
import { routes } from '../../lib/backofficeRoutes'

import { removeElementStorage, addElementStorage } from '../../lib/storage'

export default class MenuContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stack: [""]
        }
    }

    addElementStack = (route) => {
        const item = [route, ...this.state.stack]

        this.setState({ stack: item })
        addElementStorage('menuStack', item)
        // localStorage.setItem('menuStack', JSON.stringify(item))
    }

    removeElementStack = () => {
        const item = this.state.stack.splice(1)
        this.setState({ stack: item })

        removeElementStorage('menuStack')

        // localStorage.setItem('menuStack', JSON.stringify([item]))
    }

    componentDidMount() {
        const storage = JSON.parse(localStorage.getItem('menuStack'))

        if (storage) {
            if (storage[0] != "") {
                this.setState({ stack: [...storage] })
            }
        }
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
                                        <Col key={index} sm="2" style={{ minWidth: '150px' }} onClick={() => this.addElementStack(value.nextLevel)}>
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
                            <Col key={1} sm="2" style={{ minWidth: '150px' }}
                                onClick={() => this.removeElementStack()}>
                                <MenuItems route="" title="Voltar" subtitle="" />
                            </Col>
                        }


                    </>
                </Row >
            </Container >
        )
    }
}