import {getComponentByValue} from '../search/getComponentByValue';

export const searchByValue = (value, depth) => {
    const valueToFind = isNaN(value) ? value : Number(value);
        return getComponentByValue(root, valueToFind, depth);};