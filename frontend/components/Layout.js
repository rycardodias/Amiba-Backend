import Meta from './Meta'
import NavigationBar from './NavigationBar'
import React from 'react'
import Me from './Me';

export default class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false
        }
    }

    // handleLogout = () => {
    //     this.setState({ isLoggedIn: false })
    //     // Cookies.set('token', '');
    // }

    // handleLogin = () => {
    //     this.setState({ isLoggedIn: true })
    // }

    render() {
        return (
            <>
                <Meta />
                <NavigationBar 
                    // isLoggedIn={this.state.isLoggedIn} 
                    // handleLogout={this.handleLogout} 
                    // handleLogin={this.handleLogin} 
                />
                <div>
                    {this.props.children}
                </div>

            </>
        )
    }
}