import React, { FC } from 'react';
import { TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

type OwnProps = {
    index: number
}

export const DateQuestion: FC<OwnProps> = ({ index }) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={`questions.${index}.defaultDate`}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Default Date"
                        minDate={moment.now()}
                        inputFormat="MM/dd/yyyy"
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

            )}
        />
    )
}
