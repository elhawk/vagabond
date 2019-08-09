import React from 'react';
import { IItemToAdd, IItemField } from './AddItem';

export interface IFormProps {
    itemToAdd: IItemToAdd,
    handleInput: ((event: React.ChangeEvent<HTMLInputElement> ) => (void)),
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void, 
    onCancel: () => void,
    userName: string
}

export class Form extends React.Component<IFormProps> {
    
    render() {
        let formInputs = [];
        for(let key of Object.keys(this.props.itemToAdd.item)) {
            formInputs.push(this.createFormInput(key, this.props.itemToAdd.item[key], this.props.handleInput));
        }
    
        formInputs.push(<input type="hidden" name="userName" key="userName" value={this.props.userName}></input>)
    
        return (
            <form className="Form light-border" onSubmit = {this.props.onSubmit}>
                {formInputs}
                <div>
                    <button className="space-right" type="submit">Add</button>
                    <button className="space-right" type="submit" onClick={this.props.onCancel}>Cancel</button> 
                </div>
            </form>
        );
    }

    createFormInput(key: string, item: IItemField, handleInput: ((event: React.ChangeEvent<HTMLInputElement> ) => (void) )) {
        return (
            // todo: make this key guaranteed unique
            <div className="form-line" key={key}>
                <span className="space-right">{item.name}</span>
                <input 
                    name={key}
                    type={item.type.toString()} 
                    required={item.required}
                    onChange={handleInput}></input>
            </div>);   
    }
}