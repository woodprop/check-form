// @ts-ignore
const testUrl = 'https://script.google.com/macros/s/AKfycbxVWlAlL95CIkBJrqcjrzmFeke7FBav_0RH7UN_3t0bWa5Z0LRYOnngxNbHI9jKR_INfw/exec';
// @ts-ignore
const deployUrl = 'https://script.google.com/a/macros/silavetra.team/s/AKfycbz90EYv3iWvXyaK9woU3nsBoRjDYfvmtzWF1vpRX6CnanQzp6aU_LLAvHagbqeKwQ/exec';

export const config = {
    url: testUrl,
    // url: deployUrl,
    sheets: {
        tech: 'Техно',
        marketing: 'Маркетинг',
        office: 'Офис',
        base: 'База',
        corps: 'Корпики',
        school: 'Школа капитанов',
    },
    validValuesSource: {
        common: {
            paymentSource: 'A',
            globalTarget: 'B',
            direction: 'C',
        },
        marketing: {
            purpose: 'E',
            name: 'F',
        },
        tech: {
            purpose: 'K',
            name: 'L',
        },
        office: {
            purpose: 'G',
            name: 'H',
        },
        base: {
            purpose: 'I',
            name: 'J',
        },
        corps: {
            purpose: 'M',
            name: 'N',
        },
        school: {
            purpose: 'O',
            name: 'P',
        },
    },
}