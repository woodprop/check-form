import {Form} from "./form.ts";
import {config} from "../config.ts";

export class App {
    private appContainer: HTMLDivElement;
    private form: Form;
    private inputValidValues: any;
    constructor() {
        this.appContainer = document.querySelector('#app-container')!;
        this.form = new Form();
    }

    async init() {
        this.inputValidValues = await this.getValidValues();
        this.appContainer.prepend(this.form.el);
        this.form.selectElements['departmentName'].addEventListener('change', this.selectDepartmentHandler.bind(this));
    }

    selectDepartmentHandler() {
        this.form.addOptions(this.inputValidValues);
        this.form.showFields();
    }

    async getValidValues() {
        const req = config.validValuesSource;
        const res = await fetch(config.url + `?request=${JSON.stringify(req)}`);
        const data = await res.json();
        console.log(data)
        return data;
    }
}