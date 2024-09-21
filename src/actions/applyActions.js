import {patterns} from '../patterns';
import {actions} from '../actions';
import {getComponentByPattern} from '../search/getComponentByPattern';
import {cachedPaths} from '../cache/cachedPaths';
import {childActions} from '../actions/childActions';

export const applyActions = (root, event) => {actions.forEach(action => {
    if (event.keyCode === action.keyCode) {event.preventDefault();
        const pattern = patterns.find(p => p.componentName === action.pattern);
            if (pattern) {
                let components = cachedPaths.getCachedComponents(root, pattern);
                    if (!components) {
                        const result = getComponentByPattern(root, pattern); components = result.components; cachedPaths.updateCache(root, pattern, components);}
                            if (components.length > 0) {console.log(`%cприменение сценария для: ${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)'); components.forEach(({ component }) => {childActions(component, action);});}
                                else {console.log(`%c${pattern.componentName} недоступен для изменений`, 'color: rgba(255, 0, 0, 1)');}}}}); patterns.forEach(pattern => {
                                    if (event.keyCode === pattern.keyCode) {getComponentByPattern(root, pattern);}});};