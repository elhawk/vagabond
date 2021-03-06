import React from 'react';
import { AddItem } from '../../AddItem/AddItem';
import { Field } from '../../AddItem/Field';
import { IFormValues } from '../../AddItem/Form';

export function AddExpenditure(props: {userName: string, tripName: string, tripId: string, onItemAddedCallback: (item: IFormValues) => void}) {
    return (
        <AddItem
            itemName = {"Expenditure"} 
            title={props.tripName + " Spending"}        
            action={"/expenditures/"}
            postData={{"user": props.userName, "tripId": props.tripId}}      
            onItemAddedCallback = {props.onItemAddedCallback}
            renderFields={(onFieldChange: (e: React.FormEvent<HTMLInputElement>) => void) => (
                <React.Fragment>
                    <Field id="description" label="Description" fieldType="string" required={true} onChange={onFieldChange} />
                    <Field id="date" label="Date" fieldType="date" required={true} onChange={onFieldChange} />
                    <Field id="amount" label="Amount" fieldType="number" required={true} onChange={onFieldChange} />
                    <Field id="category" label="Category" fieldType="string" required={false}  onChange={onFieldChange} />
                </React.Fragment>
            )}
        />
    );
}