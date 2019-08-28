import React from "react";

interface IDeleteButtonProps {
    deleteAction: () => void;
}

class DeleteButton extends React.Component<IDeleteButtonProps> {

    constructor(props : IDeleteButtonProps) {
        super(props);

        this.onDeleteClicked = this.onDeleteClicked.bind(this);
    }

    render() {
        return (
            <div onClick={this.onDeleteClicked} className={"clickable"}>
                <img src={require("./trash-can-24.png")} alt="delete" />
            </div>);
    }

    onDeleteClicked() : void{
        let doDelete: boolean = window.confirm("Deleting an expenditure cannot be undone.  Are you sure?");
    
        if (doDelete) {
            this.props.deleteAction();
        }
    }
}

interface IDeleteExpenditureProps {
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

