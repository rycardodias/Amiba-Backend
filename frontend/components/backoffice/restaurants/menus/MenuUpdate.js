import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getMenuId, deleteMenu, updateMenu } from '../../../../lib/requests/menusRequests'
import Router from 'next/router'
import { TitleAndBack } from '../../TitleAndBack'

const componentName = 'Menu'
const backURL = '/backoffice/restaurants/menus/list'

export default class MenuUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            RestaurantId: "",
            RestaurantName: "",
            title: "",
            description: "",
            image: "",
            active: true,
            isButtonDisabled: true,
        }        
    }

    
    componentDidMount() {
        this.getRecord()
    }


    getRecord = async () => {
        const menu = (await getMenuId(this.props.id)).data.data
        if (menu) {
            this.setState({
                id: menu.id,
                RestaurantId: menu.RestaurantId,
                RestaurantName: menu.Restaurant.name,
                title: menu.title,
                description: menu.description,
                image: menu.image,
                active: menu.active
            })
        } else {
            Router.push(backURL, null, { shallow: true })
        }
    }


    update = async () => {
        const { id, RestaurantId, title, description, image, active, isButtonDisabled } = this.state

        const res = await updateMenu(id, RestaurantId, title, description, image, active)
        // alert(res.data.data)
        if (res.data.error) {
            alert(res.data.error)
            console.log(res.data.err)
            return
        }
        Router.push(backURL, null, { shallow: true })
    };

    delete = async () => {
        const { id } = this.state

        const res = (await deleteMenu(id)).data
        if (res.error) {
            alert(res.error)
        } else {
            Router.push(backURL, null, { shallow: true })
        }

    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value }, this.verifyNulls);
    };

    verifyNulls = () => {
        const { id, RestaurantId, title, description, image } = this.state

        if (id && RestaurantId && title && description) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    render() {
        const { id, RestaurantId, RestaurantName, title, description, image, active, isButtonDisabled } = this.state
        return (
            <>
                <TitleAndBack backLink={backURL} title={`Alterar ${componentName}`} />
                <Form>
                    <Form.Group controlId="RestaurantName" >
                        <Form.Label >Nome</Form.Label>
                        <Form.Control disabled name="RestaurantName" value={RestaurantName} onChange={this.saveToState} placeholder="Inserir Nome Restaurante" />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control name="title" value={title} onChange={this.saveToState} placeholder="Inserir titulo" />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control name="description" value={description} onChange={this.saveToState} placeholder="Descrição" />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control name="image" value={image} onChange={this.saveToState} placeholder="Imagem" />
                    </Form.Group>

                    <div style={{ marginTop: '0.5rem' }}>
                        <Button variant="outline-success" onClick={this.update} disabled={isButtonDisabled}>Alterar {componentName}</Button>
                        <Button variant="outline-danger" onClick={this.delete} disabled={isButtonDisabled}>Eliminar {componentName}</Button>
                    </div>
                </Form >
            </>
        )
    }
}
