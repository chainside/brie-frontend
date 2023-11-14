import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import css from './Dialog.module.css'
import React, { MouseEventHandler } from 'react';

interface Props {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    title: string,
    text: string,
    onConfirm: MouseEventHandler<HTMLButtonElement>
}

export const CustomDialog = (props: Props) => {
    return (
        <Dialog
            className={css["dashboard-profile-dialog"]}
            open={props.open}

            slotProps={{
                backdrop: {
                    className: css["backdrop-custom-dialog"]
                }
            }
            }
        >
            <DialogTitle className={css["dashboard-profile-dialog-title"]} id="alert-dialog-title">
                <Typography variant="h3">{props.title}</Typography>
            </DialogTitle>
            <DialogContent className={css["dashboard-profile-dialog-content"]}>
                <Typography variant="body2" color={"#C8C6CADE"} >{props.text}</Typography>
            </DialogContent>
            <DialogActions className={css["dashboard-profile-dialog-content"]}>
                <div className={css["dashboard-profile-dialog-actions-container"]}>
                    <Button color="primary" onClick={props.onClose}>Annulla</Button>
                    <Button color="primary" onClick={props.onConfirm} autoFocus>Conferma</Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}