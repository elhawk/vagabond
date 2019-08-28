import React from "react";

interface IDeleteButtonProps {
    deleteAction: () => void;
}

export class DeleteButton extends React.Component<IDeleteButtonProps> {

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
        let doDelete: boolean = window.confirm("Deleting an item cannot be undone.  Are you sure?");
    
        if (doDelete) {
            this.props.deleteAction();
        }
    }
}


