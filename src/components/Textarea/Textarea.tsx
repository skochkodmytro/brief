import { ChangeEvent, FC } from "react";
import { Input } from "antd";

import './Textarea.css';

const { TextArea } = Input;

type OwnProps = {
    value: string
    placeholder?: string
    autoSize?: boolean

    onChange: (value: string) => void
}

export const TextAreaInput: FC<OwnProps> = ({ autoSize = true,
                                                value,
                                                placeholder = '',
                                                onChange }) => {

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    }

    return (
        <TextArea
            className="textarea"
            autoSize={autoSize}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    )
}