import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getRestaurants } from '../../../../lib/requests/restaurantsRequests'
import { createMenu } from '../../../../lib/requests/menusRequests'
import Router from 'next/router'
import { TitleAndBack } from '../../TitleAndBack'
export default class MenuCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            RestaurantId: "",
            title: "",
            description: "",
            image: "",
            active: true,
            isButtonDisabled: true,
            restaurantsData: []
        }
    }

    componentDidMount() {
        this.getRestaurants()
    }

    getRestaurants = async () => {
        const restaurants = (await getRestaurants()).data.data
        if (restaurants) {
            this.setState({
                restaurantsData: restaurants,
                RestaurantId: restaurants[0].id
            })
        }
    }

    createMenu = async () => {
        const { RestaurantId, title, description, image } = this.state
        const res = await createMenu(RestaurantId, title, description, image)

        if (res.data.error) {
            alert(res.data.error)
            console.log("err:", res.data.err)
        } else {
            Router.push('/backoffice/restaurants/menus/list', null, { shallow: true })
        }
    };

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { RestaurantId, title, description, image } = this.state

        if (RestaurantId && title && description && image) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { RestaurantId, title, description, image, isButtonDisabled, restaurantsData } = this.state
        return (
            <>
                <TitleAndBack backLink="/backoffice/restaurants/menus" title="Criar Menu"></TitleAndBack>

                <Form >
                    <Form.Group controlId="title" >
                        <Form.Label >Titulo</Form.Label>
                        <Form.Control name="title" value={title} onChange={this.saveToState} placeholder="Inserir titulo" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control name="description" value={description} onChange={this.saveToState} placeholder="Descrição" />
                    </Form.Group>

                    <Form.Group controlId="RestaurantId">
                        <Form.Label>Restaurante</Form.Label>
                        <Form.Control as="select" name="RestaurantId" onChange={this.saveToState} placeholder="Inserir Restaurante" >
                            {
                                restaurantsData.map((item) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })
                            }
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId="image">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control name="image" value={image} onChange={this.saveToState} placeholder="Imagem" />
                    </Form.Group>

                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.createMenu} disabled={isButtonDisabled}>Adicionar Tipo Organização</Button>
                    </div>
                </Form>
            </>
        )
    }
}
