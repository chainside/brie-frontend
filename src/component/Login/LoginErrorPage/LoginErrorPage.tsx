
import { Button, Typography } from "@mui/material"
import css from "./LoginErrorPage.module.css"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React from 'react';
import { useLogin } from "../../../store/stms/login/login.hook";

export const LoginErrorPage = () => {
    const { toLogin } = useLogin()

    return (
        <div className={css["error-page-background"]}>
            <div className={css["error-page-card"]}>
                <div className={css["error-card-content"]}>
                    <ErrorOutlineOutlinedIcon className={css["error-icon"]} fontSize="large" />

                    <div >
                        <Typography variant="h2" marginBottom={'16px'} textAlign={'center'} marginTop={"20px"}>Si è verificato un errore</Typography>
                        <Typography variant="subtitle1" color={'#C8C6CA99'} textAlign={'center'} marginBottom={'20px'}>A causa di un problema tecnico al momento non è possibile effettuare il login. Riprova più tardi.</Typography>
                    </div>
                    <Button
                        variant="contained"
                        type="button"
                        color="primary"

                        onClick={toLogin}>Torna alla pagina di Login </Button>

                </div>
            </div>

        </div >
    )
}

