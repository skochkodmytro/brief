import React, { FC, useEffect, useState } from 'react';

import './ImagePreview.css';

type OwnProps = {
    file: File
}

export const ImagePreview: FC<OwnProps> = ({ file }) => {
    const [dataUrl, setDataUrl] = useState<string>();

    useEffect(() => {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = function() {
            const result = this.result as string;
            setDataUrl(result);
        }
    }, []);

    return dataUrl ? <img src={dataUrl} alt="Option preview" className="image-preview" /> : null
}
