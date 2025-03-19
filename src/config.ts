export const config = {
    url: 'https://script.google.com/macros/s/AKfycbxVWlAlL95CIkBJrqcjrzmFeke7FBav_0RH7UN_3t0bWa5Z0LRYOnngxNbHI9jKR_INfw/exec',
    sheets: {
        tech: 'Техно',
        marketing: 'Маркетинг',
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
        }
    },
}