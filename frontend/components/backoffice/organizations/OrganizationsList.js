import React from 'react'
import Link from 'next/link'
import Table from 'react-bootstrap/Table'
export default class OrganizationsList extends React.Component {
    render() {
        return (
                
                <Table responsive>
                    <thead>
                        <tr key="0">
                            <th key="0">#</th>
                            <th key="1">Tipo</th>
                            <th key="2">Nome</th>
                            <th key="3">Morada</th>
                            <th key="4">Localidade</th>
                            <th key="5">Código-Postal</th>
                            <th key="6">Telefone</th>
                            <th key="7">Telemovel</th>
                            <th key="8">NIF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((organization, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{organization.OrganizationType.name}</td>
                                    <td>{organization.name}</td>
                                    <td>{organization.adress}</td>
                                    <td>{organization.locale}</td>
                                    <td>{organization.zipcode}</td>
                                    <td>{organization.telephone}</td>
                                    <td>{organization.mobilePhone}</td>
                                    <td>{organization.fiscalNumber}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
        )
    }
}