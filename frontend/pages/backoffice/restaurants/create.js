import React from 'react'
import RestaurantCreate from '../../../components/backoffice/restaurants/RestaurantCreate'
import Me from '../../../components/Me'
import { useRouter } from 'next/router'

export default function Create(props) {
    const { pathname } = useRouter()
    return (
        <Me url={pathname}>
            {(items, isLoaded, fetch) => {

                if (!isLoaded) {
                    return <p>Loading...</p>
                }
                if (items.error) {
                    return <p>{items.error}</p>
                }
                return (
                    <RestaurantCreate />
                )
            }
            }

        </Me>
    );
}
