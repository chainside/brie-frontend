import {
    AlertColor,
    Divider,
    IconButton, Menu, MenuItem, Paper, Popover, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import css from "./DocumentList.module.css"
import { useDetailsDossier } from "../../../../store/stms/detailDossier/detailsDossier.hook";
import { codeTranslator, getEnumValue } from "../../../../utils/utils";
import { DocumentDetail } from "../../../../services/Dossier/api";
import {
    allDocTypesMap,
    phaseLabelMap,
    PhaseNumberEnum,
    showDate,
    showDateTime,
    StateLabelEnum
} from "../../../../types/types";
import { StateLabel } from "../../../Dossier/StateLabel/StateLabel";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useLogin } from "../../../../store/stms/login/login.hook";
import Alert from "@mui/material/Alert";

interface Column {
    id: 'name' | 'type' | 'uploader' | 'date' | 'phase' | 'state';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Nome', minWidth: 100 },
    { id: 'type', label: 'Tipologia', minWidth: 100 },
    { id: 'date', label: 'Caricato\u00a0il', minWidth: 100 },
    { id: 'uploader', label: 'Caricato\u00a0da', minWidth: 100 },
    { id: 'phase', label: 'Fase', minWidth: 100 },
    { id: 'state', label: 'Stato', minWidth: 150 },
];

export function DocumentList() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { downloadDocument } = useDetailsDossier()
    const { userInfo } = useLogin()
    const [documentRow, setDocumentRow] = useState<DocumentDetail | undefined>(undefined)

    const openPopover = useCallback((docDetail: DocumentDetail) => {
        return function (event: React.MouseEvent<HTMLButtonElement>) {
            setAnchorEl(event.currentTarget);
            setDocumentRow(docDetail)
        }
    }, [])

    const download = useCallback(() => {
        setSnackMessage("Documento scaricato correttamente")
        downloadDocument(documentRow?.id ?? "")
    }, [downloadDocument, documentRow])

    const copyTxId = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(documentRow?.txId ?? "");
            setSeverity("success")
            setSnackMessage("Blockchain Transaction ID copiato negli appunti")
        } catch (e) {
            setSeverity("error")
            setSnackMessage("Errore durante la copia del Blockchain Transaction ID")
        }
    }, [documentRow]);

    const copyIpfsHash = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(documentRow?.ipfsLink ?? "");
            setSeverity("success")
            setSnackMessage("IPFS Hash copiato negli appunti")
        } catch (e) {
            setSeverity("error")
            setSnackMessage("Errore durante la copia del Blockchain Transaction ID")
        }
    }, [documentRow]);

    const closePopover = useCallback(() => {
        setAnchorEl(null);
    }, [])

    const [snackMessage, setSnackMessage] = useState<string>()
    const [severity, setSeverity] = useState<AlertColor>()

    const closeSnackbar = useCallback(() => {
        setSnackMessage(undefined)
    }, [])


    const open = Boolean(anchorEl);


    const { documents, detailDossierInfo } = useDetailsDossier()

    const canDownload = useMemo(() => {
        return [
            detailDossierInfo?.company.id,
            detailDossierInfo?.transfereeCompany.id
        ].includes(userInfo!.company.id)
    }, [detailDossierInfo, userInfo])

    const getSubDocumentInfo = useCallback((column: string, document: DocumentDetail) => {
        switch (column) {
            case 'name':
                return "PDF"
            case 'type':
                return String(document.size / 1000000).substring(0, 4) + "MB"
            case 'date':
                return showDateTime(String(document.uploadDate))
            case 'uploader':
                return codeTranslator(document.uploader.legalResidence.split(",")[2])
            case 'phase':
                return "Fase " + getEnumValue(PhaseNumberEnum, document.phase) + " di 4"
            default:
                return ""
        }
    }, [documents])

    const getDocumentInfo = useCallback((column: string, document: DocumentDetail) => {
        switch (column) {
            case 'name':
                return document.name
            case 'type':
                return allDocTypesMap[document.type]
            case 'date':
                return showDate(String(document.uploadDate))
            case 'uploader':
                return document.uploader.businessName
            case 'phase':
                return phaseLabelMap[document.phase]
            default:
                return ""
        }
    }, [])

    return (
        <div >
            <Paper className={css["paper-container"]} >
                <TableContainer className={css["table-container"]}>
                    <Table stickyHeader aria-label="sticky table">
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
                            {
                                documents ?
                                    documents.map((row) => {
                                        return (
                                            <TableRow tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell key={column.id} align={"left"}>
                                                            {column.id === "state" ?

                                                                <div className={css['flex-cell']}>
                                                                    <StateLabel state={row.state} />
                                                                    <IconButton disabled={row.state === StateLabelEnum.FAILED} onClick={openPopover(row)}>
                                                                        <MoreHorizIcon />
                                                                    </IconButton>
                                                                </div>
                                                                : <div>
                                                                    <Typography variant="h6" color={column.id === "name" ? "#B7C4FF" : '#C8C6CA'} marginTop={'8px'} noWrap maxWidth={column.id === "name" ? '300px' : "none"}>
                                                                        {getDocumentInfo(column.id, row)}
                                                                    </Typography>
                                                                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                                                                        {getSubDocumentInfo(column.id, row)}
                                                                    </Typography>

                                                                </div>
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }) : <></>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={closePopover}
                className={css['menu-container']}

            >
                <MenuItem onClick={documentRow?.ipfsLink ? copyIpfsHash : undefined} disabled={!documentRow?.ipfsLink} className={css['item']}>
                        <Typography variant="subtitle1">
                            Copia IPFS Hash
                        </Typography>
                </MenuItem>
                <MenuItem onClick={documentRow?.txId ? copyTxId : undefined} disabled={!documentRow?.txId} className={css['item']}>
                        <Typography variant="subtitle1">
                            Copia Blockchain Transaction Id
                        </Typography>
                </MenuItem>
                    {canDownload &&
                        <>
                            <Divider />
                            <MenuItem onClick={download} className={css['item']}>
                                <Typography variant="subtitle1">Download file</Typography>
                            </MenuItem>
                        </>
                        }
            </Menu>
            <Snackbar
                anchorOrigin={{vertical:"top", horizontal:"center"}}
                open={!!snackMessage}
                onClose={closeSnackbar}
                autoHideDuration={5000}
                transitionDuration={0}
                ><Alert variant={"outlined"} severity={severity} onClose={closeSnackbar}>
                    <Typography>{snackMessage}</Typography>
                </Alert>
            </Snackbar>
        </div >)
}
