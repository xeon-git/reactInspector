export const getComponentByIndexPath = (obj, indexPath) => {
    const indexArray = indexPath.split('.');
    let current = obj;
        for (let i = 0; i < indexArray.length; i++) {
            if (current === undefined) return null;
                const index = parseInt(indexArray[i], 10);
                const keys = Object.keys(current);
                    if (isNaN(index) || index < 0 || index >= keys.length) return null; current = current[keys[index]];}
                        return current;};