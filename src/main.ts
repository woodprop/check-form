import './style.css';
import {config} from "./config.ts";
import {App} from "./components/app.ts";

const APP = new App();
APP.init();

const sheetName: string = 'Техно';

async function getValidValues() {
    const req = config.validValuesSource;
    const res = await fetch(config.url + `?request=${JSON.stringify(req)}`);
    const data = await res.json();

    return data;
}
const inputValidValues = await getValidValues();
console.log(inputValidValues);




let selectedDepartment: string;
const depNameInput = <HTMLInputElement>document.querySelector('#departmentName');
depNameInput.addEventListener('change', () => {
    console.log(depNameInput.value)
    selectedDepartment = depNameInput.value;

    const purposeInput = <HTMLInputElement>document.querySelector('#purpose');
    purposeInput.innerHTML = '';
    inputValidValues[selectedDepartment]['purpose'].forEach((p: string) => {
        purposeInput.appendChild( createOption(p) );
    });
});

function createOption(optionName: string): HTMLOptionElement {
    const element = document.createElement('option');
    element.textContent = optionName;
    return element;
}

