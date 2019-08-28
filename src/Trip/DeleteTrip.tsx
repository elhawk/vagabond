import { DeleteButton } from "../DeleteItem/DeleteButton";
import React from "react";

interface IDeleteTripProps {
    user: string;
    tripId: string;

    // callback so the deleted item can be removed from the UI on success
    onDeleteSucceeded: (tripId: string) => void;
}

export class DeleteTripButton extends React.Component<IDeleteTripProps>{

    constructor(props: IDeleteTripProps) {
        super(props);

        this.deleteAction = this.deleteAction.bind(this);
    }

    deleteAction() {
        let url = `/trips?id=${this.props.tripId}&user=${this.props.user}`;
        fetch(url, { method: 'DELETE' })
            .then(res => {
                if (res.status == 200) {
                    this.props.onDeleteSucceeded(this.props.tripId);
                } else {
                    alert('Delete failed unexpectedly');
                }
            });    
    }
    
    render() {
        return <DeleteButton deleteAction = {this.deleteAction}/>
    }
}
