export const traverse = (obj, {path = '', indexPath = '', depth = 0, maxDepth = Infinity, visited = new Set(), callback = () => {},}) => {
    if (visited.has(obj) || depth > maxDepth || typeof obj !== 'object' || obj === null) return; visited.add(obj);
        let childIndex = 0;
            for (let key in obj) {
                const child = obj[key];
                    if (typeof child === 'object' && child !== null) {
                        const componentPath = path ? `${path}.${key}` : key;
                        const componentIndexPath = indexPath ? `${indexPath}.${childIndex}` : `${childIndex}`;

                        callback(child, key, componentPath, componentIndexPath, depth);
                        traverse(child, {path: componentPath, indexPath: componentIndexPath, depth: depth + 1, maxDepth, visited, callback,});} childIndex++;}};