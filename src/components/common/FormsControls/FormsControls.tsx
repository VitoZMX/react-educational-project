import React from 'react'
import styles from './FormsControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'
import {FieldValidatorType} from '../../../utils/validators/validators'

type FormsControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode // эту строку можно не указывать, вшито в React.FC
}

const FormControl: React.FC<FormsControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<FieldValidatorType>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props = {},
                                                         text = '') {
    return <div>
        <Field placeholder={placeholder}
               validate={validators}
               name={name}
               component={component}
               {...props}/> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, | string>