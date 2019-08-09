import React from 'react';
import { AddItem } from '../AddItem/AddItem';
import { Field } from '../AddItem/Field';

export function AddTrip(props: {userName: string}) {
    return (
        <AddItem
            itemName = {"Trip"} 
            title={"Your Trips"}
            action={"/trips/"}
            userName={props.userName}
            renderFields={() => (
                <React.Fragment>
                    <Field id="name" label="Name" fieldType="string" required={true} />
                    <Field id="startdate" label="Start Date" fieldType="date" required={true} />
                    <Field id="enddate" label="End Date" fieldType="date" required={true} />
                    <Field id="budget" label="Budget" fieldType="number" required={true} />
                </React.Fragment>
            )}
        />
    );

}