import './style.css';
import {config} from "./config.ts";

const url: string = 'https://script.google.com/macros/s/AKfycbxVWlAlL95CIkBJrqcjrzmFeke7FBav_0RH7UN_3t0bWa5Z0LRYOnngxNbHI9jKR_INfw/exec';
const sheetName: string = 'Техно';

async function getValidValues() {
    const req = config.validValuesSource;
    const res = await fetch(url + `?request=${JSON.stringify(req)}`);
    const data = await res.json();

    return data;
}

console.log(await getValidValues()) ;



