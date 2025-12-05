
document.addEventListener("DOMContentLoaded", () => {
    // The table with id="age-table"
    const ageTable = document.getElementById("age-table");
    console.log(ageTable);
    // All label elements inside that table (there should be 3 of them)
    const allLabel = ageTable.querySelectorAll("label");
    console.log(allLabel);
    // The first td in that table (with the word “Age”)
    const allTd = ageTable.querySelectorAll("td");
    let tdAge = Array.from(allTd).some(td => td.textContent === "Age")
    console.log(tdAge);
    // The form with name="search"
    const form = document.querySelector('form[name="search"]');
    console.log(form);
    // The first input in that form
    const firstInputInForm = form.querySelector('input');
    let firstInputInForm2 = form.querySelector('input').firstChild;
    let firstInputInForm3 = form.querySelector("form [name='search'] input:first-child");
    console.log(firstInputInForm);
    //The last input in that form
    const lastInputInForm = form.querySelectorAll('input')[form.querySelectorAll('input').length - 1];
    let lastInputInForm2 = form.querySelector("form [name='search'] input:last-child");
    let lastInputInForm3 = form.querySelector("input").lastChild;
    console.log(lastInputInForm);


});
