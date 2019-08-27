import {Trip, parseTrip} from '../../Trip/trip';
import { Expenditure } from "../../Trip/Expenditure/Expenditure";

// Trip tests -- add expenditure
it("Doesn't let you add expenditure outside of trip dates", () => {
    let trip : Trip = new Trip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000, "guidId", []);
    let expenditure: Expenditure = new Expenditure("guidid", [new Date("2019-01-20")], 10);
    expect(trip.addItem(expenditure)).toEqual(false);
});

it("Doesn't let you add expenditure where some dates are outside trip dates", () => {
    let trip : Trip = new Trip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000, "guidId", []);
    let expenditure: Expenditure = new Expenditure("guidid", [new Date("2019-01-02"), new Date("2019-01-20")], 10);
    expect(trip.addItem(expenditure)).toEqual(false);
});

it("Lets you add expenditure where dates are start or end date", () => {
    let trip : Trip = new Trip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000, "guidId", []);

    let startDateExpenditure: Expenditure = new Expenditure("guidid", [new Date("2019-01-01")], 10);
    expect(trip.addItem(startDateExpenditure)).toEqual(true);

    let endDateExpenditure: Expenditure = new Expenditure("guidid", [new Date("2019-01-10")], 10);
    expect(trip.addItem(endDateExpenditure)).toEqual(true);
});

it("Lets you add expenditure where all dates are in range", () => {
    let trip : Trip = new Trip("Test Trip", new Date("2019-01-01"), new Date("2019-01-10"), 1000, "guidId", []);

    let expenditure: Expenditure = new Expenditure("guidid", [new Date("2019-01-02"), new Date("2019-01-03")], 10);
    expect(trip.addItem(expenditure)).toEqual(true);
});

//Trip tests -- remove item
it ("Removing an existing expenditure works", ()=> {
    let expenditure = new Expenditure("guidid", [new Date("2019-01-02")], 10);

    let trip: Trip = new Trip(
        "Test Trip",
         new Date("2019-01-01"),
         new Date("2019-01-10"),
         1000,
         "guidId",
         [expenditure]);

    expect(trip.removeItem(expenditure.id)).toEqual(expenditure);
    expect(trip.expenditures.length).toEqual(0);
});

it ("Removing a nonexistent expenditure returns null", ()=> {
    let trip: Trip = new Trip(
        "Test Trip",
         new Date("2019-01-01"),
         new Date("2019-01-10"),
         1000,
         "guidId",
         []);

    expect(trip.removeItem("doesn't exist")).toEqual(null);
});

// ParseTrip tests

it("Parsing undefined or null trip returns succeeded false", () => {
    let undefinedTrip = undefined;
    let nullTrip = null;

    expect(parseTrip(undefinedTrip).succeeded).toEqual(false);
    expect(parseTrip(nullTrip).succeeded).toEqual(false);
});

it("Trip with no name or empty name returns succeeded false", () => {
    let noName = {
        startdate: "2019-10-01T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "guid" 
    };


    let emptyName = {
        name: "",
        startdate: "2019-10-01T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "guid" 
    };

    expect(parseTrip(noName).succeeded).toEqual(false);
    expect(parseTrip(emptyName).succeeded).toEqual(false);
});

it("Trip with no id or empty id returns succeeded false", () => {
    let noId = {
        name: "test trip",
        startdate: "2019-10-01T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
    };


    let emptyId = {
        name: "test trip",
        startdate: "2019-10-01T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "" 
    };

    expect(parseTrip(noId).succeeded).toEqual(false);
    expect(parseTrip(emptyId).succeeded).toEqual(false);
});

it("Trip with no startDate or invalid startDate returns succeeded false", () => {
    let noStartDate = {
        name: "test trip",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "guid"
    };


    let invalidStartDate = {
        name: "test trip",
        startdate: "not a date",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "guid" 
    };

    expect(parseTrip(noStartDate).succeeded).toEqual(false);
    expect(parseTrip(invalidStartDate).succeeded).toEqual(false);
});

it("Trip with no end date or invalid end date returns succeeded false", () => {
    let noEndDate = {
        name: "test trip",
        startdate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "guid"
    };


    let invalidEndDate = {
        name: "test trip",
        startdate: "2019-10-03T00:00:00.000Z",
        enddate: "not a date",
        budget: 1000,
        id: "guid" 
    };

    expect(parseTrip(noEndDate).succeeded).toEqual(false);
    expect(parseTrip(invalidEndDate).succeeded).toEqual(false);
});


it("Trip with no budget or invalid budget returns succeeded false", () => {
    let noBudget = {
        name: "test trip",
        startdate: "2019-10-03T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        id: "guid"
    };


    let invalidBudget = {
        name: "test trip",
        startdate: "2019-10-01T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: "not a number",
        id: "guid" 
    };

    expect(parseTrip(noBudget).succeeded).toEqual(false);
    expect(parseTrip(invalidBudget).succeeded).toEqual(false);
});

it("Trip with all fields valids returns succeeded true, trip object", () => {
    let validTrip = {
        name: "test trip",
        startdate: "2019-10-01T00:00:00.000Z",
        enddate: "2019-10-03T00:00:00.000Z",
        budget: 1000,
        id: "guid" 
    };

    let parseResult = parseTrip(validTrip);
    expect(parseResult.succeeded).toEqual(true);
    expect(parseResult.trip).toBeDefined();
    expect((parseResult.trip as Trip).name).toEqual(validTrip.name);
});