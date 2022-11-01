import React from 'react'
import {connect} from 'react-redux'
import {
    requestUsers,
    follow,
    setCurrentPage,
    unfollow,
    toggleFollowingProgress,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {compose} from 'redux'
import {
    getUsers,
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getToggleFollowingProgress,
    getTotalUserCounter
} from '../../redux/users-selectors'

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUserCounter={this.props.totalUserCounter}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUserCounter: state.usersPage.totalUserCounter,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         toggleFollowingProgress: state.usersPage.toggleFollowingProgress,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCounter: getTotalUserCounter(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        toggleFollowingProgress: getToggleFollowingProgress(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers})
)(UsersContainer)