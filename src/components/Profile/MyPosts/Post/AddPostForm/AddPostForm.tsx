import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Input} from '../../../../common/FormsControls/FormsControls'
import {required} from '../../../../../utils/validators/validators'
import React from 'react'

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFromValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> =
    (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<AddPostFromValuesTypeKeys>('You post', 'newPostText',
                        [required], Input)}
                </div>
                <div>
                    <button>Add post</button>
                    {/*<button>Remove</button>*/}
                </div>
            </form>
        )
    }

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profile-add-post'})(AddPostForm)