import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getCertificationId, updateCertifications, deleteCertification } from '../../../../lib/requests/certificationsRequests'
import Router from 'next/router'
import { TitleAndBack } from '../../TitleAndBack'

export default class OrganizationUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            ExplorationId: "",
            ExplorationIdName: "",
            certificationCode: "",
            initialDate: "",
            finalDate: "",
            description: "",
            isButtonDisabled: true,
            explorations: []
        }
    }

    componentDidMount() {
        this.getCertification()
    }


    getCertification = async () => {
        const certification = (await getCertificationId(this.props.id)).data.data
        if (certification) {
            this.setState({
                id: certification.id,
                ExplorationId: certification.ExplorationId,
                ExplorationIdName: certification.Exploration.name,
                certificationCode: certification.certificationCode,
                initialDate: certification.initialDate,
                finalDate: certification.finalDate,
                description: certification.description,
                isButtonDisabled: false
            })
        } else {
            Router.push('/backoffice/explorations/certifications/list', null, { shallow: true })
        }
    }


    updateCertifications = async () => {
        const { id, ExplorationId, certificationCode, initialDate, finalDate, description } = this.state

        if (id && ExplorationId && certificationCode && initialDate && finalDate) {
            const res = await updateCertifications(id, ExplorationId, certificationCode, initialDate, finalDate, description)
            if (res.data.error) {
                alert(res.data.error)
                console.log(res.data.err)
                return
            }
            Router.push('/backoffice/explorations/certifications/list', null, { shallow: true })
        } else {
            alert("Erro! Existem campos inválidos!")
        }

    };

    deleteCertification = async () => {
        const { id } = this.state

        const res = (await deleteCertification(id)).data
        if (res.error) {
            alert(res.error)
        } else {
            Router.push('/backoffice/explorations/certifications/list', null, { shallow: true })
        }
    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { id, ExplorationId, certificationCode, initialDate, finalDate, description } = this.state

        if (id && ExplorationId && certificationCode && initialDate && finalDate) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { id, ExplorationId, ExplorationIdName, certificationCode, initialDate, finalDate, description, isButtonDisabled } = this.state


        return (
            <>
                <TitleAndBack backLink="/backoffice/explorations/certifications/list" title="Alterar Certificação" />

                <Form>
                    <Form.Group controlId="certificationCode" >
                        <Form.Label >Código</Form.Label>
                        <Form.Control name="certificationCode" value={certificationCode} onChange={this.saveToState} placeholder="Inserir código" />
                    </Form.Group>
                    <Form.Group controlId="ExplorationId" >
                        <Form.Label >Exploração</Form.Label>
                        <Form.Control disabled name="ExplorationId" value={ExplorationIdName} />
                    </Form.Group>


                    <Form.Group controlId="initialDate">
                        <Form.Label>Data Início</Form.Label>
                        <Form.Control name="initialDate" type="date" value={initialDate} onChange={this.saveToState} placeholder="Data Início" />
                    </Form.Group>
                    <Form.Group controlId="finalDate">
                        <Form.Label>Data Fim</Form.Label>
                        <Form.Control name="finalDate" type="date" value={finalDate} onChange={this.saveToState} placeholder="Data Fim" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control name="description" value={description} onChange={this.saveToState} placeholder="Inserir Descrição" />
                    </Form.Group>
                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.updateCertifications} disabled={isButtonDisabled}>Modificar Certificação</Button>
                        <Button variant="outline-danger" onClick={this.deleteCertification} disabled={isButtonDisabled}>Eliminar Certificação</Button>
                    </div>
                </Form >
            </>
        )
    }
}
