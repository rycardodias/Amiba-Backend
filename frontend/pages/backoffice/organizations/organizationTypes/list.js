import Me from '../../../../components/Me'
import OrganizationList from '../../../../components/backoffice/organizations/organizationTypes/OrganizationTypesList'
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
                    <OrganizationList />
                )
            }
            }
        </Me >
    )
}
