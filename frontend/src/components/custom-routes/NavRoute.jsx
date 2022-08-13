import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../navigations/Navigation';

export default function NavRoute({ component: Component, title, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Navigation title={title}>
                    <Component {...props} />
                </Navigation>
            )}
        />
    );
}
