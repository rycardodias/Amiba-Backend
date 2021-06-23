import React, { Component } from 'react'
import Me from '../../components/Me'
import { RoutesList } from '../../components/backoffice/RoutesList'

export default class Index extends Component {
    render() {
        return (
            <Me url="backoffice">
                {(items, isLoaded, fetch) => {

                    if (!isLoaded) {
                        return <p>Loading...</p>
                    }
                    if (items.error) {
                        return <p>{items.error}</p>
                    }
                    return (
                        <RoutesList permission={items.data.permission} route="" previousRoute="" />
                    )
                }
                }
            </Me >
        )
    }
}
