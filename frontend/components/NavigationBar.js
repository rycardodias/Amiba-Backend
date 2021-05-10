import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Login from './Login'
import Layout from './Layout'

export default class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false
        }
    }

    handleLogin = () => {
        this.setState({ isLoggedIn: true })
        this.props.handleLogin()
    }

    render() {
        return (
            <>
                {this.state.isLoggedIn ? <h1>ligado</h1> : <h1>Desligado</h1>}
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar fixed="top" />
                    <Link href="/" passHref><Navbar.Brand>AMIBA</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link href="associacao" passHref><Nav.Link>A Associação</Nav.Link></Link>
                            <Link href="eventos" passHref><Nav.Link >Eventos/Noticias</Nav.Link></Link>
                            <Link href="contactos" passHref><Nav.Link >Contactos</Nav.Link></Link>
                        </Nav>
                        <Nav >
                            {this.props.isLoggedIn
                                ? <Nav.Link onClick={() => this.props.handleLogout()}>Sair</Nav.Link>
                                : <Nav.Link onClick={ <Login handleLogin={this.handleLogin}></Login>}>Entrar</Nav.Link> 
                                //  />
                                }
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}






