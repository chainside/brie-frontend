
import { Button, Dialog, Typography } from "@mui/material"
import css from "./GenericErrorPage.module.css"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React, { useMemo } from 'react';
import { useCreateDossier } from "../../../store/stms/dossier/dossier.hook";
import { Pages } from "../../MainPanel/Pages";
import { useDetailsDossier } from "../../../store/stms/detailDossier/detailsDossier.hook";
import { useLogin } from "../../../store/stms/login/login.hook";
import { useDashboard } from "../../../store/stms/dasboard/dashboard.hook";

interface Props {
    retrySelector: Pages
}

export const GenericErrorPage = (props: Props) => {
    const { retryLogin } = useLogin()
    const { retryLoading } = useCreateDossier()
    const { retryDetail } = useDetailsDossier()
    const { retryDashboard } = useDashboard()
    const retry = useMemo(() => {
        switch (props.retrySelector) {
            case (Pages.pr42):
                return (retryLoading)
            case (Pages.prd4Details):
                return (retryDetail)
            case (Pages.dashboard):
                return (retryDashboard)
            default:
                return (retryLogin)
        }
    }, [props])

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
            <div className={css["error-row"]}>
                <Button
                    variant="contained"
                    type="button"
                    color="primary"
                    className={css["error-button"]}
                    onClick={retry}>Riprova</Button>
            </div>
        </Dialog >
    )
}

