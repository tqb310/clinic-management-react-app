import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Routes from 'pages/_routes';

//Fake user data storage
//const currentUser = {name: 'Bao', role: '1', jwt: '1234'};
const Unauthorized = () => (
    <div>
        Tài khoản của bạn không có quyền truy cập trang này
    </div>
);

function PrivateRoute({
    component: Component,
    role,
    ...rest
}) {
    const currentUser = useSelector(
        state => state.user.current,
    );

    const filteredRoutes = Routes.filter(
        ({roles}) =>
            roles &&
            currentUser &&
            roles.includes(currentUser.role),
    );

    return (
        <Route
            {...rest}
            render={props => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/dang-nhap',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }

                if (role && role !== currentUser.role) {
                    return <Unauthorized {...props} />;
                }

                return (
                    <Component
                        {...props}
                        filteredRoutes={filteredRoutes}
                    />
                );
            }}
        />
    );
}

PrivateRoute.propTypes = {
    component: PropTypes.object.isRequired,
    path: PropTypes.string,
    roles: PropTypes.string,
};

export default PrivateRoute;
