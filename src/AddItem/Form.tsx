import React from 'react';
import { Field } from './Field';

export interface IFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void, 
    onCancel: () => void,
    userName: string,
    renderFields: () => React.ReactNode
}

export class Form extends React.Component<IFormProps> {
    
    render() {  
        // formInputs.push(<input type="hidden" name="userName" key="userName" value={this.props.userName}></input>)   
        return (
            <form className="Form light-border" onSubmit = {this.props.onSubmit}>
                {this.props.renderFields()}
                <div>
                    <button className="space-right" type="submit">Add</button>
                    <button className="space-right" type="submit" onClick={this.props.onCancel}>Cancel</button> 
                </div>
            </form>
        );
    }
}