import React from 'react';

// I want to restrict the allowed types to put into this form
// is there a less janky way to do this? TODO follow up.
export enum ItemFieldTypes {
    stringType = "string",
    numberType = "number",
    dateType = "date"
}

export interface IItemToAdd {
    name: string;
    required: boolean;
    type: ItemFieldTypes;
    value?: any;
}

export interface IAddItemProps {
    onItemAddedCallback(itemsAdded : IItemToAdd[]) : void;
    itemsToAdd: IItemToAdd[];
}

// Add Item provides an "Add Item button" which, when clicked, will 
// open a form for the user to input values described in the passed in prop
export class AddItem extends React.Component<IAddItemProps> {
    render() {
        return <AddForm 
            itemsToAdd={this.props.itemsToAdd}
            handleInput={this.handleInput}
            onSubmit= {() => {}}/>
    }

    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        let name: string = event.target.name;
        let value: string = event.target.value.toString();
        console.log(value); 
    }
}

// todo: add state tracking stuff
function createFormInput(item: IItemToAdd, handleInput: ((event: React.ChangeEvent<HTMLInputElement> ) => (void) )) {
    return (
        // todo: make this key guaranteed unique
        <p key={item.name}>
            {item.name}
            <input 
                type={item.type.toString()} 
                required={item.required}
                onChange={handleInput}></input>
        </p>);   
}

function AddForm(props: {
    itemsToAdd: IItemToAdd[],
    handleInput: ((event: React.ChangeEvent<HTMLInputElement> ) => (void)),
    onSubmit: ()=> void} ){
    let formInputs = [];
    for(let item of props.itemsToAdd) {
        formInputs.push(createFormInput(item, props.handleInput));
    }
    return (
        <form onSubmit = {props.onSubmit}>
            {formInputs}
            <input type="submit"></input>
        </form>
    )
}

function AddButton(props: {onClick: () => void, itemName: string}) {
    return (
        <button onClick={props.onClick}>Add {props.itemName}</button>
    );
}