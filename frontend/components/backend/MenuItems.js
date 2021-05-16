import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'

export default function MenuItems(props) {
    return (
        <Link href={props.route}>
            <Card style={{ width: '15rem' }}>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Link>
    )
}
