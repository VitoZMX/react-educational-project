import {Field, Form, Formik, FormikHelpers} from 'formik'
import React from 'react'
import {FilterType} from '../../redux/users-reducer'

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

// type FormType = {
//     term: string
//     friend: 'true' | 'false' | 'null'
// }

type FormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<FormPropsType> = React.memo((props) => {

    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

        // const filter: FilterType = {
        //     term: values.term,
        //     friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        // }

        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: null}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})