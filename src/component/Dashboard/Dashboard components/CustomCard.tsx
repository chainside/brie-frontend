import { Card, Typography } from "@mui/material"
import React from "react"
import css from '../Dashboard.module.css'


interface Props {
    title: string,
    value: string,

}

export const CustomCard = (props: Props) => {

    return (
        <Card className={css['card-style']} >

            <Typography variant='h5'>{props.title}</Typography>
            <Typography fontSize={45} fontWeight={500} marginTop={1}>{props.value.replaceAll(',', '.')}</Typography>
        </Card >
    )
}