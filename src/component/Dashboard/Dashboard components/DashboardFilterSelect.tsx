import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FilterTypes } from '../../../types/types';
import { useCallback, useState } from 'react';
import { useDashboardFilter } from '../../../store/stms/dasboard/dashboard.hook';
import css from '../Dashboard.module.css'


export interface SelectItem {
    name: string,
    value: string
}

interface Props {
    items: SelectItem[],
    label: string
}

export const DashboardFilterSelect = (props: Props) => {
    const [selectValue, setSelectValue] = useState(props.label === FilterTypes.TIME_INTERVAL ? props.items[2].value : '0');


    const { changeTimespan, changeInCountry, changeOutCountry } = useDashboardFilter()

    const handleChange = useCallback((event: SelectChangeEvent) => {
        switch (props.label) {
            case FilterTypes.TIME_INTERVAL:
                changeTimespan(event)
                break
            case FilterTypes.IN_COUNTRY:
                changeInCountry(event)
                break
            case FilterTypes.OUT_COUNTRY:
                changeOutCountry(event)
                break

        }
        setSelectValue(event.target.value)
    }, []);


    return (


        <FormControl fullWidth >
            <InputLabel>{props.label}</InputLabel>
            <Select
                MenuProps={{
                    PaperProps: {
                        className: css["paper-filter-menu"],
                        // @ts-ignore
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                        },
                        transformOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                        },

                    },



                }}

                label={props.label}
                value={selectValue}
                onChange={handleChange}
            >
                {props.items.map((item: SelectItem) => (
                    <MenuItem
                        key={item.name}
                        value={item.value}
                    >
                        {item.name}
                    </MenuItem>))}
            </Select>
        </FormControl>
    );
}
