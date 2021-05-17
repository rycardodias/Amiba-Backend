import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Me from '../components/Me'
import ProfileAddress from '../components/forms/ProfileAddress'
import ProfileChangePassoword from '../components/forms/ProfileChangePassoword'

export default class profile extends React.Component {
    
    render() {
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
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">Dados Utilizador</Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                
                                    <ProfileAddress
                                        id={items.data.id}
                                        name={items.data.name}
                                        surname={items.data.surname}
                                        email={items.data.email}
                                        fiscalNumber={items.data.fiscalNumber}
                                        organization={items.data.organization}
                                        restaurant={items.data.restaurant}
                                        address={items.data.address}
                                        locale={items.data.locale}
                                        zipcode={items.data.zipcode}
                                    />
                                </Accordion.Collapse>
                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">Alterar Palavra-Passe</Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <ProfileChangePassoword
                                        id={items.data.id}
                                    />
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )
                }}
            </Me>

        )
    }
}

