import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import role from '_constants/role';

function NotLoggedInRoute({component: Component, ...rest}) {
    const currentUser = useSelector(
        state => state.user.currentUser,
    );
    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser)
                    return (
                        <Redirect
                            to={{
                                pathname: role.get(
                                    currentUser.role,
                                ).url,
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                return <Component {...props} />;
            }}
        />
    );
}

export default NotLoggedInRoute;
