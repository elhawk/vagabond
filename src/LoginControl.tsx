import React from 'react';

interface ILoginControlState {
    isLoggedIn: boolean,
    username: string,
    password: string,
}

interface ILoginControlProps {
    loginStateChangedCallback(loggedIn: boolean) : void;
}

export class LoginControl extends React.Component<ILoginControlProps, ILoginControlState> {

    constructor(props: ILoginControlProps) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginInput = this.handleLoginInput.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false,
            username: "",
            password: "",
        }
    }

    handleLoginInput(event: React.ChangeEvent<HTMLInputElement>) {
        let name: string = event.target.name;
        let value: string = event.target.value.toString();
        if (name === "username")
            this.setState({username: value});
        else
            this.setState({password: value});           
    }

    handleLoginClick(event: React.FormEvent<HTMLFormElement>) {
        this.setState({isLoggedIn : true});
        this.props.loginStateChangedCallback(true);
        event.preventDefault();
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn : false,
            username: "",
            password: ""});
        this.props.loginStateChangedCallback(false);
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div>
                    Hello, {this.state.username}! 
                    <LogoutButton onClick={this.handleLogoutClick}/>
                </div>);
        } else {
            return (
                <LoginForm handleLoginClick={this.handleLoginClick} handleInput={this.handleLoginInput}/>
            );
        }
    }
}

interface ILoginFormProps {
    handleInput(event: React.ChangeEvent<HTMLInputElement>) : void;
    handleLoginClick(event: React.FormEvent<HTMLFormElement>) : void;
}

function LoginForm(props: ILoginFormProps) {
    return (
        <div>
            <h1>Log In Please</h1>
            <form onSubmit={props.handleLoginClick}>
            Username:
            <input 
                type="text" 
                name="username"
                onChange={props.handleInput} />
            Password:
            <input 
                type="text"
                name="password"
                onChange={props.handleInput} />
            <input type="submit" value="Log In" />
            </form>
        </div>
    );
}

  function LogoutButton(props: {onClick: (()=> void)}){
      return (
          <button onClick={props.onClick}>Log Out</button>
      );
  }
