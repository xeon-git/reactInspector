import {traverse} from '../utils/traverse';

export const getComponentByPartialMatch = (obj, searchTerm, maxDepth = Infinity, visited = new Set(), currentDepth = 0) => {
    const foundComponents = [];

    const callback = (node, key, componentPath, componentIndexPath, depth) => {
        if (componentPath.includes(searchTerm) || key.includes(searchTerm)) {foundComponents.push({name: key, value: node, path: componentPath, indexPath: componentIndexPath});}};
            traverse(obj, {path: '', indexPath: '', depth: currentDepth, maxDepth, visited, callback,});
                return foundComponents;};