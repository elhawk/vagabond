import React from 'react';
import { clone } from '../utils/clone';
import { Form } from './Form';

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

    // Title to display before the add button
    title: string;

    // Url to post the added item to
    action: string;

    // User credentials to attach to the post
    userName: string;
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
        this.resetForm = this.resetForm.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
    }

    render() {
        let formOrButton: JSX.Element;

        // We want to show the form below the title, but the button next to the title
        // handle this by adding a css class when we are in form mode.
        let flexDirectionClass: string = "";

        if (this.state.showForm) {
            formOrButton = <Form 
                itemToAdd={this.props.itemToAdd}
                handleInput={this.handleInput}
                onSubmit= {this.onSubmit}
                onCancel={this.resetForm}
                userName={this.props.userName}/>
            flexDirectionClass = "column-flex-direction";
        } else {
            formOrButton = <AddButton
                onClick={this.onAddClick}
                itemName={this.props.itemName}/>
        }

        return (
            <div className={"add-item container " + flexDirectionClass}>
                <h2 className="add-item-title">{this.props.title}</h2>
                {formOrButton}
            </div>
        )
    }

    onAddClick() {
        this.setState({showForm: true});
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        this.props.onItemAddedCallback(clone(this.currentItem));
        
        this.resetForm();
        
        event.preventDefault();
    }

    private async submitForm(event: React.FormEvent<HTMLFormElement>) : Promise<boolean> {
        try {

            let response = await fetch(this.props.action, {
                method: "post",
                body: JSON.stringify(event.target) // TODO fix
            });
            return true;
        } catch (ex) {
            return false;
        }
    }

    resetForm() {
        this.currentItem = clone(this.props.itemToAdd);
        this.setState({showForm: false});
    }

    // We want to save off what the user has entered into the form so that we have it
    // handy when the form is submitted
    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.currentItem.item[event.target.name].value = event.target.value;
    }
}

function AddButton(props: {onClick: () => void, itemName: string}) {
    return (
        <button onClick={props.onClick}>Add {props.itemName}</button>
    );
}