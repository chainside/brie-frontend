import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import css from '../Steps.module.css'
import React from 'react';
import { DocTypes, docTypesMap } from '../../../../types/types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCreateDossier } from '../../../../store/stms/dossier/dossier.hook';
import { DocumentInterface } from '../../../../services/Dossier/api';
import classnames from 'classnames'

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function ShowFile(props: Props) {
    const { removeDoc, documents } = useCreateDossier()
    return (
        < div >
            <div className={classnames({
                [css["documents-container"]]: documents?.length ? documents.length > 0 : false,
            })}>
                <TableContainer >
                    <Table className={css['table-container']} >
                        <TableBody>
                            {documents?.map((docInterface: DocumentInterface, index: number) => (
                                <TableRow
                                    key={index}
                                    className={css['table-row']}
                                >
                                    <TableCell align="left">n.{(index + 1)}</TableCell>
                                    <TableCell align="left" ><Typography variant='h6' color={'#B7C4FF'}>{docInterface.document.name}</Typography></TableCell>
                                    <TableCell align="right">{docTypesMap[docInterface.type! as DocTypes]}</TableCell>
                                    <TableCell align="right">{String(docInterface.document.size / 1000000).substring(0, 4)} MB</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={removeDoc(index)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Button color="warning" variant="contained" onClick={props.onClick}>
                <AddIcon />
                <Typography variant='h6'>Aggiungi il file</Typography>
            </Button>
        </div >
    )
}