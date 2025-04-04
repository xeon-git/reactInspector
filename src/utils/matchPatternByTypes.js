import {getDetailedType} from '../utils/getDetailedType';

export const matchPatternByTypes = (obj, structure) => {
    const typeSequence = Object.values(obj).map(value => getDetailedType(value));
        if (typeSequence.length !== structure.length) {
            return false;}

    const patternTypeCount = {}; 
        structure.forEach(item => {patternTypeCount[item.type.toLowerCase()] = (patternTypeCount[item.type.toLowerCase()] || 0) + 1;});

    const objTypeCount = {}; 
        typeSequence.forEach(type => {objTypeCount[type] = (objTypeCount[type] || 0) + 1;});
    
    for (let type in patternTypeCount) {
        if (patternTypeCount[type] !== objTypeCount[type]) {
            return false;}}

    for (let i = 0; i < structure.length; i++) {
        const pattern = structure[i];
            if (pattern.type.toLowerCase() === 'object' && pattern.children) {
                const objValues = Object.values(obj);
                let foundMatch = false;
                
                for (let j = 0; j < objValues.length; j++) {
                    const objValue = objValues[j];
                        if (getDetailedType(objValue) === 'object' && matchChildTypes(objValue, pattern.children)) {foundMatch = true;
                            break;}}
                
                if (!foundMatch) {
                    return false;}}}
    return true;
};

const matchChildTypes = (obj, childrenPattern) => {
    const childValues = Object.values(obj);

    if (childValues.length !== childrenPattern.length) {
        return false;}

    const childTypeSequence = childValues.map(value => getDetailedType(value));
    
    const patternChildTypeCount = {}; 
        childrenPattern.forEach(item => {patternChildTypeCount[item.child.toLowerCase()] = (patternChildTypeCount[item.child.toLowerCase()] || 0) + 1;});
    
    const objChildTypeCount = {}; 
        childTypeSequence.forEach(type => {objChildTypeCount[type] = (objChildTypeCount[type] || 0) + 1;});
    
    for (let type in patternChildTypeCount) {
        if (patternChildTypeCount[type] !== objChildTypeCount[type]) {
            return false;}}
    return true;
};