import React from 'react';
// import LoggedIn from '../HOC/SignedIn'
import NavBarOpener from '../componentsNavBar/NavBarOpener';

const Chart = () => {
    return (
        <React.Fragment>
            <div className="chart">
                <p>this is a chart page.
                i need: HPI, ROS, PE, A/P sections
                need chief complaint/problem 
                </p>
                <NavBarOpener />  
            </div>
        </React.Fragment>
    )
}

export default (Chart);