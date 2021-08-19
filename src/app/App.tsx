import React, {useContext} from 'react'
import '../shared/providers/styles/styles.providers.scss';
import './App.scss'
import AppLayout from '../shared/layouts/';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from "react-router-dom";
import {routes} from "../shared/routes/routes";
import {Login} from '../shared/layouts/login/login';
import {QueryParamProvider} from "use-query-params";
import {ILayoutProvider} from "../shared/layouts/interface.layout";
import {SessionContext} from '../shared/providers/context/session.provider';

const App = () => {
    const {isAuthenticated}: any = useContext<ILayoutProvider>(SessionContext);
    return (
        <BrowserRouter>
            <Router>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <Switch>
                        {routes.map(route => (
                            isAuthenticated ?
                                <AppLayout>
                                    <Route exact path={route.routeTo} component={route.component}/>
                                </AppLayout>
                                :
                                <Route exact path='/' component={Login}/>
                        ))}
                    </Switch>
                </QueryParamProvider>
            </Router>
        </BrowserRouter>
    );
};

export default App;
