import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createCertification } from '../../../../lib/requests/certificationsRequests'
import { getExplorations } from '../../../../lib/requests/explorationsRequests'
import Router from 'next/router'
import { TitleAndBack } from '../../TitleAndBack'
export default class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ExplorationId: undefined,
            certificationCode: undefined,
            initialDate: undefined,
            finalDate: undefined,
            description: undefined,
            isButtonDisabled: true,
            explorations: []
        }
    }

    componentDidMount() {
        this.getExplorations()
    }

    getExplorations = async () => {
        const explorations = (await getExplorations()).data.data
        console.log(explorations)
        if (explorations.length > 0) {
            this.setState({
                explorations: explorations,
                ExplorationId: explorations[0].id,
            })
        }
    }

    createCertification = async () => {
        const { ExplorationId, certificationCode, initialDate, finalDate, description } = this.state
        const res = await createCertification(ExplorationId, certificationCode, initialDate, finalDate, description)

        if (res.data.error) {
            alert(res.data.error)
            console.log("err:", res.data.err)
        } else {
            Router.push('/backoffice/explorations/certifications/list', null, { shallow: true })
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { ExplorationId, certificationCode, initialDate, finalDate, description } = this.state

        if (ExplorationId && certificationCode && initialDate && finalDate) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { ExplorationId, certificationCode, initialDate, finalDate, description, isButtonDisabled, explorations } = this.state

        return (

            <>

                <TitleAndBack backLink="/backoffice/explorations/certifications" title="Criar Certificação" />
                <Form >
                    <Form.Group controlId="certificationCode" >
                        <Form.Label >Código</Form.Label>
                        <Form.Control name="certificationCode" value={certificationCode} onChange={this.saveToState} placeholder="Inserir código" />
                    </Form.Group>
                    <Form.Group controlId="ExplorationId">
                        <Form.Label>Exploração</Form.Label>
                        <Form.Control as="select" name="ExplorationId" onChange={this.saveToState} placeholder="Exploração" >
                            {
                                explorations.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
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
                        <Button variant="outline-success" onClick={this.createCertification} disabled={isButtonDisabled}>Adicionar Tipo Organização</Button>
                    </div>
                </Form>
            </>
        )
    }
}
