import Me from '../../components/Me'
import { RoutesList } from '../../components/backoffice/RoutesList'
import { useRouter } from 'next/router'

export default function Index() {
    const route = useRouter()

    return (
        <Me url={route.pathname}>
            {(items, isLoaded, fetch) => {
                if (!isLoaded) {
                    return <p>Loading...</p>
                }
                if (items.error) {
                    return <p>{items.error}</p>
                }
                return (
                    <RoutesList permission={items.data.permission} route={route.pathname} previousRoute="" />
                )
            }
            }
        </Me >
    )

}
