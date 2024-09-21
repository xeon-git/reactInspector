import {getComponentByIndexPath} from '../search/getComponentByIndexPath';
import {getComponentByPartialMatch} from '../search/getComponentByPartialMatch';

export const searchByNameOrIndex = (criteria, depth) => {
    if (/^\d+(\.\d+)*$/.test(criteria)) {
        const component = getComponentByIndexPath(root, criteria);
            return component ? [{value: component, path: criteria, indexPath: criteria}] : [];}
                return getComponentByPartialMatch(root, criteria, depth);};