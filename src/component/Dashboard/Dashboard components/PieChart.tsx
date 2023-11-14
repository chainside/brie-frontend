import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material"
import React, { useCallback, useMemo, useState } from "react"
import css from '../Dashboard.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconTableSort } from "../../Dossier/IconTableSort";
import { useDashboard } from "../../../store/stms/dasboard/dashboard.hook";
import { COLORS, } from "../../../utils/utils";
import { validCategoriesMap } from "../../../types/types";
import { RenderPieChart } from "./Charts/RenderPieChart";
import classnames from 'classnames'


export const PieChartComponent = () => {
    const { dashboardInfo } = useDashboard()
    const [sorting, setSorting] = useState<boolean | undefined>(undefined)
    let sortedArray = useMemo(() => {
        if (dashboardInfo) { return [...dashboardInfo.categoryTrends] }
    }, [dashboardInfo])
    const filterTrends = useCallback(() => {
        if (sortedArray) {
            if (sorting) {
                sortedArray.sort(((a, b) => a.perc - b.perc))
                setSorting(false)
            }
            else {
                sortedArray.sort(((a, b) => b.perc - a.perc))
                setSorting(true)
            }
        }
    }, [sorting])
    return (
        <Card className={css['pie-card-style']} >
            <Typography variant='subtitle1' color={'#C8C6CA'} fontWeight={"500"} fontSize={"16px"}>Tipologia di merci sul totale di scambi</Typography>
            <div className={css["chart-info-div"]}>
                <RenderPieChart dashboardInfo={dashboardInfo} />
                <TableContainer className={css["table-container"]} >
                    <Table  >
                        <TableHead >
                            <TableRow>
                                <TableCell
                                    className={classnames(css["table-header-cell"], css["table-no-padding"])}
                                    align="left"
                                >
                                    <Typography variant="subtitle2" noWrap>
                                        Tipologia merci
                                    </Typography>
                                </TableCell>

                                <TableCell
                                    className={classnames(css["table-header-cell"], css["table-no-padding"])}
                                    align="left">
                                    <div className={css["table-center"]}>
                                        <TableSortLabel
                                            IconComponent={sorting === undefined ? IconTableSort : ExpandMoreIcon}
                                            active={true}
                                            direction={sorting ? 'desc' : 'asc'}
                                            onClick={filterTrends}
                                        >
                                            <Typography variant="subtitle2" noWrap className={css["table-no-padding"]}>
                                                % scambio
                                            </Typography>
                                        </TableSortLabel>
                                    </div>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {sortedArray?.map((element, index) => {
                                return (<TableRow style={{ marginTop: "5px" }} key={index}>
                                    <TableCell align="left" className={css["table-no-padding"]}>
                                        <div className={css["pie-chart-type-row"]}>
                                            <div className={css["pie-chart-circle"]} style={{ backgroundColor: COLORS[index] }}></div>
                                            <Typography variant='h6' fontSize={12} color={"#C8C6CA"} fontWeight={"500"}  >{validCategoriesMap[element.category]} </Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left" className={css["table-no-padding"]}>
                                        <Typography variant='h5' fontWeight={"500"}>{element.perc}</Typography>
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Card >
    )
}