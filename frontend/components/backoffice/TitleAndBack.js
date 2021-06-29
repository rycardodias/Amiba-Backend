import React from 'react'
import { BsArrow90DegLeft } from 'react-icons/bs'
import Link from 'next/link'

export const TitleAndBack = (props) => {
    return (
        <h4 style={{ display: 'inline-block' }}>
            <Link href={props.backLink}><BsArrow90DegLeft /></Link>
            {props.title}
        </h4>
    )
}

