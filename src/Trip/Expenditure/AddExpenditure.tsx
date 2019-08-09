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
            renderFields={() => (
                <React.Fragment>
                    <Field id="description" label="Description" fieldType="string" required={true} />
                    <Field id="date" label="Date" fieldType="date" required={true} />
                    <Field id="amount" label="Amount" fieldType="number" required={true} />
                    <Field id="category" label="Category" fieldType="string" required={false} />
                </React.Fragment>
            )}
        />
    );

}