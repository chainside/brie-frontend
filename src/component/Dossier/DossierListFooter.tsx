import { Divider, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { dossierList, dossierPagelist, filters, totalDossier } from "../../store/stms/dossier/dossier.selector";
import { useDossierFilter } from "../../store/stms/dossier/dossier.hook";
import React from "react";
import css from "./DossierListFooter.module.css"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DossierInterface } from "../../services/Dossier/api";

export function DossierListFooter() {

    const { changeSkipMax, changePageNumber } = useDossierFilter()
    const dossierCount = useSelector(totalDossier)
    const filter = useSelector(filters)
    const dossiers: DossierInterface[] = useSelector(dossierList);
    const currentPage = useSelector(dossierPagelist)
    const rows = useMemo(() => filter.max, [])
    const pages = useMemo(() => Math.ceil(dossierCount! / rows), [dossierCount])

    const forwardPage = useCallback(() => {
        const c = currentPage + 1
        changeSkipMax(rows * c, 20)
        changePageNumber(c)
    }, [currentPage, filter.skip]);


    const backPage = useCallback(() => {
        const c = currentPage - 1
        changeSkipMax(rows * c, 20)
        changePageNumber(c)
    }, [currentPage, filter.skip]);


    const changePage = useCallback((event: SelectChangeEvent<string>) => {
        const c = Number(event.target.value) - 1
        changeSkipMax(rows * c, 20)
        changePageNumber(c)
    }, [currentPage, filter.skip]);


    return (
        <div className={css["top-container"]}>
            {
                dossiers.length === 0 ?
                    <> </>
                    :
                    pages === 1 ?
                        <></>
                        :
                        <div className={css["custom-pagination-div"]}>
                            <div>
                                <Typography color={"#C8C6CADE"} >{filter?.skip === 0 ? "1" : (filter?.skip + 1)} - {(filter.skip + filter.max) > dossierCount ? dossierCount : (filter.skip + filter.max)} di {dossierCount} pratiche</Typography>
                            </div>
                            <div className={css["pagination-container-div"]}>
                                <div className={css["pagination-select-container"]}>
                                    <Select disableUnderline variant={"standard"} value={String(currentPage + 1)} onChange={changePage}
                                        MenuProps={{
                                            PaperProps: {
                                                className: css["paper-filter-menu"],
                                            },

                                            anchorOrigin: {
                                                vertical: 'top',
                                                horizontal: 'center',
                                            },
                                            transformOrigin: {
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }

                                        }}
                                    >
                                        {
                                            [...Array(pages)].map((element, index) => {
                                                return <MenuItem key={index} value={String(index + 1)}>{index + 1}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    <Typography color={"#C8C6CADE"}>di {pages} pagine</Typography>
                                </div>
                                <Divider orientation={"vertical"} className={css["vertical-divider"]} />
                                <div className={css["icon-pagination-div"]}>
                                    <IconButton
                                        disabled={currentPage === 0}
                                        onClick={backPage}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                    <IconButton
                                        disabled={currentPage === pages - 1}
                                        onClick={forwardPage}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
            }
        </div>
    )

}

