
import { Button, Typography } from "@mui/material"
import css from "./NewDossierErrorPage.module.css"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React, { useCallback } from 'react';
import { useCreateDossier } from "../../../store/stms/dossier/dossier.hook";
import { useNavigate } from "react-router-dom";


export const NewDossierUploadErrorPage = () => {
    const { retry } = useCreateDossier()
    const navigate = useNavigate()
    const toDossierList = useCallback(() => { navigate('/pr42') }, [])
    return (
        <div className={css["error-page-background"]}>
            <div className={css["error-page-card"]}>
                <div className={css["error-card-content"]}>
                    <ErrorOutlineOutlinedIcon className={css["error-icon"]} fontSize="large" />

                    <div>
                        <Typography variant="h2" marginBottom={'16px'} textAlign={'center'}>Errore di caricamento</Typography>
                        <Typography variant="subtitle1" color={'#C8C6CA99'} textAlign={'center'}>Caricamento fallito a causa di un problema tecnico. Si prega di riprovare o selezionare l’altro documento</Typography>
                    </div>
                    <Button
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={retry}>Riprova</Button>
                    <Button
                        variant="outlined"
                        type="button"
                        color="primary"
                        onClick={toDossierList}>Chiudi</Button>

                </div>
            </div>

        </div >
    )
}

