import React from 'react'
import Me from '../components/Me'

const associacao = () => {
    return (
        <>
            <Me>
                {(items, isLoaded, fetch) => {
                    if (!isLoaded) {
                        return <p>Loading.</p>
                    }
                    if (items.error) {
                        return (<h1>error</h1>)
                    }
                    if (isLoaded) {
                        return (
                        <h1>A Associação</h1>
                        )
                    }

                }}
            </Me>
        </>
    )
}

export default associacao