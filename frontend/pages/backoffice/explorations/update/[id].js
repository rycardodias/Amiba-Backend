import { useRouter } from "next/router";
import ExplorationUpdate from '../../../../components/backoffice/explorations/ExplorationUpdate'
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
                    <ExplorationUpdate id={query.id} UserId={items.data.id} />
                )
            }
            }

        </Me>
    )
}