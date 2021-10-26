import React, { FC } from 'react';
import { useHistory } from "react-router-dom";

export const Home: FC = () => {
    const history = useHistory();

    return (
        <div>Home</div>
    )
}
