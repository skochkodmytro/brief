import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import './Login.css';

import { login } from "../../store/user/user-actions";
import { TextInput } from "../../components/TextInput/TextInput";
import { AppState } from "../../store/rootStore";
import { FetchStatus } from "../../enums";

interface ILoginForm {
    login: string
    password: string
}

export const Login = () => {
    const dispatch = useDispatch();
    const loginStatus = useSelector<AppState, null | FetchStatus>(state => state.user.fetchStatus);
    const user = useSelector<AppState, null | UserType>(state => state.user.user);
    const { control, handleSubmit } = useForm<ILoginForm>();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (loginStatus === FetchStatus.FAILURE) {
            enqueueSnackbar('Email or password is incorrect', { variant: 'error' });
        }
    }, [loginStatus]);

    if (user) {
        return <Redirect to={{ pathname: '/' }} />
    }

    const submit = async (data: ILoginForm) => {
        await dispatch(login(data.login, data.password));
    }

    return (
        <div className="login-page">
            <div className="login-page-wrapper">
                <div>
                    <LockOutlinedIcon />
                </div>
                <Typography variant="h4" gutterBottom component="div">
                    Log In
                </Typography>

                <form>
                    <Box sx={{ marginBottom: 2 }}>
                        <Controller
                            control={control}
                            name="login"
                            rules={{ required: true }}
                            render={({ field, fieldState: { invalid, isDirty }, formState: { isSubmitted } }) => (
                                <TextInput
                                    {...field}
                                    error={(isSubmitted && invalid) || (invalid && isDirty)}
                                    placeholder="Login"
                                    fullWidth
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: true, minLength: 6, maxLength: 20 }}
                            render={({ field, fieldState: { invalid, isDirty }, formState: { isSubmitted } }) => (
                                <TextInput
                                    type="password"
                                    {...field}
                                    error={(isSubmitted && invalid) || (invalid && isDirty)}
                                    placeholder="Password"
                                    fullWidth
                                />
                            )}
                        />
                    </Box>

                    <LoadingButton
                        onClick={handleSubmit(submit)}
                        loading={loginStatus === FetchStatus.PENDING}
                        disabled={loginStatus === FetchStatus.PENDING}
                        variant="outlined"
                        fullWidth
                    >
                        Log In
                    </LoadingButton>
                    {/*<Button fullWidth variant="contained" onClick={handleSubmit(submit)}>Log In</Button>*/}
                </form>
            </div>
        </div>
    )
}
