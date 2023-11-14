import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import css from "./CustomAlert.module.css"

interface Props {
    show: boolean,
    onClose: ((event: React.SyntheticEvent<Element, Event>) => void),
    children?: React.ReactNode;
}

export function CustomAlert(props: Props) {

    if (!props.show) {
        return <></>
    }
    else {
        return (
            <Stack className={css['stack']}>
                <Alert
                    icon={<CheckIcon fontSize="inherit" className={css['icon']} />}
                    onClose={props.onClose}
                    className={css['alert']}
                >
                    {props.children}
                </Alert>
            </Stack>
        );
    }
}