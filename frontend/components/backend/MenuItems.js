import React from 'react'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'

export default function MenuItems(props) {
    return (
        <Link href={props.route}>
            <Card>
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Link>
    )
}
