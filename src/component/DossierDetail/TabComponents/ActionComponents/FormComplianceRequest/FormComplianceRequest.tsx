import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import css from './FormComplianceRequest.module.css'
import React, { useCallback, useRef, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useComplianceForm, useDetailsDossier } from '../../../../../store/stms/detailDossier/detailsDossier.hook';
import { CustomCalendar } from '../CustomCalendar';
import { ValidCompliance } from '../../../../../types/types';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';


export const FormComplianceRequest = () => {
    const [error, setError] = useState<boolean>(false)
    const { changeComplianceField, changeNote, changeDeliveredDate, changeDdtDocument } = useComplianceForm()
    const { actionDocument, errorUpload } = useDetailsDossier()

    const inputFileRef = useRef<HTMLInputElement>(null);

    const pickFile = useCallback(() => {
        inputFileRef.current?.click();
    }, [])

    const changeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            if (e.target.files[0].size <= 10000000) {
                changeDdtDocument(e.target.files[0])
                setError(false)
            }
            else { setError(true) }
        }
    }, [changeDdtDocument])

    return (
        <div className={css["compliance-main-panel"]}>
            <div className={css["compliance-header"]}>
                <Typography variant='h4' color={'#C2C5DD'}>Conferma consegna merce</Typography>
                <Typography variant='subtitle1' color={'#C6C5D0'}>Le invitiamo gentilmente a confermare la consegna del prodotto fornendo i seguenti dettagli:</Typography>
            </div>
            <div className={css['compliance-label-section-container']}>
                <div className={css['compliance-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <CustomCalendar changeDate={changeDeliveredDate} label='Data consegna merce' />
                        <FormHelperText>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                GG/MM/AAAA
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={error || errorUpload ? "#FFB4AC" : '#C6C5D0'} >
                                Seleziona il documento di trasporto
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            label={"Seleziona il documento di trasporto"}
                            error={error || errorUpload}
                            readOnly={true}
                            value={actionDocument ?
                                actionDocument!.document.name : ""
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Seleziona il documento di trasporto"
                                        edge="end"
                                        onClick={pickFile}
                                        disabled={errorUpload}
                                    >
                                        {errorUpload ? < ErrorOutlineOutlinedIcon className={css["error-icon"]} />
                                            :
                                            <AttachFileIcon className={css["gray"]} />
                                        }
                                        <input ref={inputFileRef} onChange={changeFile} type="file" accept=".pdf" className={css["hidden"]} />
                                    </IconButton>
                                </InputAdornment>}
                        ></OutlinedInput>

                        <FormHelperText>
                            <Typography variant="subtitle2" color={error || errorUpload ? "error" : '#C6C5D0'} marginTop={'8px'} >
                                {error ? "Dimensioni file superate (massimo 10 Mb)" : errorUpload ? "Errore di caricamento" : "formato PDF, massimo 10 Mb"}
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                </div>
                <div className={css['compliance-label-row']}>
                    <FormControl fullWidth>
                        <InputLabel>Stato merce</InputLabel>
                        <Select
                            onChange={changeComplianceField}
                            label={"props.label"}
                        >
                            <MenuItem
                                key={ValidCompliance.OK}
                                value={ValidCompliance.OK}>
                                <div className={css["menu-item-compliance"]}><CheckIcon color={"success"} />Conforme</div>
                            </MenuItem>
                            <MenuItem
                                key={ValidCompliance.KO}
                                value={ValidCompliance.KO}>
                                <div className={css["menu-item-compliance"]}><CloseIcon color={"error"} /> Non conforme</div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Nota (opzionale)
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            label="Nota (opzionale)"
                            inputProps={{ maxLength: 60 }}
                            onChange={changeNote}
                        />
                        <FormHelperText>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                max. 60 caratteri
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                </div>
            </div>
        </div >
    );
}