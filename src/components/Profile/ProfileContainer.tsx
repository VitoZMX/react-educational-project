import React, {useEffect} from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {useNavigate, useParams} from 'react-router-dom'
import {RouteProps} from 'react-router'
import {compose} from 'redux'
import {AppStateType} from '../../redux/redux-store'
import {ProfileType} from '../../types/types'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export type PathParamsType = {
    userId?: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteProps

const ProfileContainer: React.FC<PropsType> = (props) => {
    const navigate = useNavigate()
    const params = useParams<PathParamsType>()

    useEffect(() => {
        const refreshProfile = async () => {
            let userId = params.userId ? +params.userId : props.authorizedUserId
            if (!userId) {
                console.error('ID should exist in URI params or in state (\'authorizedUserId\')')
                return
            }
            await props.getUserProfile(userId)
            props.getStatus(userId)
        }

        refreshProfile()
    }, [params.userId, props.authorizedUserId, props.getUserProfile, props.getStatus])

    const isOwner = !params.userId

    return (
        <Profile
            {...props}
            isOwner={isOwner}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto}
        />
    )
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}), withAuthRedirect
)(ProfileContainer)

/*
 ---Классовая компонента которую так и не получиолось исправить в RouteComponentProps---
import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import {RouteComponentProps} from 'react-router-dom'
import {compose} from 'redux'
import {AppStateType} from '../../redux/redux-store'
import {ProfileType} from '../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export type PathParamsType = {
    userId?: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props)
    }

    refreshProfile() {
        let userId: number | null = +this.props.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }

        if (!userId) {
            console.error("ID should exist in URI params or in state ('authorizedUserId')")
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.params.userId != prevProps.params.userId) {
            this.refreshProfile()
        }
    }

    componentWillUnmount(): void {
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component {...props} router={{location, navigate, params}}/>
        )
    }

    return ComponentWithRouterProp
}

// export default compose(
//     withAuthRedirect,
//     connect(mapStateToProps, {
//         getUserProfile, getStatus,
//         updateStatus, savePhoto, saveProfile
//     }), withRouter)(ProfileContainer)

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer)*/