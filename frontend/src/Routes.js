import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Poll from './pages/Poll';
import PollResults from './pages/PollResults';
import PollCreate from './pages/PollCreate';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Dashboard} exact />
                <Route path='/create' component={PollCreate} exact />
                <Route path='/poll/:id' component={Poll} exact />
                <Route path='/poll/:id/results' component={PollResults} />
            </Switch>
        </BrowserRouter>
    );
}
