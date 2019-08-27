import React from 'react';
import {clone} from '../utils/clone';
let uuidv1 = require('uuid/v1');

export interface IFormProps {
    action: string;
    onCancel: () => void,
    postData: IFormValues,
    renderFields: (onFieldChangeCallback: (e: React.FormEvent<HTMLInputElement>) => void) => React.ReactNode,
    onSuccessfulPost: (addedItem: IFormValues) => void;
}

export interface IFormValues {
    // key is the field id, value is the input value
    [key: string]: any;
}

export class Form extends React.Component<IFormProps> {
    // The form values which we save off when the fields are changed.  This is not part of the 
    // element state since we don't want to rerender.
    formValues: IFormValues = {};

    constructor(props: IFormProps) {
        super(props);

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.formValues = props.postData;
    }

    private async handleSubmit(e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        this.formValues.id = uuidv1();

        let submitSucceeded: boolean = await this.submitForm();

        if (submitSucceeded) {
            this.props.onSuccessfulPost(clone(this.formValues));
        } else {
            alert("Unexpected error submitting item");
        }

        this.formValues.id = undefined;
    }

    private async submitForm(): Promise<boolean>{       
        try {
            let response = await fetch(this.props.action, {
                method: "post",
                headers: new Headers({"Content-Type" : "application/json", Accept: "application/json"}),
                body: JSON.stringify(this.formValues)
            });
            return response.status === 200;
        } catch (ex) {
            return false;
        }
    }

    private onFieldChange(e: React.FormEvent<HTMLInputElement>) {
        this.formValues[e.currentTarget.id] = e.currentTarget.value;
    }
    
    render() {  
        return (
            <form className="Form light-border" onSubmit = {this.handleSubmit}>
                {this.props.renderFields(this.onFieldChange)}
                <div>
                    <button className="space-right" type="submit">Add</button>
                    <button className="space-right" type="submit" onClick={this.props.onCancel}>Cancel</button> 
                </div>
            </form>
        );
    }
}