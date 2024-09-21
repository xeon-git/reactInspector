import {searchByNameOrIndex} from '../search/searchByNameOrIndex';
import {searchByValue} from '../search/searchByValue';
import {getAllComponents} from '../search/getAllComponents';
import {displayComponents} from '../search/displayComponents';
import {closeMenu} from '../menu/createMenu';

export const performSearch = (searchCriteria, depth) => {
    let foundComponents = [];
    const useIndexPath = document.getElementById('index-path-checkbox').checked;
    const maxDepth = parseInt(depth) || Infinity;

    const searchByNameChecked = document.getElementById('search-by-name-checkbox').checked;
    const searchByValueChecked = document.getElementById('search-by-value-checkbox').checked;

    if ((searchByNameChecked || searchByValueChecked) && searchCriteria === '') {console.log('%cвведи корректный путь или значение для поиска', 'color: #ff6347; font-weight: bold;'); return;}

    if (document.getElementById('search-by-name-checkbox').checked) {foundComponents = searchByNameOrIndex(searchCriteria, maxDepth);}
    if (document.getElementById('search-by-value-checkbox').checked) {foundComponents = foundComponents.concat(searchByValue(searchCriteria, maxDepth));}
    if (document.getElementById('display-all-components-checkbox').checked) {foundComponents = getAllComponents(maxDepth);}

    if (foundComponents.length > 0) {displayComponents(foundComponents, useIndexPath);} else {console.log(`%cкомпонент "${searchCriteria}" не найден`, 'color: #ff6347; font-weight: bold;');} closeMenu();};