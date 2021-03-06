import React from 'react';
import { Form, IFormValues } from './Form';

export interface IAddItemProps {
    // callback when a new item is added
    onItemAddedCallback(itemAdded : IFormValues) : void;

    // fields to render in the form.  Callback to share state between fields and form
    renderFields: (onFieldChangeCallback: (e: React.FormEvent<HTMLInputElement>) => void) => React.ReactNode

    // The name of the item we are adding -- displayed on the Add button.
    itemName: string;

    // Title to display before the add button
    title: string;

    // Url to post the added item to
    action: string;

    // Data we do not want to get from the user, but still want to send on the post.  For instance, the user's credentials.
    // In the case of expenditures, this also includes the guid ID of the trip the expenditure belongs to.
    postData: IFormValues;
}

interface IAddItemState {
    showForm: boolean;
}

// Add Item provides an "Add Item button" which, when clicked, will 
// open a form for the user to input values described in the passed in prop
export class AddItem extends React.Component<IAddItemProps, IAddItemState> {
    
    constructor(props: IAddItemProps) {
        super(props);

        this.state = {showForm: false};

        this.resetForm = this.resetForm.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onSuccessfulPost = this.onSuccessfulPost.bind(this);
    }

    render() {
        let formOrButton: JSX.Element;

        // We want to show the form below the title, but the button next to the title
        // handle this by adding a css class when we are in form mode.
        let flexDirectionClass: string = "";

        if (this.state.showForm) {
            formOrButton = <Form 
                action = {this.props.action}
                renderFields = {this.props.renderFields}
                onSuccessfulPost = {this.onSuccessfulPost}
                onCancel = {this.resetForm}
                postData = {this.props.postData}/>
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

    onSuccessfulPost(item: IFormValues) {
        this.props.onItemAddedCallback(item);
        this.setState({showForm: false});
    }

    onAddClick() {
        this.setState({showForm: true});
    }

    resetForm() {
        this.setState({showForm: false});
    }
}

function AddButton(props: {onClick: () => void, itemName: string}) {
    return (
        <button onClick={props.onClick}>Add {props.itemName}</button>
    );
}