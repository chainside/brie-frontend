import React, { useCallback, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import css from "./Dossier.module.css"
import { TableSortLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { DossierInterface } from '../../services/Dossier/api';
import { dossierList } from '../../store/stms/dossier/dossier.selector';
import { locationStates } from '../../types/types';
import { columns, DossierColumnNames, getSubInfoFromDossier, getInfoFromDossier, sortableColumns, Order } from '../../utils/sortDataTableUtils';
import { CustomAlert } from '../CustomAlert/CustomAlert';
import { IconTableSort } from './IconTableSort';
import { DossierFiltersList } from './DossierFilters';
import { DossierListFooter } from './DossierListFooter';
import { StateLabel } from './StateLabel/StateLabel';
import { Pages } from '../MainPanel/Pages';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDossierFilter } from '../../store/stms/dossier/dossier.hook';

export function DossierList() {



    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<DossierColumnNames>(DossierColumnNames.id);

    const location = useLocation();
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(location.state?.name === locationStates.NEW_DOSSIER)
    const closeAlert = useCallback(() => {
        setShowAlert(false)
        window.history.replaceState({}, document.title)
    }, [])
    const dossiersList: DossierInterface[] = useSelector(dossierList);
    const { changeTableSort } = useDossierFilter()






    const handleDossierDetail = useCallback((dossierIndex: string) => {
        return () => {
            const dossier = dossiersList.filter(element => element.id === dossierIndex)
            const category = dossier[0].category
            navigate(Pages.prd4Details + "/" + dossier[0].id, {
                state: {
                    category: category
                }
            })
        }
    }, [dossiersList, navigate])


    const dossierRows = useMemo(
        () => dossiersList,
        [order, orderBy, dossiersList],
    );


    const handleRequestSort = useCallback((
        event: React.MouseEvent<unknown>,
        property: DossierColumnNames,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        let columnDbName = "creation_date"
        if (property === "id") {
            columnDbName = "creation_date"
        }
        else if (property === "company") {
            columnDbName = "company.business_name"
        } else if (property === "transfereeCompany") {
            columnDbName = "transfereeCompany.business_name"
        }


        changeTableSort(columnDbName, isAsc ? 'DESC' : 'ASC')
    }, [order, orderBy, dossiersList]);

    const createSortHandler = useCallback(
        (property: DossierColumnNames) => (event: React.MouseEvent<unknown>) => {
            handleRequestSort(event, property);
        }
        , [handleRequestSort, dossiersList])



    return (


        <div  >
            <CustomAlert show={showAlert} onClose={closeAlert}>
                < div className={css["custom-alert-content"]}>
                    <Typography fontSize={"14px"} fontWeight={"400"} color={"#1B1B1F"}>Pratica creata con successo.</Typography>
                    <Link to={Pages.prd4Details + "/" + location.state?.value}>Vai al dettaglio</Link>
                </div>
            </CustomAlert>
            <div className={css["filter-list-container"]}>
                <DossierFiltersList />
            </div>

            <Paper className={css["paper-container"]} >

                <TableContainer className={css["table-container"]}  >
                    <Table stickyHeader aria-label="sticky table" className={dossierRows.length !== 0 ? css["table-content"] : css["table-no-content"]}>
                        <TableHead >
                            <TableRow>
                                {sortableColumns.map((column, index) => (
                                    <TableCell
                                        key={column.id}
                                        className={css["table-header-cell"]}>
                                        <TableSortLabel
                                            IconComponent={orderBy === column.id ? ExpandMoreIcon : IconTableSort}
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={createSortHandler(column.id)} >
                                            {column.label}

                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        className={css["table-header-cell"]}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {
                            dossierRows.length !== 0 &&
                            <TableBody>

                                {dossierRows
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={index} onClick={handleDossierDetail(row.id)} className={css["cursor-pointer"]}>
                                                {sortableColumns.map((column) => {

                                                    return (
                                                        <TableCell key={column.id} align={"left"}>
                                                            {column.id !== "state" ?
                                                                <div>
                                                                    {getInfoFromDossier(column.id, row)}

                                                                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                                                                        {getSubInfoFromDossier(column.id, row)}
                                                                    </Typography>

                                                                </div> : <StateLabel state={row.state} />
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                                {columns.map((column) => {

                                                    return (
                                                        <TableCell key={column.id} align={"left"}>
                                                            {column.id !== "state" ?
                                                                <div>
                                                                    {getInfoFromDossier(column.id, row)}

                                                                    <Typography variant="subtitle2" color={'#C8C6CA99'} marginTop={'8px'}>
                                                                        {getSubInfoFromDossier(column.id, row)}
                                                                    </Typography>

                                                                </div> : <StateLabel state={row.state} />
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        }
                    </Table>
                    {dossierRows.length === 0 &&
                        < div >
                            <Typography variant="subtitle2" color={'#C8C6CADE'} marginTop={'8px'} textAlign={"center"} >
                                Nessuna pratica trovata
                            </Typography>
                        </div>}
                </TableContainer>

            </Paper >

            <DossierListFooter />


        </div >)
}
