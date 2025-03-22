import {config} from "../config.ts";
import {createHTMLElement} from "../utils/helpers.ts";
import {ValidValues} from "../utils/types.ts";

interface SelectElements {
    [key: string]: HTMLSelectElement;
}

type ConfigSheets = keyof typeof config.sheets;

export class Form {
    public el: HTMLFormElement;
    public fields;
    public selectElements: SelectElements;

    constructor() {
        this.el = document.createElement('form');
        this.el.className = 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4';
        this.el.action = config.url;
        this.el.method = 'post';
        this.selectElements = {};

        const btnWrapper = <HTMLDivElement>createHTMLElement('div', 'flex items-center justify-between');
        const btnSubmit = <HTMLButtonElement>createHTMLElement('button', 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
        btnSubmit.type = 'submit';
        btnSubmit.innerText = 'Отправить';
        btnWrapper.append(btnSubmit);

        this.fields = {
            fieldSelectDepartment: this.createDropdown('departmentName', 'Отдел'),
            fieldDate: this.createInput('date', 'date', 'Дата'),
            fieldDescription: this.createInput('description', 'text', 'Описание'),
            fieldSeller: this.createInput('seller', 'text', 'Контрагент'),
            fieldPrice: this.createInput('price', 'number', 'Сумма'),
            fieldSelectPaymentMethod: this.createDropdown('paymentMethod', 'Фин. поток'),
            fieldSelectDirection: this.createDropdown('direction', 'Направление'),
            fieldSelectGlobalPurpose: this.createDropdown('department', 'Глобальная статья'), //ToDo переименовать
            fieldSelectPurpose: this.createDropdown('purpose', 'Статья расхода'),
            fieldSelectName: this.createDropdown('name', 'Кто внёс'),
            fieldButton: btnWrapper,
        };


        this.selectElements['departmentName'].append(
            this.createOption('Выберите отдел...', ''),
            this.createOption('Техно', 'tech'),
            this.createOption('Маркетинг', 'marketing'),
            this.createOption('Офис', 'office'),
            this.createOption('База', 'base'),
            this.createOption('Корпики', 'corps'),
            this.createOption('Школа капитанов', 'school'),
        );

        this.el.append(this.fields.fieldSelectDepartment);

        this.el.addEventListener('submit', this.sendForm.bind(this));
    }

    showFields(): void {
        this.el.append(...Object.values(this.fields));
    }

    addOptions(validValues: ValidValues) {
        const selectedDepartment = this.selectElements['departmentName'].value;

        this.selectElements['paymentMethod'].innerHTML = '';
        this.selectElements['department'].innerHTML = '';
        this.selectElements['purpose'].innerHTML = '';
        this.selectElements['name'].innerHTML = '';

        validValues['common']['paymentSource'].forEach((val: string) => {
            this.selectElements['paymentMethod'].append(this.createOption(val))
        });
        validValues['common']['globalTarget'].forEach((val: string) => {
            this.selectElements['department'].append(this.createOption(val))
        });
        validValues['common']['direction'].forEach((val: string) => {
            this.selectElements['direction'].append(this.createOption(val))
        });


        validValues[selectedDepartment]['purpose'].forEach((val: string) => {
            this.selectElements['purpose'].append(this.createOption(val))
        });
        validValues[selectedDepartment]['name'].forEach((val: string) => {
            this.selectElements['name'].append(this.createOption(val))
        });

    }


    async sendForm(e: Event) {
        e.preventDefault();
        const data = new FormData(this.el);
        const sheet = <ConfigSheets>this.selectElements['departmentName'].value;
        data.append('sheet', config.sheets[sheet]);
        try {
            const res = await fetch(config.url, {
                method: 'POST',
                body: data,
            });
            if (res.status === 200) {
                this.afterSend(true);
            }
        }
        catch (error) {
            this.afterSend(false);
        }
    }


    createInput(name: string, type: string = 'text', labelText: string):HTMLElement {
        const wrapper = createHTMLElement('div', 'mb-4');
        const label = <HTMLLabelElement>createHTMLElement('label', 'block text-gray-700 text-sm font-bold mb-2');
        label.htmlFor = name;
        label.innerText = labelText;
        const input = <HTMLInputElement>createHTMLElement('input', 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline');
        input.name = name;
        input.id = name;
        input.type = type;
        input.required = true;

        wrapper.append(label, input);
        return wrapper;
    }

    createDropdown(name: string, labelText: string): HTMLElement {
        const wrapper = createHTMLElement('div', 'mb-4');
        const label = <HTMLLabelElement>createHTMLElement('label', 'block text-gray-700 text-sm font-bold mb-2');
        label.htmlFor = name;
        label.innerText = labelText;

        const dropdown = createHTMLElement('div', 'relative');
        const select = <HTMLSelectElement>createHTMLElement('select', 'block relative appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:shadow-outline');
        select.name = name;
        select.id = name;
        const arrow = createHTMLElement('div', 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700');
        arrow.innerHTML = '<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>'

        dropdown.append(select, arrow);
        wrapper.append(label, dropdown);

        this.selectElements[name] = select;
        return wrapper;
    }

    createOption(optionName: string, value: string = optionName): HTMLOptionElement {
        const element = document.createElement('option');
        element.textContent = optionName;
        element.value = value;
        return element;
    }

    afterSend(success: boolean) {
        const app = document.querySelector('#app')!;
        const wrapper = createHTMLElement('div');
        wrapper.className = 'flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4';
        const icon = <HTMLImageElement>createHTMLElement('img', 'block mb-4');

        const message = createHTMLElement('h3', 'mb-4');
        const button = createHTMLElement('button');
        button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
        button.textContent = 'Я потратил ещё';
        button.addEventListener('click', () => {
            window.location.href = './';
        })
        if (success) {
            icon.src = 'icon-success.svg';
            message.textContent = 'Успешно внесено';
        } else {
            icon.src = 'icon-error.svg';
            message.textContent = 'Что-то пошло не так...\nПроверь таблицу!';
        }

        wrapper.append(icon, message, button);
        if (app) app.replaceChildren(wrapper);
    }
}