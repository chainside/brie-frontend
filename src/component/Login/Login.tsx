
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material"
import css from "./Login.module.css"
import { useCallback, useState } from "react"

import React from 'react';
import { useLogin, } from "../../store/stms/login/login.hook";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";


export const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const changePasswordVisibility = useCallback(() => { setShowPassword(!showPassword) }, [showPassword])
    const { password, email, remember, doLogin, error, disabled, rememberCheck } = useLogin()



    return (
        <div className={css["login-background"]}>
            <form onSubmit={doLogin}
                className={css["login-card"]}>
                <div className={css["login-card-content"]}>
                    <div>
                        <Typography variant="h2" marginBottom={'16px'} textAlign={'center'}>Accesso utente</Typography>
                        <Typography variant="subtitle1" color={'#C8C6CA99'} textAlign={'center'} marginBottom={'10px'}>Inserisci le credenziali per effettuare il login alla piattaforma</Typography>
                    </div>
                    <FormControl
                        variant="outlined"
                        error={error}>

                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            label="Email"
                            classes={{ notchedOutline: error ? "text-outlined-error" : "text-outlined-base" }}
                            placeholder="Email"
                            onChange={email}
                        />
                    </FormControl>
                    <FormControl variant="outlined" error={error}>

                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput

                            classes={{ notchedOutline: error ? "text-outilined-error" : "text-outilined-base" }}
                            type={showPassword ? 'text' : 'password'}

                            endAdornment={

                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={changePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOutlined className={css["gray"]} /> : <VisibilityOffOutlined className={css["gray"]} />}
                                    </IconButton>
                                </InputAdornment>

                            }


                            label="Password"
                            onChange={password}
                        />


                    </FormControl>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox onChange={remember}
                        />}
                        label="Ricordami"
                        labelPlacement="end"
                        checked={rememberCheck}
                    />
                    <Button
                        variant="contained"
                        onClick={doLogin}
                        color="primary"
                        disabled={disabled}>Login</Button>

                </div>
            </form>
        </div>
    )
}


