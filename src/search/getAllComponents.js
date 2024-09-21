import {getComponents} from '../search/getComponents';

export const getAllComponents = (depth) => getComponents(root, new Set(), depth);