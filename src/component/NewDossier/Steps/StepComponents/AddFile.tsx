import { Button, Card, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material"
import React, { useCallback, useState } from "react"
import { getEnumValue } from "../../../../utils/utils"
import { DocTypes, docTypesMap } from "../../../../types/types"
import css from '../Steps.module.css'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { } from "../../../../store/stms/dossier/dossier.events"
import { useCreateDossier } from "../../../../store/stms/dossier/dossier.hook"
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props {
    onCancel: React.MouseEventHandler<HTMLButtonElement>,
    onSave: React.MouseEventHandler<HTMLButtonElement>
}
export function AddFile(props: Props) {
    const { changeDoc, changeDocType, tempDocument, errorUpload, uploading } = useCreateDossier()
    const [error, setError] = useState<boolean>(false)
    const pickFile = () => {
        document.getElementById('input_file')?.click();
    }

    const changeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            if (e.target.files[0].size <= 10000000) {
                changeDoc(e.target.files[0])
                setError(false)
            }
            else { setError(true) }
        }
    }, [changeDoc])

    const changeType = useCallback((e: SelectChangeEvent<HTMLInputElement>) => {
        changeDocType(e.target.value as DocTypes)
    }, [changeDocType])
    return (
        <Card className={css["stepDocument-card"]}>
            <div className={css["stepDocument-card-content"]}>
                <div>
                    <Typography variant='h4' color={'#C2C5DD'}>Aggiungi un documento</Typography>
                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                        e.g. bolla doganale / fattura commerciale / documento del trasporto / certificato di origine ecc
                    </Typography>
                </div>
                <div className={css["stepDocument-card-select"]}>

                    <FormControl variant="outlined" fullWidth >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={error || errorUpload ? "#FFB4AC" : '#C6C5D0'} >
                                Seleziona il documento
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            error={error || errorUpload}
                            value={tempDocument?.document.name ?? String(tempDocument?.document.name)}
                            label={"Seleziona il documento"}
                            readOnly={true}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={pickFile}
                                        disabled={errorUpload}
                                    >
                                        {errorUpload ? < ErrorOutlineOutlinedIcon className={css["error-icon"]} />
                                            :
                                            <AttachFileIcon className={css["gray"]} />
                                        }

                                        <input onChange={changeFile} type="file" id="input_file" accept=".pdf" className={css["hidden"]} />
                                    </IconButton>
                                </InputAdornment>}
                        ></OutlinedInput>
                        <Typography variant="subtitle2" color={error || errorUpload ? "error" : '#C8C6CA99'} marginTop={'8px'} >
                            {error ? "Dimensioni file superate (massimo 10 Mb)" : errorUpload ? "Errore di caricamento" : "formato PDF, massimo 10 Mb"}
                        </Typography>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Tipologia del documento</InputLabel>
                        <Select
                            onChange={changeType}
                            label={"Tipologia del documento"}>
                            {Object.keys(docTypesMap).map((item: string) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                >
                                    {getEnumValue(docTypesMap, item)}
                                </MenuItem>))}
                        </Select>
                    </FormControl>
                </div>
                <div className={css["stepDocument-card-buttons"]}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={props.onCancel}
                        className={css["document-control-button"]}
                    >Cancella</Button>
                    {
                        !errorUpload ?

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!tempDocument?.document.name || !tempDocument?.type || error}
                                onClick={props.onSave}
                                className={css["document-control-button"]}

                            >Salva
                                {uploading ?
                                    <CircularProgress
                                        color={"warning"}
                                        variant="indeterminate"
                                        style={{}}
                                        size={15}
                                        thickness={4}

                                        value={100}
                                    /> : <></>}
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.onSave}
                                className={css["document-control-button"]}

                            >Riprova
                            </Button>
                    }

                </div>
            </div >
        </Card >)

}