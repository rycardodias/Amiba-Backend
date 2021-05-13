import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Login from './Login'
import Me from './Me';
import { logout } from './lib/requests'
import Signout from './Signout'

export default class NavigationBar extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         isLoggedIn: false
    //     }
    // }

    // handleLogin = () => {
    //     this.setState({ isLoggedIn: !this.state.isLoggedIn })
    //     this.props.handleLogin()
    // }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar fixed="top" />
                    <Link href="/" passHref><Navbar.Brand>AMIBA</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link href="/associacao" passHref><Nav.Link>A Associação</Nav.Link></Link>
                            <Link href="/eventos" passHref><Nav.Link >Eventos/Noticias</Nav.Link></Link>
                            <Link href="/contactos" passHref><Nav.Link >Contactos</Nav.Link></Link>

                            <Me>
                                {(items, isLoaded, fetch) => {
                                    if (!isLoaded) {
                                        return <p>Loading...</p>
                                    }
                                    if (items.error) {
                                        return <Login /*handleLogin={this.handleLogin}*/ refetch={fetch} />
                                    }


                                    if ( items.data.id) {
                                        return (<>
                                            {/* <Signout refetch={fetch} /> */}
                                            <Nav.Link href="/perfil" passHref>Perfil</Nav.Link>
                                            <Nav.Link href="/backoffice" passHref>Backoffice</Nav.Link>
                                            <Nav.Link onClick={() => {
                                                // this.props.handleLogout()
                                                logout()
                                                fetch()
                                            }}>Sair</Nav.Link>
                                        </>)
                                    }
                                    return <p></p>

                                } }
                            </Me>

                            {/* {this.props.isLoggedIn
                                ? <Nav.Link onClick={() => {this.props.handleLogout() 
                                    logout()}}>Sair</Nav.Link>
                                : <Login handleLogin={this.handleLogin} />
                            } */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}