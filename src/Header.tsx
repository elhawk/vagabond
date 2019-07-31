import React from 'react';

export function Header(props: {greetingName: string, isLoggedIn: boolean}) {
    if (props.isLoggedIn) {

    }

    return (
        <div className="App-header container">
            <h1>vagabond</h1>
        </div>
    );
}