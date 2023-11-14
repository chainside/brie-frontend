import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import css from './ActionComponent.module.css'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
interface Props {
    changeDate: (e: Date | null) => void,
    label: string
}

export const CustomCalendar = (props: Props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                slots={{
                    openPickerIcon: CalendarTodayOutlinedIcon
                }}
                disablePast={true}
                onChange={props.changeDate}
                format='DD/MM/YYYY'
                autoFocus={false}
                closeOnSelect={false}
                disableHighlightToday={true}
                formatDensity={"spacious"}
                showDaysOutsideCurrentMonth={true}
                label={props.label}
                slotProps={{
                    popper: {
                        placement: "right",

                        style: {
                            top: "300px"
                        }



                    }
                    ,
                    textField: {
                        placeholder: "",
                        disabled: true,

                    }, desktopPaper: {
                        className: css["desktop-paper"]
                    },
                    day: {
                        className: css["day-paper"],
                    },
                    actionBar: {
                        actions: ['cancel', 'accept'],
                    }
                }}
            />
        </LocalizationProvider>
    )
}