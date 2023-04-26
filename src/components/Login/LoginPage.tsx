import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Navigate} from 'react-router-dom'
import styles from '../common/FormsControls/FormsControls.module.css'
import {AppDispatch, AppStateType} from '../../redux/redux-store'

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, error, captchaUrl}) => {
        return (
            <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
                {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
                {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember Me')}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

export const LoginPage: React.FC = (props) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch: AppDispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}