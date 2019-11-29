import React from 'react'
const AuthCheck = ({ component: Component, ...props }) => {
    return (
        <Route
            render={innerProps =>
                myAuth.isAuth ?
                    <Component {...innerProps} />
                    :
                    <Redirect to="/login" />
            }
        />
    );
};

export default AuthCheck;