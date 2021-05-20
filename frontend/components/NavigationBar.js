import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Login from './Login'
import Me from './Me';
import { logout } from '../lib/users/userRequests'

export default class NavigationBar extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar fixed="top" />
                    <Link href="/" passHref><Navbar.Brand>AMIBA</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link href="/association" passHref><Nav.Link>A Associação</Nav.Link></Link>
                            <Link href="/events" passHref><Nav.Link >Eventos/Noticias</Nav.Link></Link>
                            <Link href="/contacts" passHref><Nav.Link >Contactos</Nav.Link></Link>
                            <Me>
                                {(items, isLoaded, fetch) => {
                                    if (!isLoaded) {
                                        return <p></p>
                                    }
                                    if (items.error) {
                                        return <Login refetch={fetch} />
                                    }
                                    if (items.data.id) {
                                        return (
                                            <>
                                                <Link href="/profile" passHref><Nav.Link>Perfil</Nav.Link></Link>
                                                <Link href="/backoffice" passHref><Nav.Link>Backoffice</Nav.Link></Link>
                                                <Link href="/" passHref><Nav.Link onClick={() => { logout(); fetch(); }}>Sair</Nav.Link></Link>
                                            </>)
                                    }
                                }}
                            </Me>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}