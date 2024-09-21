import {stopAllLoops} from '../loops/stopAllLoops';

export let activeLoops = [];

export const applyLoopValues = (component, childKey, loopValue) => {
    let valueIndex = 0;
    let delayTime;
    let values = [];

    const rangeMatch = loopValue.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)(!)?\[(\d+(?:\.\d+)?)\]\((\d+)\)$/);
    const singleValueMatch = loopValue.match(/^(-?\d+(?:\.\d+)?|\d+)\((\d+)\)$/);

    if (rangeMatch) {
        const start = parseFloat(rangeMatch[1]);
        const end = parseFloat(rangeMatch[2]);
        const reverse = !!rangeMatch[3];
        const stepValue = parseFloat(rangeMatch[4]); delayTime = parseInt(rangeMatch[5], 10);

        if (start <= end) {
            for (let index = start; index <= end; index += stepValue) values.push(index);
                if (reverse) {
                    for (let index = end; index >= start; index -= stepValue) values.push(index);}}
                        else {
                            for (let index = start; index >= end; index -= stepValue) values.push(index);
                                if (reverse) {
                                    for (let index = end; index <= start; index += stepValue) values.push(index);}}

        const loop = () => {
            if (values.length === 0) return; component[childKey] = values[valueIndex]; valueIndex = (valueIndex + 1) % values.length;
                const timeoutId = setTimeout(loop, delayTime); activeLoops.push(timeoutId);}; loop();}
                    else if (singleValueMatch) {
                        const singleValue = parseFloat(singleValueMatch[1]); delayTime = parseInt(singleValueMatch[2], 10);
                        const loop = () => {component[childKey] = singleValue;
                            const timeoutId = setTimeout(loop, delayTime); activeLoops.push(timeoutId);}; loop();}
                                else {console.error('некорректный формат loopValue:', loopValue);}
                                    window.addEventListener('keydown', (event) => {
                                        if (event.keyCode === 106) {stopAllLoops();}});};