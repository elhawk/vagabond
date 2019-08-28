import React from "react";
import { DeleteButton } from "../../DeleteItem/DeleteButton";

export interface IDeleteExpenditureProps {
    user: string;
    tripId: string;
    expenditureId: string;

    // callback so the deleted item can be removed from the UI on success
    onDeleteSucceeded: (expenditureId: string) => void;
}

export class DeleteExpenditureButton extends React.Component<IDeleteExpenditureProps>{

    constructor(props: IDeleteExpenditureProps) {
        super(props);

        this.deleteAction = this.deleteAction.bind(this);
    }

    deleteAction() {
        let url = `/expenditures?id=${this.props.expenditureId}&tripId=${this.props.tripId}&user=${this.props.user}`;
        fetch(url, { method: 'DELETE' })
            .then(res => {
                if (res.status == 200) {
                    this.props.onDeleteSucceeded(this.props.expenditureId);
                } else {
                    alert('Delete failed unexpectedly');
                }
            });    
    }
    
    render() {
        return <DeleteButton deleteAction = {this.deleteAction}/>
    }
}