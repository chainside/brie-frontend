import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import css from './ActionComponent.module.css'
import React, { ReactElement, useMemo } from "react"
import { useDetailsDossier } from "../../../../store/stms/detailDossier/detailsDossier.hook";
import { codeTranslator } from "../../../../utils/utils";
import { formatTime, phaseLabelMap, validRequestDetailsMap, validRequestTypeMap } from "../../../../types/types";


interface Column {
    id: 'date' | 'phase' | 'reqType' | 'detail' | 'applicant';
    label: ReactElement;
    align?: 'left';
}

const columns: readonly Column[] = [
    { id: 'date', label: <Typography variant="h6" color={'#C2C5DD'}>Data Richiesta</Typography> },
    { id: 'phase', label: <Typography variant="h6" color={'#C2C5DD'}>Fase</Typography> },
    { id: 'reqType', label: <Typography variant="h6" color={'#C2C5DD'}>Tipologia richiesta</Typography> },
    { id: 'detail', label: <Typography variant="h6" color={'#C2C5DD'}>Dettaglio Richiesta</Typography> },
    { id: 'applicant', label: <Typography variant="h6" color={'#C2C5DD'}>Richiedente</Typography> },
];


export const ActionComponent = () => {
    const { toChangeAction, detailDossierInfo, action } = useDetailsDossier()

    const phase = useMemo(() => phaseLabelMap[detailDossierInfo!.phase!], [detailDossierInfo])
    const type = useMemo(() => validRequestTypeMap[detailDossierInfo!.requestType!], [detailDossierInfo])
    const detail = useMemo(() => validRequestDetailsMap[detailDossierInfo!.requestDetail!], [detailDossierInfo])
    const requester = useMemo(() => {
        if (detailDossierInfo?.requester) {
            if (detailDossierInfo?.requester!.split(" ")[0] === "Dogana") {
                return detailDossierInfo?.requester!.split(" ")[0] + " " + codeTranslator(detailDossierInfo?.requester!.split(" ")[1])
            }
            else {
                return detailDossierInfo?.requester
            }
        }
    }, [detailDossierInfo])

    if (!action) {

        return (
            <div className={css["no-action-div"]} >
                <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'} textAlign={"center"}  >
                    Non hai nessuna azione richiesta
                </Typography>
            </div>
        )
    }
    else {
        return (
            <TableContainer >
                <Table className={css['table-container']} >
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    className={css["table-header-cell"]}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">{formatTime(new Date(detailDossierInfo?.requestDate ?? ""), true)}</TableCell>
                            <TableCell align="left" >{phase}</TableCell>
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">{detail}</TableCell>
                            <TableCell align="left">{requester}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={toChangeAction}
                >
                    <Typography variant="h6" color={'#002780'} fontWeight={"500"}>Compila richiesta</Typography>
                </Button>
            </TableContainer>
        )
    }

}