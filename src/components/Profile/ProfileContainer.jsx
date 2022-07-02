import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/ProfileReducer";
import {useParams} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

function withRouter(Component) {
    return (props) => {
        const match = {params: useParams()};
        return <Component {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 24726
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(withRouter(ProfileContainer))

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {getUserProfile})(AuthRedirectComponent)