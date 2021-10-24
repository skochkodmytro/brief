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

    onChange: (value: string) => void
}

export const TextInput: FC<OwnProps> = ({ value,
                                            onChange,
                                            style= {},
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
            value={value}
            onChange={handleChange}
        />
    )
}
