import { parseExpenditure, Expenditure } from "../../../Trip/Expenditure/Expenditure";

// parseExpenditure tests
it("Parsing undefined or null expenditure returns succeeded false", () => {
    let undefinedExpenditure = undefined;
    let nullExpenditure = null;

    expect(parseExpenditure(undefinedExpenditure).succeeded).toEqual(false);
    expect(parseExpenditure(undefinedExpenditure).succeeded).toEqual(false);
});

it("Parsing expenditure with no id returns succeeded false", () => {
    let noId = {
        dates: ["2019-08-28"],
        amount: "50",
        description: "desc",
        category: "cat",
        location: "home"
    }

    expect(parseExpenditure(noId).succeeded).toEqual(false);
});

it("Parsing expenditure with no dates, empty dates, or invalid date returns succeeded false", () => {
    let noDates = {
        id: "guid",
        amount: "50",
        description: "desc",
        category: "cat",
        location: "home"
    }

    let emptyDates = {
        id: "guid",
        dates: [],
        amount: "50",
        description: "desc",
        category: "cat",
        location: "home"
    };

    let invalidDates = {
        id: "guid",
        dates: ["2019-08-28", "not a date"],
        amount: "50",
        description: "desc",
        category: "cat",
        location: "home"
    };

    expect(parseExpenditure(noDates).succeeded).toEqual(false);
    expect(parseExpenditure(emptyDates).succeeded).toEqual(false);
    expect(parseExpenditure(invalidDates).succeeded).toEqual(false);
});

it("Parsing expenditure with no amount or non-number amount return succeeded false", () => {
    let noAmount = {
        id: "guid",
        dates: ["2019-08-28"],
        description: "desc",
        category: "cat",
        location: "home"
    };

    let NaNAmount = {
        id: "guid",
        dates: ["2019-08-28"],
        amount: "not a number",
        description: "desc",
        category: "cat",
        location: "home"
    };

    expect(parseExpenditure(noAmount).succeeded).toEqual(false);
    expect(parseExpenditure(NaNAmount).succeeded).toEqual(false);
});

it("Parsing valid expenditure returns succeeded true", () => {
    let allFields = {
        id: "guid",
        dates: ["2019-08-28", "2019-08-29"],
        amount: "50",
        description: "desc",
        category: "cat",
        location: "home"
    };

    let onlyRequiredFields = {
        id: "guid",
        dates: ["2019-08-28"],
        amount: "50"
    };

    let allFieldsExpenditure = parseExpenditure(allFields);
    let requiredFieldsExpenditure = parseExpenditure(onlyRequiredFields);

    expect(allFieldsExpenditure.succeeded).toEqual(true);
    expect(requiredFieldsExpenditure.succeeded).toEqual(true);

    expect(allFieldsExpenditure.expenditure).toBeDefined();
    expect(requiredFieldsExpenditure.expenditure).toBeDefined();

    expect((allFieldsExpenditure.expenditure as Expenditure).amount).toEqual(50);
});


