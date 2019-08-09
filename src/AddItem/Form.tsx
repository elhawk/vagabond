import React from 'react';

export interface IFormProps {
    action: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void, 
    onCancel: () => void,
    userName: string,
    renderFields: (onFieldChangeCallback: (e: React.FormEvent<HTMLInputElement>) => void) => React.ReactNode
}

interface IFormValues {
    // key is the field id, value is the input value
    [key: string]: any;
}

export class Form extends React.Component<IFormProps> {
    // The form values which we save off when the fields are changed.  This is not part of the 
    // element state since we don't want to rerender.
    formValues: IFormValues = [];

    constructor(props: IFormProps) {
        super(props);

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private async handleSubmit(e: React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        console.log(this.formValues);

        this.submitForm();
    }

    private async submitForm(): Promise<boolean>{
        try {
            let response = await fetch(this.props.action, {
                method: "post",
                body: JSON.stringify(this.formValues)
            });
            console.log(response);
            return true;
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
                    <input type="hidden" name="userName" key="userName" value={this.props.userName} />
                    <div>
                        <button className="space-right" type="submit">Add</button>
                        <button className="space-right" type="submit" onClick={this.props.onCancel}>Cancel</button> 
                    </div>
                </form>
        );
    }
}