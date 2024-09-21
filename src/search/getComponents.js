import {traverse} from '../utils/traverse';

export const getComponents = (obj, visited = new Set(), maxDepth = Infinity, currentDepth = 0) => {
    const components = [];
    const visitedComponents = new Set();

    const callback = (node, key, componentPath, componentIndexPath, depth) => {
        if (node?.constructor?.$metadata$?.simpleName) {
            const componentName = node.constructor.$metadata$.simpleName;
                if (!visitedComponents.has(componentName)) {components.push({name: componentName, value: node, path: componentPath, indexPath: componentIndexPath}); visitedComponents.add(componentName);}}};
                    traverse(obj, {path: '', indexPath: '', depth: currentDepth, maxDepth, visited, callback,});
                        return components;};