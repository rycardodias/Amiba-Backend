import Meta from './Meta'
import NavigationBar from './NavigationBar'
import React from 'react'
import Container from 'react-bootstrap/Container'

export default class Layout extends React.Component {

    render() {
        return (
            <div >
                <Meta />
                <NavigationBar/>
                <Container style={{paddingTop: "1rem"}}>
                    {this.props.children}
                </Container>

            </div>
        )
    }
}