import React from 'react';
import { ILoginControlProps, LogoutButton } from './LoginControl';

// Header which displays the app name and, if logged in, also shows a greeting and logout button
export function Header(props: ILoginControlProps) {
    let greeting;
    if (props.isLoggedIn) {
        greeting = "Hello, " + props.userName + "!";
    }

    let logOut;
    if (props.isLoggedIn) {
        logOut = <LogoutButton onClick={() => props.onLoggedInChange(false, "")}/>
    }

    return (
        <div className="App-header container">
            <h1>vagabond</h1>
            {greeting}
            {logOut}
        </div>
    );
}