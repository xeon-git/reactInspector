import {applyLoopValues} from '../loops/applyLoopValues';

export const childActions = (component, action) => {
    const childIndex = parseInt(action.child) - 1;
    const targetChild = Object.values(component)[childIndex];
    const childKey = Object.keys(component)[childIndex];

    if (targetChild === undefined) {console.error(`%cпотомок с индексом ${childIndex + 1} не найден`, 'color: red;');
        return false;}

    const isObject = (value) => value !== null && typeof value === 'object';

    const checkStructure = (target, expected) => {
        if (!isObject(target)) return false;

        const actualTypeSequence = Object.values(target).map(value => value === null ? 'null' : typeof value);
        const expectedTypeSequence = expected.map(child => child.child);

        const actualTypeCount = actualTypeSequence.reduce((acc, type) => {acc[type] = (acc[type] || 0) + 1;
            return acc;},{});

        const expectedTypeCount = expectedTypeSequence.reduce((acc, type) => {acc[type] = (acc[type] || 0) + 1;
            return acc;},{});
                return Object.keys(expectedTypeCount).every(type => expectedTypeCount[type] === actualTypeCount[type]);};

    const applyNestedChanges = (target, children) => {children.forEach((childPattern, index) => {
        const targetKey = Object.keys(target)[index];
        const targetValue = target[targetKey];
            if (targetValue === undefined) {console.error(`%cпотомок с ключом ${targetKey} не найден`, 'color: red;');
                return;}
                    if (childPattern.children) {
                        if (isObject(targetValue) && checkStructure(targetValue, childPattern.children)) {applyNestedChanges(targetValue, childPattern.children);}
                            else {console.log(`%cструктура потомков не совпадает с ожидаемой для: ${targetKey}`, 'color: red;');}}
                                else if (childPattern.loopValue) {applyLoopValues(target, targetKey, childPattern.loopValue);}
                                    else if (childPattern.value !== undefined) {console.log(`%cизменение потомка (${targetKey}): %c${targetValue} %c→ %c${childPattern.value}`, 'color: #3498db;', 'color: #e74c3c;', 'color: #2ecc71;', 'color: #9b59b6;'); target[targetKey] = childPattern.value;}});};

    if (isObject(targetChild)) {
        if (action.children && checkStructure(targetChild, action.children)) {applyNestedChanges(targetChild, action.children);
            return true;}
                else {console.log(`%cструктура потомков не совпадает с ожидаемой для: ${action.pattern}`, 'color: red;');
                    return false;}}
                        else {
                            if (action.value && Array.isArray(action.value)) {action.value.forEach((childPattern) => {
                                if (typeof targetChild === childPattern.child) {console.log(`%cизменение значений потомка ${childKey} с: ${targetChild} на: ${childPattern.value}`, 'color: rgba(32, 255, 0, 1)'); component[childKey] = childPattern.value;}});
                                    return true;}
                                        else {console.error(`%cнеподдерживаемый формат значения для ${childKey}`, 'color: red;');}}
                                            return false;};