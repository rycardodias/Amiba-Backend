import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Login from './Login'

export default class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false
        }
    }

    handleLogin = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
        this.props.handleLogin()
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar fixed="top" />
                    <Link href="/" passHref><Navbar.Brand>AMIBA</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link href="associacao" passHref><Nav.Link>A Associação</Nav.Link></Link>
                            <Link href="eventos" passHref><Nav.Link >Eventos/Noticias</Nav.Link></Link>
                            <Link href="contactos" passHref><Nav.Link >Contactos</Nav.Link></Link>

                            {this.props.isLoggedIn
                                ? <Nav.Link onClick={() => this.props.handleLogout()}>Sair</Nav.Link>
                                : <Login handleLogin={this.handleLogin} />
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}