import Meta from './Meta'
import NavigationBar from './NavigationBar'
import Login from './Login'
import React from 'react'
import Cookies from 'js-cookie';
import Me from './Me';

// function logout() {
//     this.setState({ isLoggedIn: false })
// }

export default class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false
        }
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false })
        Cookies.set('token', '');
    }

    handleLogin = () => {
        this.setState({ isLoggedIn: true })
    }

    render() {
        return (
            <>
                <Meta />
                <NavigationBar isLoggedIn={this.state.isLoggedIn} handleLogout = {this.handleLogout} handleLogin = {this.handleLogin} />
                <div>
                    {this.props.children}
                </div>
            </>
        )
    }
}