import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import React, { useCallback, useRef, useState } from "react"
import css from "./DocumentIntegration.module.css"
import { docTypesMap } from "../../../../../types/types"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useChangeDocForm, useDetailsDossier } from "../../../../../store/stms/detailDossier/detailsDossier.hook"

export const DocumentIntegration = () => {

    const [error, setError] = useState<boolean>(false)
    const { actionDocument, errorUpload } = useDetailsDossier()
    const { changeDocument, changeDocumentType } = useChangeDocForm()

    const inputFileRef = useRef<HTMLInputElement>(null);

    const pickFile = useCallback(() => {
        inputFileRef.current?.click();
    }, [])

    const changeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            if (e.target.files[0].size <= 10000000) {
                changeDocument(e.target.files[0])
                setError(false)
            }
            else { setError(true) }
        }
    }, [changeDocument])
    return (
        <div className={css["doc-main-panel"]}>
            <div className={css["doc-header"]}>
                <Typography variant='h4' color={'#C2C5DD'}>Integrazione dei documenti</Typography>
                <Typography variant='subtitle1' color={'#C6C5D0'}>La preghiamo cortesemente di integrare i documenti richiesti dalla dogana per poter procedere con la sua pratica.</Typography>
            </div>
            <div className={css['doc-label-row']}>
                <FormControl variant="outlined" fullWidth >
                    <InputLabel htmlFor="outlined-adornment-password">
                        <Typography variant="subtitle1" color={error || errorUpload ? "#FFB4AC" : '#C6C5D0'} >
                            Seleziona il documento
                        </Typography>
                    </InputLabel>
                    <OutlinedInput
                        error={error || errorUpload}
                        label={"Seleziona il documento"}
                        readOnly={true}
                        value={actionDocument ?
                            actionDocument!.document.name : ""
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Seleziona il documento"
                                    edge="end"
                                    onClick={pickFile}
                                    disabled={errorUpload}
                                >
                                    {errorUpload ? < ErrorOutlineOutlinedIcon className={css["error-icon"]} />
                                        :
                                        <AttachFileIcon className={css["gray"]} />
                                    }

                                    <input ref={inputFileRef} onChange={changeFile} type="file" id="input_file" accept=".pdf" className={css["hidden"]} />
                                </IconButton>
                            </InputAdornment>}
                    />
                    <div className={css["form-helper-text"]}>
                        <Typography variant="subtitle2" color={error || errorUpload ? "error" : '#C6C5D0'} marginTop={'8px'} >
                            {error ? "Dimensioni file superate (massimo 10 Mb)" : errorUpload ? "Errore di caricamento" : "formato PDF, massimo 10 Mb"}
                        </Typography>
                    </div>
                </FormControl>
                <FormControl variant="outlined" fullWidth >
                    <InputLabel htmlFor="outlined-adornment-password">
                        <Typography variant="subtitle1" color={'#C6C5D0'}>
                            Tipologia del documento
                        </Typography>
                    </InputLabel>
                    <Select
                        label="Tipolodia del documento"
                        onChange={changeDocumentType}
                    >
                        {Object.keys(docTypesMap).map((key: string) => (
                            <MenuItem
                                key={key}
                                value={key}
                            >
                                {docTypesMap[key]}
                            </MenuItem>))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
