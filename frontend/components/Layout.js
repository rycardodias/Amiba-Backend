import Meta from './Meta'
import NavigationBar from './NavigationBar'
import React from 'react'

export default class Layout extends React.Component {

    render() {
        return (
            <>
                <Meta />
                <NavigationBar/>
                <div>
                    {this.props.children}
                </div>

            </>
        )
    }
}