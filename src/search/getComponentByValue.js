import {traverse} from '../utils/traverse';

export const getComponentByValue = (obj, valueToFind, maxDepth = Infinity, visited = new Set(), currentDepth = 0) => {
    const foundComponents = [];

    const callback = (node, key, componentPath, componentIndexPath, depth) => {
        for (let prop in node) {
            if (node[prop] === valueToFind) {foundComponents.push({value: node, path: componentPath, indexPath: componentIndexPath,});
                break;}}};

    traverse(obj, {path: '', indexPath: '', depth: currentDepth, maxDepth, visited, callback,});
        return foundComponents;};