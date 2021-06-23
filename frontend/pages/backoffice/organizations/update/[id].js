import { useRouter } from "next/router";
import OrganizationUpdate from '../../../../components/backoffice/organizations/OrganizationUpdate'
import Me from '../../../../components/Me'

export default function Items(props) {
    const { pathname, query } = useRouter();
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
                    <OrganizationUpdate id={query.id} />
                )
            }
            }

        </Me>
    )
}