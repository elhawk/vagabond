import React from 'react';
import { AddItem } from '../../AddItem/AddItem';
import { Field } from '../../AddItem/Field';

export function AddExpenditure(props: {userName: string, tripName: string}) {
    return (
        <AddItem
            itemName = {"Expenditure"} 
            title={props.tripName + " Spending"}        
            action={"/expenditures/"}
            userName={props.userName}
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