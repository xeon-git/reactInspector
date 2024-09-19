// ==UserScript==
// @name         React Inspector
// @version      3.3
// @description  better user experience
// @author       xeon | xxnn
// @match        https://*.tankionline.com/*
// @icon         https://xeon.fun/logo/blurstyle.png
// ==/UserScript==

(function() {
    'use strict';

    let menuOpen = false;
    let activeLoops = [];

    const menuStyles = () => {
        const styleSheet = document.createElement("style"); styleSheet.type = "text/css"; styleSheet.innerText =
           `@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
            @keyframes fadeOut{from{opacity:1;}to{opacity:0;}}
            #search-menu-background{animation:fadeIn .5s forwards;}
            #search-menu-background.fadeOut{animation:fadeOut .5s forwards;}
            #menu-container{background:rgba(0,0,0,.2);outline:none;padding:1rem;border-radius:1.2rem;border:.150rem solid rgba(255,255,255,.2);box-shadow:0 0 1rem .1rem rgba(0,0,0,.6),inset 0 0 .5rem .15rem rgba(0,0,0,.3);max-width:41%;width:100%;text-align:center;display:flex;flex-direction:column;align-items:center;}
            #menu-header{margin:0;margin-bottom:1rem;color:white;font-size:1.6rem;}
            #menu-content{display:flex;flex-direction:row;align-items:center;justify-content:center;width:100%;margin-bottom:1rem;}
            #menu-checkbox-container{display:flex;justify-content:space-around;width:100%;margin:0;margin-bottom:.1rem;flex-wrap:nowrap;}
            #menu-input{background:transparent;color:white;padding:.5rem;border:.150rem solid rgba(222,184,135,.2);border-radius:1rem;font-size:1rem;margin-bottom:.8rem;width:calc(50% - 1rem);transition:border-color .3s;}
            #menu-depth-input{background:transparent;color:white;padding:.5rem;border:.150rem solid rgba(222,184,135,.2);border-radius:1rem;font-size:1rem;margin-left:.8rem;margin-bottom:.8rem;width:calc(9%);transition:border-color .3s;}
            #menu-input:focus,#menu-depth-input:focus{border-color:rgba(255,188,9,.3);outline:none;}
            #menu-input:hover,#menu-depth-input:hover{border-color:rgba(255,188,9,.3);}
            #menu-switch-container{display:flex;justify-content:center;align-items:center;margin-top:1rem;width:100%;}
            #menu-search-button{padding:.5rem 1.5rem;background-color:transparent;color:white;border:.150rem solid rgba(222,184,135,.2);border-radius:1.2rem;font-size:1.2rem;cursor:pointer;transition:background-color .3s,transform .2s;}
            #menu-search-button:hover{background-color:rgba(255,188,9,.25);}
            #menu-search-button:active{transform:scale(.95);}
            .menu-checkbox-wrapper{display:flex;align-items:center;margin-right:.5rem;}
            .menu-checkbox-wrapper input[type=checkbox]{height:0;width:0;visibility:hidden;}
            .menu-checkbox-wrapper label{cursor:pointer;width:4rem;height:2rem;background:rgba(222,184,135, .2);backdrop-filter:blur(.5rem);display:block;border-radius:2rem;position:relative;transition:background-color .3s;}
            .menu-checkbox-wrapper label:after{content:'';position:absolute;top:.2rem;left:.2rem;width:1.6rem;height:1.6rem;background:#fff;border-radius:50%;transition:.3s;}
            .menu-checkbox-wrapper input:checked+label{background:rgba(255,188,9,.65);}
            .menu-checkbox-wrapper input:checked+label:after{left:calc(100% - .2rem);transform:translateX(-100%);}
            .menu-checkbox-wrapper label:active:after{width:2rem;}
            .menu-checkbox-wrapper span{margin-right:0;font-size:1rem;color:white;}
            .footer{width:100%;display:flex;justify-content:center;margin-top:1.2rem;}`; document.head.appendChild(styleSheet);};

    const createSearchMenu = () => {menuOpen = true;
        if (document.pointerLockElement) {document.exitPointerLock();}

        const background = document.createElement('div'); background.id = 'search-menu-background';
        Object.assign(background.style, {position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)', zIndex: '1000',display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0,cursor: 'default'});

        const menuContainer = document.createElement('div'); menuContainer.id = 'menu-container'; menuContainer.tabIndex = 0; menuContainer.focus(); menuContainer.style.cursor = 'default';
        const title = document.createElement('h2'); title.id = 'menu-header'; title.innerText = 'React Inspector';
        const contentContainer = document.createElement('div'); contentContainer.id = 'menu-content';
        const input = document.createElement('input'); input.id = 'menu-input'; input.type = 'text'; input.placeholder = 'введи именной путь, индексный или же значение';
        const depthInput = document.createElement('input'); depthInput.id = 'menu-depth-input'; depthInput.type = 'number'; depthInput.placeholder = 'глубина'; depthInput.value = Infinity;
        depthInput.addEventListener('input', () => {depthInput.value = depthInput.value.replace(/[^0-9]/g, ''); if (depthInput.value === '') depthInput.value = Infinity;});

        contentContainer.appendChild(input); contentContainer.appendChild(depthInput);

        const checkboxContainer = document.createElement('div'); checkboxContainer.id = 'menu-checkbox-container';
        const searchByNameCheckbox = createCheckbox('search-by-name-checkbox', 'комбинированный поиск'); searchByNameCheckbox.querySelector('input').checked = true;
        const searchByValueCheckbox = createCheckbox('search-by-value-checkbox', 'поиск по значениям');
        const displayAllComponentsCheckbox = createCheckbox('display-all-components-checkbox', 'вывод текущего древа');
        const indexPathCheckbox = createCheckbox('index-path-checkbox', 'отображение индексов');

        checkboxContainer.appendChild(searchByNameCheckbox); checkboxContainer.appendChild(searchByValueCheckbox); checkboxContainer.appendChild(displayAllComponentsCheckbox); checkboxContainer.appendChild(indexPathCheckbox);

        const footer = document.createElement('div'); footer.className = 'footer';
        const searchButton = document.createElement('button'); searchButton.id = 'menu-search-button'; searchButton.innerText = 'поиск'; searchButton.addEventListener('click', () => performSearch(input.value.trim(), depthInput.value));

        footer.appendChild(searchButton);

        menuContainer.appendChild(title); menuContainer.appendChild(contentContainer); menuContainer.appendChild(checkboxContainer); menuContainer.appendChild(footer);

        background.appendChild(menuContainer); document.body.appendChild(background);

        requestAnimationFrame(() => {background.style.opacity = 1; menuContainer.focus();input.focus(); document.addEventListener('keydown', handleMenuOpen, true); document.body.style.cursor = 'default'; menuContainer.style.cursor = 'default'; input.style.cursor = 'text';});

        background.addEventListener('click', (event) => {if (event.target === background) closeMenu();});

        const checkboxes = document.querySelectorAll('#menu-checkbox-container input[type="checkbox"]'); checkboxes.forEach(checkbox => {checkbox.addEventListener('change', function() {
            if (this.id === 'display-all-components-checkbox' && this.checked) {input.value = ''; input.disabled = true;} else {input.disabled = false;}

            const atLeastOneChecked = Array.from(checkboxes).some(cb => cb.checked && cb.id !== 'index-path-checkbox');
                if (!atLeastOneChecked) {this.checked = true;}
                    if (this.id !== 'index-path-checkbox' && this.checked) {checkboxes.forEach(cb => {
                        if (cb !== this && cb.id !== 'index-path-checkbox') cb.checked = false;});}});});};

    const createCheckbox = (id, labelText) => {
        const wrapper = document.createElement('div'); wrapper.className = 'menu-checkbox-wrapper';
        const checkbox = document.createElement('input'); checkbox.id = id; checkbox.type = 'checkbox';
        const label = document.createElement('label'); label.htmlFor = id;
        const span = document.createElement('span'); span.innerText = labelText;

        wrapper.appendChild(span); wrapper.appendChild(checkbox); wrapper.appendChild(label);
            return wrapper;};

    const toggleMenu = () => {menuOpen ? closeMenu() : createSearchMenu();};
    const closeMenu = () => {
        const background = document.getElementById('search-menu-background');
            if (background && background.parentNode === document.body) {background.classList.add('fadeOut'); background.addEventListener('animationend', () => {
                if (background.parentNode === document.body) {document.body.removeChild(background);} menuOpen = false; document.removeEventListener('keydown', handleMenuOpen, true);}, {once: true});}};

    const handleMenuOpen = (event) => {
        const input = document.getElementById('menu-input');
        const depthInput = document.getElementById('menu-depth-input');
        const searchButton = document.getElementById('menu-search-button');

        if (event.keyCode === 120) {toggleMenu(); event.preventDefault();}
            else if (menuOpen) {
                if (event.target === input || event.target === depthInput) {
                    if (event.keyCode === 13) {searchButton.click();} event.stopPropagation();}
                        else {event.stopPropagation(); event.preventDefault();}}};

    const performSearch = (searchCriteria, depth) => {
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

    const searchByNameOrIndex = (criteria, depth) => {
        if (/^\d+(\.\d+)*$/.test(criteria)) {
            const component = getComponentByIndexPath(root, criteria);
                return component ? [{value: component, path: criteria, indexPath: criteria}] : [];}
                    return getComponentByPartialMatch(root, criteria, depth);};

    const searchByValue = (value, depth) => {
        const valueToFind = isNaN(value) ? value : Number(value);
            return getComponentByValue(root, valueToFind, depth);};

    const getAllComponents = (depth) => getComponents(root, new Set(), depth);

    const displayComponents = (components, useIndexPath) => {
        components.forEach((component, index) => {
            const componentName = component.name || component.path.split('.').pop() || 'компонент без имени';
                console.groupCollapsed(`%cкомпонент ${index + 1}: ${componentName}`, 'color: #9acd32; font-weight: bold;');
                    if (component.path) {console.log(`%cименной путь: %c${component.path}`, 'color: #87cefa; font-weight: bold;', 'color: #ffffff;');}
                        if (useIndexPath && component.indexPath) {console.log(`%cпуть из индексов: %c${component.indexPath}`, 'color: #20B2AA; font-weight: bold;', 'color: #ffffff;');} console.log(`%cзначение:`, 'color: #ffa07a; font-weight: bold;', component.value); console.groupEnd();});};

    const getComponents = (obj, visited = new Set(), maxDepth = Infinity, currentDepth = 0) => {
        const components = [];
        const visitedComponents = new Set();

        const callback = (node, key, componentPath, componentIndexPath, depth) => {
            if (node?.constructor?.$metadata$?.simpleName) {
                const componentName = node.constructor.$metadata$.simpleName;
                    if (!visitedComponents.has(componentName)) {components.push({name: componentName, value: node, path: componentPath, indexPath: componentIndexPath}); visitedComponents.add(componentName);}}};
                        traverse(obj, {path: '', indexPath: '', depth: currentDepth, maxDepth, visited, callback,});
                            return components;};

    const getComponentByIndexPath = (obj, indexPath) => {
        const indexArray = indexPath.split('.');
        let current = obj;

        for (let i = 0; i < indexArray.length; i++) {
            if (current === undefined) return null;
            const index = parseInt(indexArray[i], 10);
            const keys = Object.keys(current);

        if (isNaN(index) || index < 0 || index >= keys.length) return null; current = current[keys[index]];}
            return current;};

    const getComponentByValue = (obj, valueToFind, maxDepth = Infinity, visited = new Set(), currentDepth = 0) => {
        const foundComponents = [];

        const callback = (node, key, componentPath, componentIndexPath, depth) => {
            for (let prop in node) {
                if (node[prop] === valueToFind) {foundComponents.push({value: node, path: componentPath, indexPath: componentIndexPath,});
                    break;}}};

        traverse(obj, {path: '', indexPath: '', depth: currentDepth, maxDepth, visited, callback,});
            return foundComponents;};

    const getComponentByPartialMatch = (obj, searchTerm, maxDepth = Infinity, visited = new Set(), currentDepth = 0) => {
        const foundComponents = [];

        const callback = (node, key, componentPath, componentIndexPath, depth) => {
            if (componentPath.includes(searchTerm) || key.includes(searchTerm)) {foundComponents.push({name: key, value: node, path: componentPath, indexPath: componentIndexPath});}};
                traverse(obj, {path: '', indexPath: '', depth: currentDepth, maxDepth, visited, callback,});
                    return foundComponents;};

    const getComponentByPattern = (root, pattern) => {
        const result = {components: [], namedComponents: {}};
        const patternEntryMap = new Map(); pattern.structure.forEach(entry => {
            if (entry.name) {patternEntryMap.set(entry.name, entry);}});

        const callback = (obj, depth = 0, path = [], visited = new Set()) => {
            if (visited.has(obj) || depth > pattern.depth || typeof obj !== 'object' || obj === null) 
                return; visited.add(obj);

            if (matchPatternByTypes(obj, pattern.structure)) {result.components.push({component: obj, path: [...path]});}

            for (let key in obj) {
                const child = obj[key];
                    if (typeof child === 'object' && child !== null) {
                        const patternEntry = patternEntryMap.get(key);
                            if (patternEntry) {
                                if (!result.namedComponents[patternEntry.name]) {result.namedComponents[patternEntry.name] = [];} result.namedComponents[patternEntry.name].push({component: child, path: [...path, key]});}
                                    callback(child, depth + 1, [...path, key], visited);}}};
                                        callback(root);

        if (result.components.length > 0) {console.groupCollapsed(`%c${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)'); result.components.forEach(({component}) => {
                let childIndex = 1;
                pattern.structure.forEach((childPattern) => {
                    const childKey = Object.keys(component)[childIndex - 1];
                    const child = component[childKey];
                    const childType = childPattern.type;
                    const childName = childPattern.name;

                    let color;
                    if (childName) {color = 'rgba(255, 181, 0, 1)';}
                        else if (childType === 'object') {color = 'rgba(0, 128, 255, 1)';}
                            else if (childType === 'boolean') {color = 'rgba(255, 128, 0, 1)';}
                                else if (childType === 'number') {color = 'rgba(128, 0, 255, 1)';}
                                    else {color = 'inherit';}

                    if (child === null && childType === 'null') {console.log(`%c${childIndex} потомок (null):`, `color: ${color}`, child);}
                        else if (childName) {console.log(`%c${childIndex} потомок (${childName}):`, `color: ${color}`, child);}
                            else if (childType === 'object' && typeof child === 'object') {console.log(`%c${childIndex} потомок (${childType}):`, `color: ${color}`, child);}
                                else {console.log(`%c${childIndex} потомок (${typeof child}):`, `color: ${color}`, child);} childIndex++;});}); console.groupEnd();}
                                    else {console.log(`%c${pattern.componentName} не найден`, 'color: rgba(255, 0, 0, 1)');}
                                        return result;};

    const matchPatternByTypes = (obj, structure) => {
        const float32ArrayIncluded = structure.some(item => item.type === 'float32Array');
        const objValues = Object.values(obj);

        if (objValues.length !== structure.length) {
            return false;}

        for (let i = 0; i < objValues.length; i++) {
            let valueType;
            const value = objValues[i];

            if (value === null) {valueType = 'null';}
                else if (float32ArrayIncluded && value instanceof Float32Array) {valueType = 'float32Array';}
                    else if (Array.isArray(value)) {valueType = 'array';}
                        else {valueType = typeof value;}

            const expectedType = structure[i].type;

            if (valueType !== expectedType) {
                return false;}}
                    return true;};

    const traverse = (obj, {path = '', indexPath = '', depth = 0, maxDepth = Infinity, visited = new Set(), callback = () => {},}) => {
        if (visited.has(obj) || depth > maxDepth || typeof obj !== 'object' || obj === null) return; visited.add(obj);

        let childIndex = 0;

        for (let key in obj) {
            const child = obj[key];
            if (typeof child === 'object' && child !== null) {
                const componentPath = path ? `${path}.${key}` : key;
                const componentIndexPath = indexPath ? `${indexPath}.${childIndex}` : `${childIndex}`;

                callback(child, key, componentPath, componentIndexPath, depth);
                traverse(child, {path: componentPath, indexPath: componentIndexPath, depth: depth + 1, maxDepth, visited, callback,});} childIndex++;}};

    const cachedPaths = {paths: {},
        isValidPath(root, path) {
            let current = root;
                for (let key of path) {
                    if (typeof current !== 'object' || current === null) {
                        return false;}current = current[key];}
                            return true;},

        getComponentByPath(root, path) {
            let current = root;
                for (let key of path) {current = current[key];}
                    return current;},

        clearIfInvalid(root, pattern) {
            const cacheKey = pattern.componentName;
            if (this.paths[cacheKey]) {
                const invalidPaths = this.paths[cacheKey].filter(({ path }) => !this.isValidPath(root, path));
                    if (invalidPaths.length > 0) {console.log(`%cкэш очищен для: ${cacheKey}`, 'color: rgba(255, 0, 0, 1)'); delete this.paths[cacheKey];}}},

        updateCache(root, pattern, components) {this.paths[pattern.componentName] = components.map(({path}) => ({path}));},

        getCachedComponents(root, pattern) {
            const cacheKey = pattern.componentName; this.clearIfInvalid(root, pattern);

            if (this.paths[cacheKey]) {
                const validComponents = this.paths[cacheKey].filter(({path}) => this.isValidPath(root, path));
                if (validComponents.length > 0) {
                    return validComponents.map(({path}) => ({component: this.getComponentByPath(root, path), path}));}}
                        return null;}};

    const battleMonitoring = () => {
        let battleActive = false;
        const appliedComponents = new Set();

        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const battleContainer = document.querySelector('.BattleComponentStyle-canvasContainer');

                    if (battleContainer && !battleActive) {battleActive = true; appliedComponents.clear();

                        actions.forEach(action => {
                            if (action.battle) {
                                const pattern = patterns.find(p => p.componentName === action.pattern);

                                if (pattern) {
                                    let components = cachedPaths.getCachedComponents(root, pattern);
                                        if (!components) {
                                            const result = getComponentByPattern(root, pattern); components = result.components; cachedPaths.updateCache(root, pattern, components);} console.log(`%cавтоматическое применение сценария для: ${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)'); components.forEach(({ component }) => childActions(component, action));}}});}
                                                else if (!battleContainer && battleActive) {stopAllLoops(); battleActive = false;}}}});
        observer.observe(document.body, { childList: true, subtree: true });};

    const applyActions = (root, event) => {actions.forEach(action => {
            if (event.keyCode === action.keyCode) {event.preventDefault();
                const pattern = patterns.find(p => p.componentName === action.pattern);

                if (pattern) {
                    let components = cachedPaths.getCachedComponents(root, pattern);
                    if (!components) {
                        const result = getComponentByPattern(root, pattern); components = result.components; cachedPaths.updateCache(root, pattern, components);}

                    if (components.length > 0) {console.log(`%cприменение сценария для: ${pattern.componentName}`, 'color: rgba(32, 255, 0, 1)'); components.forEach(({ component }) => childActions(component, action));}
                        else {console.log(`%c${pattern.componentName} недоступен для изменений`, 'color: rgba(255, 0, 0, 1)');}}}}); patterns.forEach(pattern => {
                            if (event.keyCode === pattern.keyCode) {
                                const result = getComponentByPattern(root, pattern);}});};

    const childActions = (component, action) => {
        const childIndex = parseInt(action.child) - 1;
        const targetChild = Object.values(component)[childIndex];
        const childKey = Object.keys(component)[childIndex];

        if (targetChild === undefined) {console.error(`%cпотомок с индексом ${childIndex + 1} не найден`, 'color: red;');
            return false;}

        if (typeof targetChild === 'object') {
            const actualTypeSequence = Object.values(targetChild).map(value => value === null ? 'null' : typeof value);
            const expectedTypeSequence = action.children.map(child => child.child);

            const actualTypeCount = actualTypeSequence.reduce((acc, type) => {acc[type] = (acc[type] || 0) + 1;
                return acc;},{});

            const expectedTypeCount = expectedTypeSequence.reduce((acc, type) => {acc[type] = (acc[type] || 0) + 1;
                return acc;},{});

            const structureMatching = Object.keys(expectedTypeCount).every(type => expectedTypeCount[type] === actualTypeCount[type]);
                if (structureMatching && expectedTypeSequence.length === actualTypeSequence.length) {action.children.forEach((childPattern, index) => {
                    const childKey = Object.keys(targetChild)[index];
                    const child = targetChild[childKey];

                    if (childPattern.loopValue) {applyLoopValues(targetChild, childKey, childPattern.loopValue);}
                        else if (childPattern.value !== undefined) {console.log(`%cизменение ${index + 1} потомка (${childKey}): %c${child} %c→ %c${childPattern.value}`, 'color: #3498db;', 'color: #e74c3c;', 'color: #2ecc71;', 'color: #9b59b6;'); targetChild[childKey] = childPattern.value;}});
                            return true;}
                                else {console.log(`%cструктура потомков не совпадает с ожиданием для: ${action.pattern}`, 'color: red;');
                                    return false;}}
                                        else if (action.value && action.value.length > 0) {action.value.forEach((childPattern) => {
                                            if (typeof targetChild === childPattern.child) {console.log(`%cизменение значений потомка ${childKey} с: ${targetChild} на: ${childPattern.value}`, 'color: rgba(32, 255, 0, 1)'); component[childKey] = childPattern.value;}});
                                                return true;}
                                                    return false;};

    const applyLoopValues = (component, childKey, loopValue) => {
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

    const stopAllLoops = () => {activeLoops.forEach(timeoutId => clearTimeout(timeoutId)); activeLoops = []; console.log('%cвсе циклы остановлены', 'color: rgba(255, 0, 0, 1)');};

    const patterns = [
        {
            componentName: 'lightComponent',
            keyCode: 112, /* F1 */
            depth: 17,
            structure: [
                {type: 'object'},
                {type: 'number'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'object'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'boolean', name: 'toggleLight'},
                {type: 'object', name: 'shadows'},
                {type: 'object', name: 'shadows1'},
                {type: 'object', name: 'shadows2'},
                {type: 'object'},
                {type: 'number'}
            ]
        },
        {
            componentName: 'suppliesComponent',
            keyCode: 113, /* F2 */
            depth: 20,
            structure: [
                {type: 'object', name: 'nuclear'},
                {type: 'object', name: 'repair'},
                {type: 'object', name: 'armor'},
                {type: 'object', name: 'damage'},
                {type: 'object', name: 'nitro'},
                {type: 'object', name: 'mine'},
                {type: 'object', name: 'gold'},
                {type: 'object', name: 'grenade'},
                {type: 'object'},
                {type: 'object'},
                {type: 'object'},
                {type: 'object'},
                {type: 'null'},
                {type: 'null'},
                {type: 'null'},
                {type: 'null'}
            ]
        },
        {
            componentName: 'skyboxComponent',
            keyCode: 114, /* F3 */
            depth: 15,
            structure: [
                {type: 'object'},
                {type: 'object', name: 'skybox'},
                {type: 'object', name: 'skybox1'},
                {type: 'string'},
                {type: 'boolean'},
                {type: 'number'},
                {type: 'object'},
                {type: 'object'},
                {type: 'null'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'boolean'},
                {type: 'object'},
                {type: 'boolean'},
                {type: 'null'},
                {type: 'object'},
                {type: 'float32Array'},
                {type: 'float32Array'},
                {type: 'number'},
                {type: 'object'},
                {type: 'object'},
                {type: 'object'},
                {type: 'object'},
            ]
        },
    ];

    const actions = [
        /* освещение */
        {   /* лучше всего под темные карты */
            pattern: 'lightComponent',
            battle: true,
            keyCode: 118, /* F7 */
            child: '12', /* shadows */
            children: [
                {child: 'number'},
                {child: 'number'},
                {child: 'number', value: -0.3}
            ]
        },
        {
            pattern: 'lightComponent',
            battle: true,
            keyCode: 118, /* F7 */
            child: '13', /* shadows1 */
            children: [
                {child: 'number', value: 0.87},
                {child: 'number', value: 0.87},
                {child: 'number', value: 0.87},
                {child: 'number'}
            ]
        },
        {
            pattern: 'lightComponent',
            battle: true,
            keyCode: 118, /* F7 */
            child: '14', /* shadows2 */
            children: [
                {child: 'number', value: 0.87},
                {child: 'number', value: 0.87},
                {child: 'number', value: 0.87},
                {child: 'number'}
            ]
        },
        {
            pattern: 'lightComponent',
            keyCode: 118, /* F7 */
            child: '11', /* toggleLight */
            value: [
                {child: 'boolean', value: true}
            ]
        },
        {   /* цикл источника */
            pattern: 'lightComponent',
            keyCode: 105, /* нам9 */
            child: '12', /* shadows */
            children: [
                {child: 'number'},
                {child: 'number'},
                {child: 'number', loopValue: '-0.5/0![0.001](15)'}
            ]
        },
        /* припасы */
        {   /* ядерка */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '1',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '1611(0)'},
                {child: 'object'},
            ]
        },
        {   /* аптечка */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '2',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '318000(0)'},
                {child: 'object'},
            ]
        },
        {   /* да */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '3',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '402000(0)'},
                {child: 'object'},
            ]
        },
        {   /* дд */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '4',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '449000(0)'},
                {child: 'object'},
            ]
        },
        {   /* нитро */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '5',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '491000(0)'},
                {child: 'object'},
            ]
        },
        {   /* мина */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '6',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '1242000(0)'},
                {child: 'object'},
            ]
        },
        {   /* голд */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '7',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number', loopValue: '1(150)'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '4614(150)'},
                {child: 'object'},
            ]
        },
        {   /* граната */
            pattern: 'suppliesComponent',
            battle: true,
            keyCode: 96, /* нам0 */
            child: '8',
            children: [
                {child: 'object'},
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '24018(150)'},
                {child: 'object'},
            ]
        },
        /* скайбокс */
        {   /* цикл скайбокса */
            pattern: 'skyboxComponent',
            keyCode: 104, /* нам8 */
            child: '2', /* skybox */
            children: [
                {child: 'number'}, /* x */
                {child: 'number'}, /* y */
                {child: 'number', loopValue: '0/100![0.0050](0)'}, /* z */
            ]
        },
    ];

    const init = () => {menuStyles(); battleMonitoring(); window.addEventListener('keydown', handleMenuOpen, true); window.addEventListener('keydown', (event) => {applyActions(root, event);});}; init();
})();