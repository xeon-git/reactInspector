import {patterns} from '../patterns';
import {actions} from '../actions';
import {getComponentByPattern} from '../search/getComponentByPattern';
import {cachedPaths} from '../cache/cachedPaths';
import {childActions} from '../actions/childActions';
import {stopAllLoops} from '../loops/stopAllLoops';

export const battleMonitoring = () => {
    let battleActive = false;
    const appliedComponents = new Set();

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const battleContainer = document.querySelector('.BattleComponentStyle-canvasContainer');
                    if (battleContainer && !battleActive) {battleActive = true; appliedComponents.clear(); actions.forEach(action => {
                        if (action.battle) {
                            const pattern = patterns.find(p => p.componentName === action.pattern);
                                if (pattern) {
                                    let components = cachedPaths.getCachedComponents(root, pattern);
                                        if (!components) {
                                            const result = getComponentByPattern(root, pattern); components = result.components; cachedPaths.updateCache(root, pattern, components);} console.log(`%cавтоматическое применение сценария для: ${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)'); components.forEach(({ component }) => childActions(component, action));}}});}
                                                else if (!battleContainer && battleActive) {stopAllLoops(); battleActive = false;}}}});

    observer.observe(document.body, {childList: true, subtree: true});};