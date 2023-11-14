import { Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import css from './Steps.module.css'
import React from 'react';
import { docTypesMap, toEuro, validCategoriesMap } from '../../../types/types';
import { useCreateDossier } from '../../../store/stms/dossier/dossier.hook';
import { getEnumValue } from '../../../utils/utils';
import { DocumentInterface } from '../../../services/Dossier/api';
import { useSelector } from 'react-redux';
import { createDossierState } from '../../../store/stms/dossier/dossier.selector';
import { CreateDossierMachineStates } from '../../../store/stms/dossier/createDossierMachine.stm';

export function Step4() {

    const { dossier, documents } = useCreateDossier()
    const dossierState = useSelector(createDossierState)
    return (
        <div className={css["step-main-panel"]}>
            <div className={css["step-header"]}>
                <Typography variant='h4' color={'#C2C5DD'}>Conferma ed invio pratica</Typography>
                <Typography variant='subtitle1' color={'#C6C5D0'}>Verifica dei dati inseriti. Per sottomettere la pratica premere il pulsante “Conferma e invia“.</Typography>
            </div>
            {dossierState !== CreateDossierMachineStates.submittingError &&
                <>
                    <div className={css['step-label-section-container']}>
                        <Typography variant='h6' color={'#C2C5DD'}>a. Attori coinvolti</Typography>
                        <div className={css['step-label-row-stepRecap']}>
                            <Typography variant='h6' color={'#C2C5DD'}>Importatore</Typography>
                            <Typography variant='h6' >{dossier?.company.businessName}</Typography>
                            <Typography variant='h6' >{dossier?.company.legalResidence}</Typography>
                            <Typography variant='h6' >Cod.EORI: {dossier?.company.codeEori}</Typography>
                            <Typography variant='h6' >P.IVA: {dossier?.company.vatNumber}</Typography>

                        </div>
                        <Divider className={css["step-divider"]} />
                        <div className={css['step-label-row-stepRecap']}>
                            <Typography variant='h6' color={'#C2C5DD'}>Acquirente</Typography>
                            <Typography variant='h6' >{dossier?.transfereeCompany.businessName}</Typography>
                            <Typography variant='h6' >{dossier?.transfereeCompany.legalResidence}</Typography>
                            <Typography variant='h6' >Cod.EORI: {dossier?.transfereeCompany.codeEori}</Typography>
                            <Typography variant='h6' >P.IVA: {dossier?.transfereeCompany.vatNumber}</Typography>
                        </div>
                    </div>
                    <div className={css['step-label-section-container']}>
                        <Typography variant='h6' color={'#C2C5DD'}>b. Tipologia e destinazione merci</Typography>
                        <div className={css['step-label-row-stepRecap']}>

                            <Typography variant='h6' color={'#C2C5DD'}>Istruzioni di controllo</Typography>
                            <Typography variant='h6' >Dogana Italiana</Typography>
                            <Typography variant='h6' >Dogana Tedesca</Typography>

                        </div>
                        <Divider className={css["step-divider"]} />
                        <div className={css['step-label-row-stepRecap']}>
                            <Typography variant='h6' color={'#C2C5DD'}>Merci</Typography>
                            <Typography variant='h6' >{validCategoriesMap[dossier!.category!]}</Typography>
                            <Typography variant='h6' >{toEuro(Number(dossier?.amount))} Euro</Typography>
                            <Typography variant='h6' >{dossier?.ton} ton</Typography>
                            <Typography variant='h6' >{dossier?.parcels} colli</Typography>
                        </div>
                    </div>

                    <div className={css['step-label-section-container']}>
                        <Typography variant='h6' color={'#C2C5DD'}>c. Documenti per avvio pratica</Typography>
                        <TableContainer >
                            <Table className={css['table-container']} >
                                <TableBody>
                                    {documents?.map((document: DocumentInterface, index: number) => (
                                        <TableRow
                                            key={index}
                                            className={css['table-row']}
                                        >
                                            <TableCell width={'10%'} align="left">n.{(index + 1)}</TableCell>
                                            <TableCell width={'40%'} align="left" ><Typography variant='h6' color={'#B7C4FF'}>{document.document.name}</Typography></TableCell>
                                            <TableCell width={'25%'} align="left">{getEnumValue(docTypesMap, document.type!)}</TableCell>
                                            <TableCell width={'25%'} align="left">{String(document.document.size / 1000000).substring(0, 4)} MB</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>}
        </div >
    );
}