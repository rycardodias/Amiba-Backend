import React from 'react'
import OrganizationCreate from '../../../components/backoffice/organizations/OrganizationCreate'
import Me from '../../../components/Me'
import { routes } from '../../../lib/backofficeRoutes'
import { verifyPermission } from '../../../lib/permissions'
import Router from 'next/router'

export default function Create(props) {

    return (
        <Me>
            {(items, isLoaded, fetch) => {

                if (!isLoaded) {
                    return <p>Loading...</p>
                }
                if (items.error) {
                    return <p>{items.error}</p>
                }

                return (
                    <OrganizationCreate />
                )

            }
            }

        </Me>
    );
}
