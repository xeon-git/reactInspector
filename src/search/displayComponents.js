import {getDetailedType} from '../utils/getDetailedType';

export const displayComponents = (components, useIndexPath) => {
    components.forEach((component, index) => {
        const componentName = component.name || component.path.split('.').pop() || 'компонент без имени'; console.groupCollapsed(`%cкомпонент ${index + 1}: ${componentName}`, 'color: #9acd32; font-weight: bold;');
            if (component.path) {console.log(`%cименной путь: %c${component.path}`, 'color: #87cefa; font-weight: bold;', 'color: #ffffff;');}
                if (useIndexPath && component.indexPath) {console.log(`%cпуть из индексов: %c${component.indexPath}`, 'color: #20B2AA; font-weight: bold;', 'color: #ffffff;');} console.log(`%cзначение:`, 'color: #ffa07a; font-weight: bold;', component.value);
                    const generatedPattern = generatePattern(component.value); console.groupCollapsed(`%cпаттерн:`, 'color: #ff9800; font-weight: bold;'); console.log(`   structure: [
${generatedPattern}
    ]`); console.groupEnd(); console.groupEnd();});};

const generatePattern = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return '        {type: \'unknown\'}';}
    
    let pattern = '';
    const keys = Object.keys(obj);
        keys.forEach((key, index) => {
            const value = obj[key];
            const type = getDetailedType(value);
                pattern += `        {type: '${type}'`;

        if (type === 'object' && value !== null) {
            const childKeys = Object.keys(value);

            if (childKeys.length > 0) {
                pattern += `,
            children: [
`;
            childKeys.forEach((childKey, childIndex) => {
                const childValue = value[childKey];
                const childType = getDetailedType(childValue);
                    pattern += `                {child: '${childType}'}`;
                if (childIndex < childKeys.length - 1) {pattern += ',\n';}
                else {pattern += '\n';}});
            pattern += `            ]`;}}
        
        if (index < keys.length - 1) {
            pattern += `,
`;}});
    return pattern;
};