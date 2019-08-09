import React from 'react';

export type FieldType = "string" | "number" | "date" | "dropdown";

export interface IFieldProps {
    // unique name for the field
    id: string;

    // label text for the field
    label: string;
   
    // Whether the field is required or not
    required: boolean,

    // the type of editor for the field input
    fieldType: FieldType;

    // How to populate the drop down items for the field, if the field is a dropdown
    options?: string[];

    // The field value
    value?: any;

    // callback when field input changes
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export function Field(props: IFieldProps) {
    // TODO: implement dropdown type
    return (
        <div className="form-line" >
            <span className="space-right">{props.label}</span>
            <input 
                id={props.id}
                type={props.fieldType} 
                required={props.required}
                value={props.value}
                onChange={props.onChange}
            />
            {/*todo display validation error on submit attempt*/}
        </div>
    );
}