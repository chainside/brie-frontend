
import { StateMachine } from 'redux-sigma';
import { StrictEffect } from '@redux-saga/types';
import { call, put } from "typed-redux-saga/macro";
import { login } from '../../../services/Login/LoginServices';
import { LoginResponse } from '../../../services/Login/api';
import { ChangeEvent, SubLoginEvents, errorServerLoginAction, failedLoginAction, successLoginAction } from './login.events';
import { StateMachineNames } from '../StateMachinesNames';




interface Context {
    email: string;
    password: string;
    user: LoginResponse;
    rememberMe: boolean;
    loginError: boolean;
}




export enum SubLoginStates {
    starting = 'starting',
    failed = 'failed',
    logging = 'logging'
}


export class LoginCallerMachine extends StateMachine<
    SubLoginEvents,
    SubLoginStates,
    StateMachineNames,
    Context
>  {
    initialState = SubLoginStates.starting;

    name = StateMachineNames.subLogin;


    spec = {
        [SubLoginStates.starting]: {
            reactions: {
                [SubLoginEvents.changedAction]: this.changeValue
            },
            transitions: {
                [SubLoginEvents.failedEvent]: SubLoginStates.failed,
                [SubLoginEvents.doLogin]: SubLoginStates.logging

            },

        },
        [SubLoginStates.logging]: {
            onEntry: [this.login],
            transitions: {
                [SubLoginEvents.failedEvent]: SubLoginStates.failed
            },


        },
        [SubLoginStates.failed]: {
            onEntry: this.failed,
            transitions: {
                [SubLoginEvents.failedEvent]: SubLoginStates.failed
            },
        },


    };
    *failed(): Generator<StrictEffect, void> {
        yield* put(failedLoginAction())
    }

    *login(): Generator<StrictEffect, void> {
        try {

            const logInObject = {
                email: this.context.email,
                password: this.context.password,
                remember: this.context.rememberMe

            };

            const res = yield* call(login, logInObject)

            if (res.data.statusCode) {
                yield* this.setContext(ctx => {
                    ctx.loginError = true
                });

                yield* put(failedLoginAction())

            }
            else {
                yield* this.setContext(ctx => {
                    ctx.user.data = res.data
                    ctx.email = ""
                    ctx.password = ""
                    ctx.loginError = false

                });

                yield* put(successLoginAction(this.context.user.data))
            }


        }

        catch (e) {
            yield* this.setContext(ctx => {

                ctx.email = ""
                ctx.password = ""

            });
            yield* put(errorServerLoginAction())
        }
    }


    *changeValue(event: ChangeEvent): Generator<StrictEffect, void> {

        switch (event.payload.name) {
            case SubLoginEvents.changedEmail:
                return yield* this.setContext(ctx => {
                    ctx.email = String(event.payload.value)
                })
            case SubLoginEvents.changePassword:
                return yield* this.setContext(ctx => {
                    ctx.password = String(event.payload.value)
                })
            case SubLoginEvents.changeRemember:
                return yield* this.setContext(ctx => {
                    ctx.rememberMe = Boolean(event.payload.value)
                })
            default:
                break;

        }

    }


    *resetLoginError(): Generator<StrictEffect, void> {
        yield* this.setContext(ctx => {
            ctx.loginError = false
        });
    }
}




export const loginCallerMachine = new LoginCallerMachine();


