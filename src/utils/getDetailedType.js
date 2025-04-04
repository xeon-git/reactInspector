export const getDetailedType = (value) => {
    return value === null 
        ? 'null' 
        : value === undefined 
        ? 'undefined' 
        : typeof value === 'object' && value.constructor && value.constructor.name.toLowerCase().includes('array')
        ? value.constructor.name.toLowerCase()
        : typeof value;
};