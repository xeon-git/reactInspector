import {matchPatternByTypes} from '../utils/matchPatternByTypes';
import {getDetailedType} from '../utils/getDetailedType';

export const getComponentByPattern = (root, pattern) => {
    const result = {components: [], namedComponents: {}};
    const patternEntryMap = new Map(); pattern.structure.forEach(entry => {
        if (entry.name) {patternEntryMap.set(entry.name, entry);}});

    const callback = (obj, depth = 0, path = [], visited = new Set()) => {
        if (visited.has(obj) || depth > pattern.depth || typeof obj !== 'object' || obj === null)
            return; visited.add(obj);

        if (matchPatternByTypes(obj, pattern.structure)) {result.components.push({component: obj, path: [...path]});}

        for (let key in obj) {
            const child = obj[key];
                if (typeof child === 'object' && child !== null) {
                    const patternEntry = patternEntryMap.get(key);
                        if (patternEntry) {
                            if (!result.namedComponents[patternEntry.name]) {result.namedComponents[patternEntry.name] = [];} result.namedComponents[patternEntry.name].push({component: child, path: [...path, key]});}
                                callback(child, depth + 1, [...path, key], visited);}}};
                                    callback(root);

    if (result.components.length > 0) {console.groupCollapsed(`%c${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)'); result.components.forEach(({component}) => {
        let childIndex = 1; pattern.structure.forEach((childPattern) => {
            const childKey = Object.keys(component)[childIndex - 1];
            const child = component[childKey];
            const childType = childPattern.type;
            const childName = childPattern.name;

            const colorMap = {named: 'rgba(255, 181, 0, 1)', object: 'rgba(0, 128, 255, 1)', boolean: 'rgba(255, 128, 0, 1)', number: 'rgba(128, 0, 255, 1)', default: 'inherit'};            
            const color = childName ? colorMap.named : childType === 'object' ? colorMap.object : childType === 'boolean' ? colorMap.boolean : childType === 'number' ? colorMap.number : colorMap.default;

            const logHandlers = {
                nullType: () => {console.log(`%c${childIndex} потомок (null):`, `color: ${color}`, child);},
                named: () => {console.log(`%c${childIndex} потомок (${childName}):`, `color: ${color}`, child);},
                object: () => {console.log(`%c${childIndex} потомок (${childType}):`, `color: ${color}`, child);
                    if (childPattern.children) {console.groupCollapsed(`%cдети потомка ${childIndex}`, 'color: rgba(255, 215, 0, 1)');
                        let grandchildIndex = 1;
                        Object.keys(child).forEach(grandchildKey => {
                            const grandchild = child[grandchildKey];
                            const grandchildType = getDetailedType(grandchild);
                            const grandchildColorMap = {object: 'rgba(0, 128, 255, 1)', boolean: 'rgba(255, 128, 0, 1)', number: 'rgba(128, 0, 255, 1)', array: 'rgba(255, 105, 180, 1)', default: 'inherit'};
                            const grandchildColor = grandchildType === 'object' ? grandchildColorMap.object
                                : grandchildType === 'boolean' ? grandchildColorMap.boolean
                                : grandchildType === 'number' ? grandchildColorMap.number
                                : grandchildType.includes('array') ? grandchildColorMap.array
                                : grandchildColorMap.default; console.log(`%c${grandchildIndex} потомок (${grandchildType}):`, `color: ${grandchildColor}`, grandchild); grandchildIndex++;}); console.groupEnd();}},
                default: () => {console.log(`%c${childIndex} потомок (${typeof child}):`, `color: ${color}`, child);}};
            
            ((child === null && childType === 'null') ? logHandlers.nullType : childName ? logHandlers.named : (childType === 'object' && typeof child === 'object') ? logHandlers.object : logHandlers.default)(); childIndex++;});}); console.groupEnd();}
                else {console.log(`%c${pattern.componentName} не найден`, 'color: rgba(255, 0, 0, 1)');}
                    return result;};