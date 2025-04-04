import {applyLoopValues} from '../loops/applyLoopValues';
import {getDetailedType} from '../utils/getDetailedType';

export const childActions = (component, action) => {
    const childIndex = parseInt(action.child) - 1;
    const targetChild = Object.values(component)[childIndex];
    const childKey = Object.keys(component)[childIndex];
        if (targetChild === undefined) {console.error(`%cпотомок с индексом ${childIndex + 1} не найден`, 'color: red;');
            return false;}

    const isObject = (value) => value !== null && typeof value === 'object';
    const countTypes = (sequence) => sequence.reduce((acc, type) => {acc[type] = (acc[type] || 0) + 1;
        return acc;}, {});

    const validateStructure = (target, expected) => {
        if (!isObject(target)) return false;

        const actualTypeSequence = Object.values(target).map(value => getDetailedType(value));
        const expectedTypeSequence = expected.map(child => child.child);

        const actualTypeCount = countTypes(actualTypeSequence);
        const expectedTypeCount = countTypes(expectedTypeSequence);  
            return Object.keys(expectedTypeCount).every(type => expectedTypeCount[type] === actualTypeCount[type]);};

    const applyNestedChanges = (target, children) => {
        children.forEach((childPattern, index) => {
            const targetKey = Object.keys(target)[index];
            const targetValue = target[targetKey];
                if (targetValue === undefined) {console.error(`%cпотомок с ключом ${targetKey} не найден`, 'color: red;');
                    return;}

            const handlers = {
                hasChildren: () => {
                    const isValidObject = childPattern.child === 'object' && isObject(targetValue); console.log(`%c${isValidObject ? 'применение вложенных изменений для потомка' : 'структура потомков не совпадает с ожидаемой для'}: ${targetKey}`, 
                        `color: ${isValidObject ? 'rgba(0, 255, 0, 1)' : 'red'}`);
                            return isValidObject && applyNestedChanges(targetValue, childPattern.children);},
                hasLoopValue: () => applyLoopValues(target, targetKey, childPattern.loopValue),
                hasValue: () => {console.log(`%cизменение потомка (${targetKey}): %c${targetValue} %c→ %c${childPattern.value}`, 'color: #3498db;', 'color: #e74c3c;', 'color: #2ecc71;', 'color: #9b59b6;'); target[targetKey] = childPattern.value;}};
            childPattern.children && handlers.hasChildren() || childPattern.loopValue && handlers.hasLoopValue() || childPattern.value !== undefined && handlers.hasValue();});
        return true;};

    const processors = {
        object: (target, act) => {
            const isValid = act.children && validateStructure(target, act.children); !isValid && console.log(`%cструктура потомков не совпадает с ожидаемой для: ${act.pattern}`, 'color: red;');
                return isValid && applyNestedChanges(target, act.children);},
        primitive: (comp, key, target, act) => {
            if (!act.value || !Array.isArray(act.value)) {console.error(`%cнеподдерживаемый формат значения для ${key}`, 'color: red;');
                return false;}
            act.value.forEach(pattern => {typeof target === pattern.child && (console.log(`%cизменение значений потомка ${key} с: ${target} на: ${pattern.value}`, 'color: rgba(32, 255, 0, 1)'), comp[key] = pattern.value);});
                return true;}};
    return isObject(targetChild) ? processors.object(targetChild, action) : processors.primitive(component, childKey, targetChild, action);
};