import { useRouter } from "next/router";
import OrganizationUpdate from '../../../../components/backoffice/organizations/OrganizationUpdate'

export default function Items(props) {
    const { query } = useRouter();
    return (
        
        <OrganizationUpdate id={query.id} />
    );
}