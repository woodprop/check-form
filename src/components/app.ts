import {Form} from "./form.ts";
import {config} from "../config.ts";
import {createHTMLElement} from "../utils/helpers.ts";
import {ValidValues} from "../utils/types.ts";



export class App {
    private appContainer: HTMLDivElement;
    private form: Form;
    private inputValidValues: ValidValues | undefined;
    constructor() {
        this.appContainer = document.querySelector('#app-container')!;
        this.form = new Form();
    }

    async init() {
        const loadingPlaceholder = createHTMLElement('h2', 'text-center text-4xl font-extrabold mb-4');
        loadingPlaceholder.textContent = '>>>';
        this.appContainer.prepend(loadingPlaceholder);
        this.inputValidValues = await this.getValidValues();
        loadingPlaceholder.remove();
        this.appContainer.prepend(this.form.el);
        this.form.selectElements['departmentName'].addEventListener('change', this.selectDepartmentHandler.bind(this));
    }

    selectDepartmentHandler() {
        if (this.inputValidValues) {
            this.form.addOptions(this.inputValidValues);
            this.form.showFields();
        }
    }

    async getValidValues(): Promise<ValidValues> {
        const req = config.validValuesSource;
        const res = await fetch(config.url + `?request=${JSON.stringify(req)}`);
        const data = await res.json();
        return data;
    }
}