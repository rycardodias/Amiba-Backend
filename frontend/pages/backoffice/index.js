import React, { Component } from 'react'
import Me from '../../components/Me'
import MenuContainer from '../../components/backend/MenuContainer'

export default class Index extends Component {

    handleChange = () => {

    }
    render() {
        return (
            <Me>
                {(items, isLoaded, fetch) => {

                    if (!isLoaded) {
                        return <p>Loading...</p>
                    }
                    if (items.error) {
                        return <p>{items.error}</p>
                    }

                    return (
                        <MenuContainer permissions={items.data.permission} />
                    )
                }}
            </Me>
        )
    }
}
