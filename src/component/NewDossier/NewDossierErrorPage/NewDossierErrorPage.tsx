
import { Button, Dialog, Typography } from "@mui/material"
import css from "./NewDossierErrorPage.module.css"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React, { useCallback } from 'react';
import { useCreateDossier } from "../../../store/stms/dossier/dossier.hook";
import { useNavigate } from "react-router-dom";


export const NewDossierErrorPage = () => {
    const { retry } = useCreateDossier()
    const navigate = useNavigate()
    const toDossierList = useCallback(() => { navigate('/pr42') }, [])
    return (
        <Dialog open={true} PaperProps={{
            className: css["transparent-dialog"]
        }}>
            <div>
                <Typography className={css["text-with-icon"]} variant="h4" marginBottom={'16px'} color={'#FFB4AC'} textAlign={'center'}>
                    <ErrorOutlineOutlinedIcon className={css["error-icon"]} fontSize="medium" />
                    Caricamento fallito
                </Typography>
            </div>
            <Typography variant="subtitle1" color={'#C8C6CA99'} textAlign={'center'}>
                Caricamento fallito a causa di un problema tecnico. Si prega di riprovare.
            </Typography>
            <div className={css["button-container"]}>
                <Button
                    fullWidth
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={retry}>Riprova</Button>
                <Button
                    fullWidth
                    variant="outlined"
                    type="button"
                    color="primary"
                    onClick={toDossierList}>Torna alla lista pratiche</Button>
            </div>
        </Dialog>
    )
}

