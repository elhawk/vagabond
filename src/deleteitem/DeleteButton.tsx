import React from "react";

interface IDeleteExpenditureProps {
    // the trip which the expenditure to be deleted belongs to
    tripId: string;

    // the expenditure Id of the expenditure being deleted
    expenditureId: string;
}

export function DeleteButton() {
    return (
        <div onClick={() => alert('delete!')}>
            <img src={require("./trash-can-24.png")} alt="delete" />
        </div>);
}

