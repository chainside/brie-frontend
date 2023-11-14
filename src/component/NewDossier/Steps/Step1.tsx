import { Autocomplete, FormControl, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import css from './Steps.module.css'
import React from 'react';
import { useSelector } from 'react-redux';
import { getCompanies } from '../../../store/stms/dossier/dossier.selector';
import { useCreateDossier } from '../../../store/stms/dossier/dossier.hook';
import { CustomPopper } from './StepComponents/CustomPopper';


export function Step1() {

    const companyList = useSelector(getCompanies);
    const { chooseCompany, dossier, updateCompanyList } = useCreateDossier()

    return (
        <div className={css["step-main-panel"]}>
            <div className={css["step-header"]}>
                <Typography variant='h4' color={'#C2C5DD'}>Operatori economici</Typography>
                <Typography variant='subtitle1' color={'#C6C5D0'}>Inserire i dati relativi alle parti dello scambio commerciale.</Typography>
            </div>
            <div className={css['step-label-section-container']}>
                <Typography variant='h6' color={'#C2C5DD'}>a. Dati dell’impresa residente nell’Unione Europea che importa merci da Paesi terzi nel quadro del regime doganale 42</Typography>
                <div className={css['step-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Denominazione sociale dell’impresa</InputLabel>
                        <OutlinedInput
                            label="Denominazione sociale dell’impresa"
                            disabled={true}
                            value={dossier?.company.businessName ?? ""}

                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Registrata in</InputLabel>
                        <OutlinedInput
                            label="Registrata in"
                            disabled={true}
                            value={dossier?.company.legalResidence ?? ""}
                        />
                    </FormControl>
                </div>
                <div className={css['step-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Codice EORI dell’impresa</InputLabel>
                        <OutlinedInput
                            label="Codice EORI dell’impresa"
                            disabled={true}
                            value={dossier?.company.codeEori ?? ""}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Partita IVA dell’impresa</InputLabel>

                        <OutlinedInput
                            label="Partita IVA dell’impresa"
                            disabled={true}
                            value={dossier?.company.vatNumber ?? ""}
                        />
                    </FormControl>
                </div>
            </div>
            <div className={css['step-label-section-container']}>
                <Typography variant='h6' color={'#C2C5DD'}>b. Dati dell’acquirente dei beni allo Stato membro diverso da quello dell’importazione</Typography>
                <div className={css['step-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password"></InputLabel>

                        <Autocomplete
                            classes={{
                                listbox: css['list-box-autocomplete'],
                                popper: css['list-popper-box-autocomplete']
                            }}

                            PopperComponent={CustomPopper}
                            componentsProps={{ popper: { placement: "top", } }}
                            options={companyList ?? []}
                            defaultValue={dossier?.transfereeCompany}
                            getOptionLabel={option => option.businessName}
                            noOptionsText={"Nessuna azienda trovata"}
                            onInputChange={updateCompanyList}
                            onChange={chooseCompany}
                            renderInput={(params) => <TextField {...params} label="Denominazione sociale dell’impresa" />}
                        />


                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Registrata in</InputLabel>
                        <OutlinedInput
                            label="Registrata in"
                            disabled={true}
                            value={dossier?.transfereeCompany.legalResidence ?? ""}
                        />
                    </FormControl>
                </div>
                <div className={css['step-label-row']}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Codice EORI dell’impresa</InputLabel>
                        <OutlinedInput
                            label="Codice EORI dell’impresa"
                            disabled={true}
                            value={dossier?.transfereeCompany.codeEori ?? ""}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Partita IVA dell’impresa</InputLabel>

                        <OutlinedInput
                            label="Partita IVA dell’impresa"
                            disabled={true}
                            value={dossier?.transfereeCompany.vatNumber ?? ""}
                        />
                    </FormControl>
                </div>
            </div>
        </div >
    );
}