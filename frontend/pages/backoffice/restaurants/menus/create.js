import React from 'react'
import MenuCreate from '../../../../components/backoffice/restaurants/menus/MenuCreate'
import Me from '../../../../components/Me'
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
                    <MenuCreate />
                )
            }
            }

        </Me>
    );
}
