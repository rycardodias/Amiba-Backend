import { useRouter } from "next/router";
import Update from '../../../../components/backoffice/organizations/Update'

export default function Items(props) {
    const { query } = useRouter();
    return (
        
        <Update id={query.id} />
    );
}