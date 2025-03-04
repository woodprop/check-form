import {Form} from "./form.ts";

export class App {
    private appContainer: HTMLDivElement;
    private form: Form | undefined;
    constructor() {
        this.appContainer = document.querySelector('#app-container')!;
    }

    init() {
        this.form = new Form();
        this.appContainer.prepend(this.form.el);
    }


}