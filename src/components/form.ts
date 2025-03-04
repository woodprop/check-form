import {config} from "../config.ts";
import {createHTMLElement} from "../utils/helpers.ts";

export class Form {
    el: HTMLFormElement;
    private fields;
    constructor() {
        this.el = document.createElement('form');
        this.el.className = 'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4';
        this.el.action = config.url;
        this.el.method = 'post';

        this.el.innerHTML = '<div class="mb-4">\n' +
            '              <label class="block text-gray-700 text-sm font-bold mb-2" for="date">\n' +
            '                Дата\n' +
            '              </label>\n' +
            '              <input name="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date">\n' +
            '            </div>\n' +

            '            <div class="mb-4">\n' +
            '              <label class="block text-gray-700 text-sm font-bold mb-2" for="paymentMethod">\n' +
            '                Фин. поток\n' +
            '              </label>\n' +
            '              <div class="relative">\n' +
            '                <select name="paymentMethod" class="block relative appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:shadow-outline" id="paymentMethod">\n' +
            '                  <option>Наличные</option>\n' +
            '                  <option>Карта ООО М-Марин Альфа 8285</option>\n' +
            '                  <option>Безнал ООО М-Марин</option>\n' +
            '                </select>\n' +
            '                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">\n' +
            '                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>\n' +
            '                </div>\n' +
            '              </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="mb-4">\n' +
            '              <label class="block text-gray-700 text-sm font-bold mb-2" for="department">\n' +
            '                Глобальная статья\n' +
            '              </label>\n' +
            '              <div class="relative">\n' +
            '                <select name="department" class="block relative appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:shadow-outline" id="department">\n' +
            '                  <option>БАЗА/ Расходы на обслуживание, содержание, ремонт плавательных средств</option>\n' +
            '                  <option>111</option>\n' +
            '                  <option>222</option>\n' +
            '                </select>\n' +
            '                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">\n' +
            '                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>\n' +
            '                </div>\n' +
            '              </div>\n' +
            '            </div>\n' +
            '\n' +
            '\n' +
            '            <div class="mb-4">\n' +
            '              <label class="block text-gray-700 text-sm font-bold mb-2" for="purpose">\n' +
            '                Статья расхода\n' +
            '              </label>\n' +
            '              <div class="relative">\n' +
            '                <select name="purpose" class="block relative appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:shadow-outline" id="purpose"></select>\n' +
            '                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">\n' +
            '                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>\n' +
            '                </div>\n' +
            '              </div>\n' +
            '            </div>\n' +
            '\n' +
            '\n' +
            '            <div class="mb-4">\n' +
            '              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">\n' +
            '                Кто внёс\n' +
            '              </label>\n' +
            '              <div class="relative">\n' +
            '                <select name="name" class="block relative appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:shadow-outline" id="name">\n' +
            '                  <option>Коля</option>\n' +
            '                  <option>Даша</option>\n' +
            '                </select>\n' +
            '                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">\n' +
            '                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>\n' +
            '                </div>\n' +
            '              </div>\n' +
            '            </div>\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '            <div class="flex items-center justify-between">\n' +
            '              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">\n' +
            '                Отправить\n' +
            '              </button>\n' +
            '            </div>';



        this.fields = {
            fieldSelectDepartment: this.createDropdown('departmentName', 'Отдел'),
            fieldDescription: this.createInput('description', 'text', 'Описание'),
            fieldSeller: this.createInput('seller', 'text', 'Контрагент'),
            fieldPrice: this.createInput('price', 'text', 'Сумма'),
        };

        this.el.append(...Object.values(this.fields));

        const departmentDropdown = this.fields.fieldSelectDepartment.querySelector('#departmentName')!;
        departmentDropdown.append(
            this.createOption('Техно', 'tech'),
            this.createOption('Маркетинг', 'marketing'),
        );
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
        return wrapper;
    }

    createOption(optionName: string, value: string): HTMLOptionElement {
        const element = document.createElement('option');
        element.textContent = optionName;
        element.value = value;
        return element;
    }
}