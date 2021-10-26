import { ChangeEvent, FC } from 'react';
import { TextField } from "@mui/material";

import './TextInput.css';

type OwnProps = {
    value: string
    placeholder?: string
    bordered?: boolean
    fontSize?: number
    style?: React.CSSProperties
    fullWidth?: boolean
    error?: boolean

    onChange: (value: string) => void
}

export const TextInput: FC<OwnProps> = ({ value,
                                            onChange,
                                            style= {},
                                            error = false,
                                            fullWidth= true,
                                            placeholder }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return (
        <TextField
            label={placeholder}
            style={{ ...style }}
            size="medium"
            multiline
            fullWidth={fullWidth}
            error={error}
            value={value}
            onChange={handleChange}
        />
    )
}
