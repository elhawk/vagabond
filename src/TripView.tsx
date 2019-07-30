import React from 'react';
import { TripManager } from './trip';
import { IItemToAdd, ItemFieldTypes, AddItem } from './AddItem';

interface ITripViewProps {
    tripManager: TripManager;
}

export class TripView extends React.Component<ITripViewProps> {
    
    newTripInput: IItemToAdd[] = [
        {name: "Name", type: ItemFieldTypes.stringType, required: true},
        {name: "Start Date", type: ItemFieldTypes.dateType, required: true},
        {name: "End Date", type: ItemFieldTypes.dateType, required: true},
        {name: "Budget", type: ItemFieldTypes.numberType, required: true},
    ];

    render() {
        return <AddItem onItemAddedCallback={()=> {}} itemsToAdd={this.newTripInput} />
    }
}