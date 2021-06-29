import { useRouter } from "next/router";
import CertificationUpdate from '../../../../../components/backoffice/explorations/certifications/CertificationUpdate'
import Me from '../../../../../components/Me'

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
                    <CertificationUpdate id={query.id} />
                )
            }
            }

        </Me>
    )
}