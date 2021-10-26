import React, { ChangeEvent, FC, useRef } from 'react';
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, CardContent, Checkbox } from "@mui/material";

import './OptionItem.css';
import { TextInput } from "../TextInput/TextInput";
import { ImagePreview } from "../ImagePreview/ImagePreview";

type OwnProps = {
    option: OptionType
    index: number
    canBeDelete: boolean
    showErrors: boolean

    onChange: (option: OptionType) => void
    onDelete: () => void
}

export const OptionItem: FC<OwnProps> = ({ option, index,
                                             showErrors,
                                             canBeDelete,
                                             onChange, onDelete }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChangeName = (name: string) => {
        onChange({ ...option, name });
    }

    const handleChangeDefaultChecked = () => {
        onChange({ ...option, defaultIsChecked: !option.defaultIsChecked });
    }

    const handleDeleteOption = () => {
        onDelete();
    }

    const handleChangeImage = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        if (input.files) {
            onChange({ ...option, image: input.files[0] })
        }
    }

    const openInputElementOrDeleteImage = () => {
        if (option.image) {
            onChange({ ...option, image: null });
            return;
        }

        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    return (
        <Card sx={{ boxShadow: 8 }}>
            {option.image &&
                <div className="option-preview-container">
                    <ImagePreview file={option.image} />
                </div>
            }
            <CardContent>
                <div className="option-container">
                    <div>
                        <Checkbox checked={option.defaultIsChecked} onChange={handleChangeDefaultChecked} />
                    </div>
                    <div className="option-container-input">
                        <TextInput
                            error={showErrors && !option.name}
                            value={option.name}
                            placeholder={'Option ' + (index + 1)}
                            onChange={handleChangeName}
                        />
                    </div>
                    <div className="option-container-right">
                        <input
                            type="file"
                            className="option-input-file"
                            ref={inputRef}
                            onChange={handleChangeImage}
                        />
                        <div className="option-container-icon" onClick={openInputElementOrDeleteImage}>
                            <FileImageOutlined />
                        </div>
                        {
                            canBeDelete &&
                            <div className="option-container-icon" onClick={handleDeleteOption}>
                                <DeleteOutlined />
                            </div>
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// <Card>
//     {option.image &&
//         <div className="option-preview-container">
//             <ImagePreview file={option.image} />
//         </div>
//     }
//     <div className="option-container">
//         <div>
//             <Checkbox checked={option.defaultIsChecked} onChange={handleChangeDefaultChecked} />
//         </div>
//         <div className="option-container-input">
//             <TextInput
//                 value={option.name}
//                 placeholder={'Option ' + (index + 1)}
//                 onChange={handleChangeName}
//             />
//         </div>
//         <div className="option-container-right">
//             <input
//                 type="file"
//                 className="option-input-file"
//                 ref={inputRef}
//                 onChange={handleChangeImage}
//             />
//             <div className="option-container-icon" onClick={openInputElementOrDeleteImage}>
//                 <FileImageOutlined />
//             </div>
//             {
//                 canBeDelete &&
//                 <div className="option-container-icon" onClick={handleDeleteOption}>
//                     <DeleteOutlined />
//                 </div>
//             }
//         </div>
//     </div>
// </Card>
