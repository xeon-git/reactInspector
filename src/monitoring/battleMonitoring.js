import {patterns} from '../patterns';
import {actions} from '../actions';
import {getComponentByPattern} from '../search/getComponentByPattern';
import {cachedPaths} from '../cache/cachedPaths';
import {childActions} from '../actions/childActions';
import {stopAllLoops} from '../loops/stopAllLoops';

export const battleMonitoring = () => {
    let battleActive = false;
    const appliedComponents = new Set();

    const battleMonitorHandlers = {
        applyScenarioToComponent: (component, action) => {childActions(component, action);},
        processComponentsForAction: (components, pattern, action) => {
            const componentHandlers = {
                found: () => {console.groupCollapsed(`%cавтоматическое применение сценария для: ${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)');
                    components.forEach(({component}) => {battleMonitorHandlers.applyScenarioToComponent(component, action);}); console.groupEnd();},
                notFound: () => {console.log(`%c${pattern.componentName} не найден`, 'color: rgba(255, 0, 0, 1)');}}; 
            (components && components.length > 0 ? componentHandlers.found : componentHandlers.notFound)();},
        getComponentsForPattern: (pattern) => {
            const cacheHandlers = {
                hit: (components) => components,
                miss: () => {
                    const result = getComponentByPattern(root, pattern);
                    const components = result.components; 
                        cachedPaths.updateCache(root, pattern, components);
                            return components;}};
            const cachedComponents = cachedPaths.getCachedComponents(root, pattern);
                return (cachedComponents ? cacheHandlers.hit(cachedComponents) : cacheHandlers.miss());},
        processAction: (action) => {
            const actionHandlers = {
                battle: () => {
                    const pattern = patterns.find(p => p.componentName === action.pattern);
                        const patternHandlers = {
                            found: () => {
                                const components = battleMonitorHandlers.getComponentsForPattern(pattern);
                                    battleMonitorHandlers.processComponentsForAction(components, pattern, action);},
                            notFound: () => {}};
                        (pattern ? patternHandlers.found : patternHandlers.notFound)();},
                nonBattle: () => {}};
            (action.battle ? actionHandlers.battle : actionHandlers.nonBattle)();},
        startBattle: () => {battleActive = true; appliedComponents.clear(); //console.log('%cобнаружена битва, применение сценариев через 1 сек', 'color: rgba(255, 255, 0, 1)');
            setTimeout(() => {console.groupCollapsed('%cавтоматическое применение сценариев', 'color: rgba(255, 215, 0, 1)');
                actions.forEach(action => {battleMonitorHandlers.processAction(action);}); console.groupEnd();}, 1);},
        endBattle: () => {stopAllLoops(); battleActive = false;},
        handleBattleContainerChange: (battleContainer) => {
            const battleStateHandlers = {start: () => battleMonitorHandlers.startBattle(), end: () => battleMonitorHandlers.endBattle(), unchanged: () => {}};
            const stateChange = battleContainer && !battleActive ? 'start' : !battleContainer && battleActive ? 'end' : 'unchanged';
            const handler = battleStateHandlers[stateChange]; handler();}};
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            const mutationHandlers = {
                childList: () => {
                    const battleContainer = document.querySelector('.BattleComponentStyle-canvasContainer'); battleMonitorHandlers.handleBattleContainerChange(battleContainer);},
                other: () => {}};
            (mutation.type === 'childList' ? mutationHandlers.childList : mutationHandlers.other)();}});
    observer.observe(document.body, {childList: true, subtree: true});};