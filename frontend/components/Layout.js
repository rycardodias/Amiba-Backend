import Meta from './Meta'
import NavigationBar from './NavigationBar'
import Login from './Login'
import React from 'react'

// function logout() {
//     this.setState({ isLoggedIn: false })
// }

export default class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: true
        }
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false })
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
                    {this.state.isLoggedIn ? <h3>Logado</h3>: <h3>Deslogado</h3>}
                    {this.props.children}
                </div>
            </>
        )
    }
}

// const Layout = ({ children }) => {
//     return (
//         <>
//             <Meta />
//             <NavigationBar />
//             <div>
//                 {children}
//             </div>
//         </>
//     )
// }

// export default Layout
