import React, { Component } from 'react'
import Me from '../../components/Me'

export default class Index extends Component {
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
                        <h1>Backoffice</h1>
                    )
                }}
            </Me>
        )
    }
}
