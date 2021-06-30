import { useRouter } from "next/router";
import RestaurantUpdate from '../../../../components/backoffice/restaurants/RestaurantUpdate'
import Me from '../../../../components/Me'

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
                    <RestaurantUpdate id={query.id} UserId={items.data.id} />
                )
            }
            }

        </Me>
    )
}