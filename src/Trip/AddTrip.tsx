import React from 'react';
import { AddItem } from '../AddItem/AddItem';
import { Field } from '../AddItem/Field';
import { IFormValues } from '../AddItem/Form';

export function AddTrip(props: {userName: string, onItemAddedCallback: (item: IFormValues) => void}) {
    return (
        <AddItem
            itemName = {"Trip"} 
            title={"Your Trips"}
            action={"/trips/"}
            postData={{"user": props.userName}}
            onItemAddedCallback = {props.onItemAddedCallback}
            renderFields={(onFieldChange: (e: React.FormEvent<HTMLInputElement>) => void) => (
                <React.Fragment>
                    <Field id="name" label="Name" fieldType="string" required={true} onChange={onFieldChange} />
                    <Field id="startdate" label="Start Date" fieldType="date" required={true} onChange={onFieldChange} />
                    <Field id="enddate" label="End Date" fieldType="date" required={true} onChange={onFieldChange} />
                    <Field id="budget" label="Budget" fieldType="number" required={true} onChange={onFieldChange} />
                </React.Fragment>
            )}
        />
    );

}