import { Popper } from "@mui/material"
import React from 'react';

export const CustomPopper = function (props: any) {
    return (<Popper {...props} placement='bottom' />)
}