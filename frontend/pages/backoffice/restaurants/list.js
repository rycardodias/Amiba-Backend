import React from 'react'
import Me from '../../../components/Me'
import RestaurantList from '../../../components/backoffice/restaurants/RestaurantList'
import { useRouter } from 'next/router'

export default function List() {
    const {pathname} = useRouter()
    return (
        <Me url={pathname} >
            {(items, isLoaded, fetch) => {

                if (!isLoaded) {
                    return <p>Loading...</p>
                }
                if (items.error) {
                    return <p>{items.error}</p>
                }
                return (
                    <RestaurantList />
                )
            }
            }
        </Me >
    )
}
