import { useRouter } from "next/router";
import ExplorationTypesUpdate from '../../../../../components/backoffice/explorations/explorationTypes/ExplorationTypesUpdate'
import Me from '../../../../../components/Me'

export default function Update(props) {
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
                    <ExplorationTypesUpdate id={query.id} />
                )
            }
            }

        </Me>
    )
}