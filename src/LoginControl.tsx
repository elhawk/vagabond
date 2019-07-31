import React from 'react';

interface ILoginControlProps {
    onLoggedInChange(loggedIn: boolean, userName: string) : void;
    isLoggedIn: boolean;
}

// A dummy login control, to be replaced by something real later.
// For now this just users the user name for a greeting and trip ownership,
// and ignores the password altogether.
export class LoginControl extends React.Component<ILoginControlProps> {
    // tracks the value currently in the username form, to pass back to the App on log in.
    userNameFormContents: string;

    constructor(props: ILoginControlProps) {
        super(props);

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginInput = this.handleLoginInput.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginInput(event: React.ChangeEvent<HTMLInputElement>) {
        let name: string = event.target.name;
        let value: string = event.target.value.toString();
        if (name === "username")
            this.userNameFormContents = value;          
    }

    handleLoginClick(event: React.FormEvent<HTMLFormElement>) {
        this.props.onLoggedInChange(true, this.userNameFormContents);
        event.preventDefault();
    }

    handleLogoutClick() {
        this.props.onLoggedInChange(false, "");
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    Hello, {this.userNameFormContents}! 
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
        <div className="container">
            <h1>Please log in</h1>
            <form onSubmit={props.handleLoginClick}>
                Username: 
                <input 
                    type="text" 
                    name="username"
                    onChange={props.handleInput} />
                Password:
                <input 
                    type="password"
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
