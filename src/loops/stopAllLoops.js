import {activeLoops} from '../loops/applyLoopValues';

export const stopAllLoops = () => {
    if (Array.isArray(activeLoops)) {activeLoops.forEach(timeoutId => clearTimeout(timeoutId)); activeLoops.length = 0; console.log('%cвсе циклы остановлены', 'color: rgba(255, 0, 0, 1)');}};