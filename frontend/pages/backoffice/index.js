import Me from '../../components/Me'
import { RoutesList } from '../../components/backoffice/RoutesList'
import { useRouter } from 'next/router'

export default function Index() {
    const {pathname} = useRouter()

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
                    <RoutesList permission={items.data.permission} route={pathname} previousRoute="" />
                )
            }
            }
        </Me >
    )

}
