import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import css from './FormVatPayment.module.css'
import React, { useCallback, useRef, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDetailsDossier, useVatForm } from '../../../../../store/stms/detailDossier/detailsDossier.hook';
import { CustomCalendar } from '../CustomCalendar';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';


export const FormVatPayment = () => {
    const [error, setError] = useState<boolean>(false)
    const { actionDocument, errorUpload } = useDetailsDossier()
    const { changeAmount, changeVatDocument, changePaymentDate, amout } = useVatForm()

    const inputFileRef = useRef<HTMLInputElement>(null);

    const pickFile = useCallback(() => {
        inputFileRef.current?.click();
    }, [])

    const changeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            if (e.target.files[0].size <= 10000000) {
                changeVatDocument(e.target.files[0])
                setError(false)
            }
            else { setError(true) }
        }
    }, [changeVatDocument])
    return (
        <div className={css["vat-main-panel"]}>
            <div className={css["vat-header"]}>
                <Typography variant='h4' color={'#C2C5DD'}>Conferma pagamento IVA</Typography>
                <Typography variant='subtitle1' color={'#C6C5D0'}>La invitiamo gentilmente a confermare il pagamento dell&apos;IVA per poter finalizzare la pratica avviata. Una volta ricevuto il pagamento, procederemo con la validazione del pagamento e conclusione della pratica.</Typography>
            </div>
            <div className={css['vat-label-section-container']}>
                <div className={css['vat-label-row']}>

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={'#C6C5D0'}>
                                Importo, €
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            label="Importo, €"
                            onChange={changeAmount}
                            value={amout === 0 ? "" : amout}
                        />

                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <CustomCalendar changeDate={changePaymentDate} label="Data pagamento giustificativo" />
                        <div className={css["form-helper-text"]}>
                            <Typography variant="subtitle2" color={'#C6C5D0'}>
                                GG/MM/AAAA
                            </Typography>
                        </div>
                    </FormControl>

                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography variant="subtitle1" color={error || errorUpload ? "#FFB4AC" : '#C6C5D0'} >
                                Seleziona il giustificativo di pagamento
                            </Typography>
                        </InputLabel>
                        <OutlinedInput
                            error={error || errorUpload}
                            label={"Seleziona il giustificativo di pagamento"}
                            readOnly={true}
                            value={actionDocument ?
                                actionDocument!.document.name : ""
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Seleziona il giustificativo di pagamento"
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
                        ></OutlinedInput>
                        <div className={css["form-helper-text"]}>
                            <Typography variant="subtitle2" color={error || errorUpload ? "error" : '#C6C5D0'} marginTop={'8px'} >
                                {error ? "Dimensioni file superate (massimo 10 Mb)" : errorUpload ? "Errore di caricamento" : "formato PDF, massimo 10 Mb"}
                            </Typography>
                        </div>
                    </FormControl>

                </div>


            </div >
        </div >
    );
}
