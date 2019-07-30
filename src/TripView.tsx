import React from 'react';
import { TripManager } from './trip';

interface ITripViewProps {
    tripManager: TripManager;
}

export class TripView extends React.Component<ITripViewProps> {
    
    constructor(props : ITripViewProps) {
        super(props);
    }

    render() {
        return "Hello";
    }
}