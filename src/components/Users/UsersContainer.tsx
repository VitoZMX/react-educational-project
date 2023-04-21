import React from 'react'
import {connect} from 'react-redux'
import {
    requestUsers,
    follow,
    unfollow, FilterType,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {compose} from 'redux'
import {
    getUsers,
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUserCounter, getUsersFilter
} from '../../redux/users-selectors'
import {UserType} from '../../types/types'
import {AppStateType} from '../../redux/redux-store'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUserCounter: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void

}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter)
    }

    render() {

        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUserCounter={this.props.totalUserCounter}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   onFilterChanged={this.onFilterChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCounter: getTotalUserCounter(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {follow, unfollow, getUsers: requestUsers})
)(UsersContainer)