import { useRouter } from "next/router";
import MenuUpdate from '../../../../../components/backoffice/restaurants/menus/MenuUpdate'
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
                    <MenuUpdate id={query.id} />
                )
            }
            }

        </Me>
    )
}