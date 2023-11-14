import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import css from './FormDdt.module.css'
import React, { useCallback, useRef, useState } from 'react';
import { validTransportsMap } from '../../../../../types/types';
import { DdtForm } from '../../../../../services/Dossier/api';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDdtForm, useDetailsDossier } from '../../../../../store/stms/detailDossier/detailsDossier.hook';
import { CustomCalendar } from '../CustomCalendar';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';



export const FormDdt = () => {
    const [error, setError] = useState<boolean>(false)
    const { detailDossierActionForm, actionDocument, errorUpload } = useDetailsDossier()
    const { changeCarrierName, changeCarrierVAT, changePickupDate,
        changeExpectedDeliveryDate, changePickupAddress, changeDestinationAddress,
        changeTransport, changeDdtDocument } = useDdtForm()

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
        <div className={css["ddt-main-panel"]}>
            <div className={css["ddt-header"]}>
                <Typography variant='h4' color={'#C2C5DD'}>Richiesta Documento Di Trasporto</Typography>
                <Typography variant='subtitle1' color={'#C6C5D0'}>Le chiediamo cortesemente di proseguire con l&apos;inserimento dei dati relativi alla spedizione e al trasportatore per avviare il processo di spedizione.</Typography>
            </div>
            <div className={css['ddt-label-section-container']}>
                <Typography variant='h6' color={'#C2C5DD'}>a. Trasporto e trasportatore</Typography>
                <div className={css['ddt-label-row']}>
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Modalità di trasporto
                            </Typography>
                        </InputLabel>
                        <Select
                            label="Modalità di trasporto"
                            onChange={changeTransport}
                        >
                            {Object.keys(validTransportsMap).map((key: string) => (
                                <MenuItem
                                    key={key}
                                    value={key}
                                >
                                    {validTransportsMap[key]}
                                </MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={error || errorUpload ? "#FFB4AC" : '#C6C5D0'} >
                                Seleziona il documento di trasporto
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            error={error || errorUpload}
                            label={"Seleziona il documento di trasporto"}
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
                </div>
                <div className={css['ddt-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Trasportatore
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            value={(detailDossierActionForm as DdtForm)?.carrierName}
                            onChange={changeCarrierName}
                            label="Trasportatore"
                            inputProps={{ maxLength: 50 }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Partita Iva (Trasportatore)
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            value={(detailDossierActionForm as DdtForm)?.carrierVAT}
                            onChange={changeCarrierVAT}
                            label="Partita Iva (Trasportatore)"
                            inputProps={{ maxLength: 11 }}
                        />
                    </FormControl>
                </div>
            </div>
            <div className={css['ddt-label-section-container']}>
                <Typography variant='h6' color={'#C2C5DD'}>b. Dati spedizione</Typography>
                <div className={css['ddt-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <CustomCalendar changeDate={changePickupDate} label="Data ritiro merce" />
                        < div className={css["form-helper-text"]}>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                GG/MM/AAAA
                            </Typography>
                        </div>

                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Indirizzo di ritiro
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            value={(detailDossierActionForm as DdtForm)?.pickupAddress}
                            onChange={changePickupAddress}
                            label="Indirizzo di ritiro"
                        />
                        <div className={css["form-helper-text"]}>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                es. via Corso Roma 23, 00158 Roma, Italia
                            </Typography>
                        </div>
                    </FormControl>
                </div>
                <div className={css['ddt-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <CustomCalendar changeDate={changeExpectedDeliveryDate} label="Data prevista consegna merce" />
                        <div className={css["form-helper-text"]}>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                GG/MM/AAAA
                            </Typography>
                        </div>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Indirizzo di consegna
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            value={(detailDossierActionForm as DdtForm)?.destinationAddress}
                            onChange={changeDestinationAddress}
                            label="Indirizzo di consegna"
                        />
                        <div className={css["form-helper-text"]}>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                es. via Corso Roma 23, 00158 Roma, Italia
                            </Typography>
                        </div>
                    </FormControl>
                </div>
            </div >

        </div >
    );
}
