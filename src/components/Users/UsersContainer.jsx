import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {follow, requestUsers, setCurrentPage, toggleIsFollowingInProgress, unfollow} from "../../redux/UsersReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        console.log('Render')
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
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

/*let mapStateToProps = (state) => {
    return (
        {
            users: state.usersPage.users,
            pageSize: state.usersPage.pageSize,
            totalUsersCount: state.usersPage.totalUsersCount,
            currentPage: state.usersPage.currentPage,
            isFetching: state.usersPage.isFetching,
            followingInProgress: state.usersPage.followingInProgress
        }
    )
}*/

let mapStateToProps = (state) => {
    console.log('map state to props')
    return (
        {
            users: getUsers(state),
            pageSize: getPageSize(state),
            totalUsersCount: getTotalUsersCount(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            followingInProgress: getFollowingInProgress(state)
        }
    )
}

const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowingInProgress,
    getUsers: requestUsers
})(withAuthRedirect(UsersAPIComponent))

export default compose(
    connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowingInProgress,
    getUsers: requestUsers
}),
    withAuthRedirect
)(UsersAPIComponent)