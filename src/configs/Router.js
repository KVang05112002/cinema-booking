import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import CataLog from '../pages/CataLog';
import Detail from '../pages/detail/Detail';
import Login from '../component/login/Login';
// import Booking from '../component/booking/Booking';
import Register from '../component/register/Register';
import NotFound from '../component/NotMatch/NotFound';
import Seats from '../component/booking/Seats';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact> <Home /> </Route>
            {/* <Route path='/booking' > <Booking /> </Route> */}
            <Route path='/login' exact ><Login /></Route>
            <Route path='/register' exact ><Register /></Route>
            <Route path='/notfound' exact ><NotFound /></Route>
            <Route path='/seats' exact ><Seats /></Route>
            <Route path='/seats/:id' exact ><Seats /></Route>
            <Route path='/:catalog/:id' > <Detail /> </Route>
            <Route path='/:catagory' > <CataLog /> </Route>

        </Switch>
    )
}

export default Routes;