import {matchPatternByTypes} from '../utils/matchPatternByTypes';

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
        let childIndex = 1;
         pattern.structure.forEach((childPattern) => {
            const childKey = Object.keys(component)[childIndex - 1];
            const child = component[childKey];
            const childType = childPattern.type;
            const childName = childPattern.name;

            let color;
            if (childName) {color = 'rgba(255, 181, 0, 1)';}
                else if (childType === 'object') {color = 'rgba(0, 128, 255, 1)';}
                    else if (childType === 'boolean') {color = 'rgba(255, 128, 0, 1)';}
                        else if (childType === 'number') {color = 'rgba(128, 0, 255, 1)';}
                            else {color = 'inherit';}

            if (child === null && childType === 'null') {console.log(`%c${childIndex} потомок (null):`, `color: ${color}`, child);}
                else if (childName) {console.log(`%c${childIndex} потомок (${childName}):`, `color: ${color}`, child);}
                    else if (childType === 'object' && typeof child === 'object') {console.log(`%c${childIndex} потомок (${childType}):`, `color: ${color}`, child);}
                        else {console.log(`%c${childIndex} потомок (${typeof child}):`, `color: ${color}`, child);} childIndex++;});}); console.groupEnd();}
                            else {console.log(`%c${pattern.componentName} не найден`, 'color: rgba(255, 0, 0, 1)');}
                                return result;};