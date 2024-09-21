export const displayComponents = (components, useIndexPath) => {
    components.forEach((component, index) => {
        const componentName = component.name || component.path.split('.').pop() || 'компонент без имени';
            console.groupCollapsed(`%cкомпонент ${index + 1}: ${componentName}`, 'color: #9acd32; font-weight: bold;');
                if (component.path) {console.log(`%cименной путь: %c${component.path}`, 'color: #87cefa; font-weight: bold;', 'color: #ffffff;');}
                    if (useIndexPath && component.indexPath) {console.log(`%cпуть из индексов: %c${component.indexPath}`, 'color: #20B2AA; font-weight: bold;', 'color: #ffffff;');} console.log(`%cзначение:`, 'color: #ffa07a; font-weight: bold;', component.value); console.groupEnd();});};