import Me from '../../../../components/Me'
import { RoutesList } from '../../../../components/backoffice/RoutesList'
import { useRouter } from 'next/router'
import { TitleAndBack } from '../../../../components/backoffice/TitleAndBack'
export default function Index() {
    const { pathname } = useRouter()
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
                    <>
                        <TitleAndBack backLink="/backoffice/explorations" title="Menu de Tipos de Explorações" />
                        <RoutesList title="Tipos de Explorações" permission={items.data.permission} route={pathname} previousRoute="/backoffice/explorations" />
                    </>
                )
            }
            }
        </Me >
    )

}
