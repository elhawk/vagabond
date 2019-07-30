import React from 'react';
import { TripManager } from './trip';
import { IItemField, ItemFieldTypes, AddItem, IItemToAdd } from './AddItem';

interface ITripViewProps {
    tripManager: TripManager;
}

export class TripView extends React.Component<ITripViewProps> {
    
    // todo: see if I can get rid of item.item
    newTripInput: IItemToAdd = { item:
        {"Name": {name: "Name", type: ItemFieldTypes.stringType, required: true},
        "StartDate": {name: "Start Date", type: ItemFieldTypes.dateType, required: true},
        "EndDate": {name: "End Date", type: ItemFieldTypes.dateType, required: true},
        "Budget": {name: "Budget", type: ItemFieldTypes.numberType, required: true},}
    };

    render() {
        return <AddItem onItemAddedCallback={this.onItemAddedCallback} itemToAdd={this.newTripInput} />
    }

    onItemAddedCallback(item: IItemToAdd) {
        console.log(item.item);
    }
}