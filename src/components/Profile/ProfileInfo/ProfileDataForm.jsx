import React from 'react'
import s from './ProfileDataForm.module.css'
import {Input, createField, Textarea} from '../../common/FormsControls/FormsControls'
import {reduxForm} from 'redux-form'
import styles from '../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save profile data</button>
        </div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <div className={s.fullName}>{createField("Full name", "fullName", [], Input)}</div>
        </div>
        <div>
            <div><b>Looking for a
                job:</b> {createField("lookingForAJob", "lookingForAJob", [], Input, {type: "checkbox"})}</div>
            <div><b>My professional skills:</b>
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}</div>
        </div>
        <div>
            <div><b>About me:</b> {createField("About me", "aboutMe", [], Textarea)}</div>
        </div>

        <div>
            <b>Contact:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm