import './style.css';
import {config} from "./config.ts";
import {App} from "./components/app.ts";

const APP = new App();
APP.init();

const sheetName: string = 'Техно';







function createOption(optionName: string): HTMLOptionElement {
    const element = document.createElement('option');
    element.textContent = optionName;
    return element;
}

