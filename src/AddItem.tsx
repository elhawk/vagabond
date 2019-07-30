import React from 'react';
import { clone } from './clone';

// I want to restrict the allowed types to put into this form
// is there a less janky way to do this? TODO follow up.
export enum ItemFieldTypes {
    stringType = "string",
    numberType = "number",
    dateType = "date"
}

// Describes the data contained in an item we want to have, in the form
// of a mapping of keys to data fields it must contain.
export interface IItemToAdd {
    item: {[itemKey: string] : IItemField};
}

// Data field describing part of an item, which will be represented in a form input
export interface IItemField {
    name: string;
    required: boolean;
    type: ItemFieldTypes;
    value?: any;
}

export interface IAddItemProps {
    // callback when a new item is added
    onItemAddedCallback(itemAdded : IItemToAdd) : void;

    // description of the type of item we are adding, used to build the form
    itemToAdd: IItemToAdd;

    // The name of the item we are adding -- displayed on the Add button.
    itemName: string;
}

interface IAddItemState {
    showForm: boolean;
}

// Add Item provides an "Add Item button" which, when clicked, will 
// open a form for the user to input values described in the passed in prop
export class AddItem extends React.Component<IAddItemProps, IAddItemState> {
    currentItem : IItemToAdd;
    
    constructor(props: IAddItemProps) {
        super(props);

        this.state = {showForm: false};
        this.currentItem = clone(props.itemToAdd);

        this.handleInput = this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
    }

    render() {
        if (this.state.showForm) {
            return <AddForm 
                itemToAdd={this.props.itemToAdd}
                handleInput={this.handleInput}
                onSubmit= {this.onSubmit}
                onCancel={this.onCancel}/>
        } else {
            return <AddButton 
                onClick={this.onAddClick}
                itemName={this.props.itemName}/>
        }
    }

    onAddClick() {
        this.setState({showForm: true});
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.props.onItemAddedCallback(clone(this.currentItem));
        this.currentItem = clone(this.props.itemToAdd);
        this.setState({showForm: false});
        event.preventDefault();
    }

    onCancel() {
        this.setState({showForm: false});
        this.currentItem = clone(this.props.itemToAdd);
    }

    // We want to save off what the user has entered into the form so that we have it
    // handy when the form is submitted
    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.currentItem.item[event.target.name].value = event.target.value;
    }
}

function createFormInput(key: string, item: IItemField, handleInput: ((event: React.ChangeEvent<HTMLInputElement> ) => (void) )) {
    return (
        // todo: make this key guaranteed unique
        <p key={key}>
            {item.name}
            <input 
                name={key}
                type={item.type.toString()} 
                required={item.required}
                onChange={handleInput}></input>
        </p>);   
}

function AddForm(props: {
    itemToAdd: IItemToAdd,
    handleInput: ((event: React.ChangeEvent<HTMLInputElement> ) => (void)),
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void, 
    onCancel: () => void}
){
    let formInputs = [];
    for(let key of Object.keys(props.itemToAdd.item)) {
        formInputs.push(createFormInput(key,  props.itemToAdd.item[key], props.handleInput));
    }

    // TODO: implement cancel
    return (
        <form onSubmit = {props.onSubmit}>
            {formInputs}
            <button type="submit">Add</button>
            <button type="submit" onClick={props.onCancel}>Cancel</button> 
        </form>
    )
}

function AddButton(props: {onClick: () => void, itemName: string}) {
    return (
        <button onClick={props.onClick}>Add {props.itemName}</button>
    );
}