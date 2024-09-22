import {performSearch} from '../search/performSearch';

let menuOpen = false;

export const menuStyles = () => {
    const styleSheet = document.createElement("style"); styleSheet.type = "text/css"; styleSheet.innerText =
       `@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes fadeOut{from{opacity:1;}to{opacity:0;}}
        #search-menu-background{animation:fadeIn .5s forwards;}
        #search-menu-background.fadeOut{animation:fadeOut .5s forwards;}
        #menu-container{background:rgba(0,0,0,.2);outline:none;padding:1rem;border-radius:1.2rem;border:.150rem solid rgba(255,255,255,.2);box-shadow:0 0 1rem .1rem rgba(0,0,0,.6),inset 0 0 .5rem .15rem rgba(0,0,0,.3);width:50%;text-align:center;display:flex;flex-direction:column;align-items:center;}
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

export const createSearchMenu = () => {menuOpen = true;
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

export const createCheckbox = (id, labelText) => {
    const wrapper = document.createElement('div'); wrapper.className = 'menu-checkbox-wrapper';
    const checkbox = document.createElement('input'); checkbox.id = id; checkbox.type = 'checkbox';
    const label = document.createElement('label'); label.htmlFor = id;
    const span = document.createElement('span'); span.innerText = labelText;

    wrapper.appendChild(span); wrapper.appendChild(checkbox); wrapper.appendChild(label);
        return wrapper;};

export const toggleMenu = () => {menuOpen ? closeMenu() : createSearchMenu();};

export const closeMenu = () => {
    const background = document.getElementById('search-menu-background');
        if (background && background.parentNode === document.body) {background.classList.add('fadeOut'); background.addEventListener('animationend', () => {
            if (background.parentNode === document.body) {document.body.removeChild(background);} menuOpen = false; document.removeEventListener('keydown', handleMenuOpen, true);}, {once: true});}};

export const handleMenuOpen = (event) => {
    const input = document.getElementById('menu-input');
    const depthInput = document.getElementById('menu-depth-input');
    const searchButton = document.getElementById('menu-search-button');

    if (event.keyCode === 120) {toggleMenu(); event.preventDefault();}
        else if (menuOpen) {
            if (event.target === input || event.target === depthInput) {
                if (event.keyCode === 13) {searchButton.click();} event.stopPropagation();}
                    else {event.stopPropagation(); event.preventDefault();}}};