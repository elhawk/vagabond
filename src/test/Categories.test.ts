import {addCategory, Categories} from '../Categories';

it("Adding empty category returns false", () => {
    expect (addCategory("")).toBe(false);
});

it("Adding existing category returns false", () => {
    expect (addCategory("Accomodation")).toBe(false);
});

it("Adding existing category returns true, is added second-to-last", () => {
    expect (addCategory("Drinks")).toBe(true);
    expect (Categories[Categories.length -1]).toBe("Uncategorized");
    expect (Categories[Categories.length - 2]).toBe("Drinks");
});