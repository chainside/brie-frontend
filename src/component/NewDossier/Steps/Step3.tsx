import { Typography } from '@mui/material';
import css from './Steps.module.css'
import React, { useState, useCallback } from 'react';
import { AddFile } from './StepComponents/AddFile';
import { ShowFile } from './StepComponents/ShowFile';
import { useCreateDossier } from '../../../store/stms/dossier/dossier.hook';

export function Step3() {
    const { clearTempDoc, updateDocuments, errorUpload, uploading, resetErrors } = useCreateDossier()

    const [addFile, setAddFile] = useState(false)
    const showAddFile = useCallback(() => {
        clearTempDoc()
        setAddFile(true)
    }, [])

    const hideAddFile = useCallback(() => {
        setAddFile(false)
        resetErrors()
        clearTempDoc()
    }, [])

    const updateDocs = useCallback(() => {
        updateDocuments()
        setAddFile(false && !errorUpload)
    }, [])

    return (
        <>

            <div className={css["step-main-panel"]}>
                <div className={css["step-header"]}>
                    <Typography variant='h4' color={'#C2C5DD'}>Documenti per avvio pratica</Typography>
                    <Typography variant='subtitle1' color={'#C6C5D0'}>Caricare i documenti doganali (bolla doganale, fattura commerciale, lettere di vettura, lista di imballaggio,
                        certificato d’origine, altro tipo di documento) nella terza fase. Dopo l’approvazione doganale,
                        i documenti caricati saranno notarizzati su blockchain per garantirne autenticità e integrità.</Typography>
                </div>
                {!addFile && !uploading && !errorUpload ?
                    <ShowFile onClick={showAddFile} />
                    :
                    <AddFile onCancel={hideAddFile} onSave={updateDocs} />

                }
            </div >

        </>
    );
}