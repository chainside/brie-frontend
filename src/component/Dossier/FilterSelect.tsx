import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDossierFilter } from '../../store/stms/dossier/dossier.hook';
import { FilterTypes } from '../../types/types';
import { useCallback, useState } from 'react';

export interface SelectItem {
    name: string,
    value: string
}

interface Props {
    items: SelectItem[],
    label: string
}

export function FilterSelect(props: Props) {
    const [selectValue, setSelectValue] = useState('0');
    const { changeTimespan, changePhase, changeCreatedBy } = useDossierFilter()

    const handleChange = useCallback((event: SelectChangeEvent) => {
        switch (props.label) {
            case FilterTypes.TIME_INTERVAL:
                changeTimespan(event)
                break
            case FilterTypes.CREATED_BY:
                changeCreatedBy(event)
                break
            case FilterTypes.PHASE:
                changePhase(event)
                break

        }
        setSelectValue(event.target.value)
    }, []);

    return (


        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
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
