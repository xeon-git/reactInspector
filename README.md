## ![image](https://xeon.fun/reactInspector/attachments/miniLogo.svg) О проекте

**React Inspector** — это универсальный проект, первичная цель которого состоит в упрощении взаимодействия с компонентной средой любого реакт приложения/игры с пользователем

- Пример реализации проекта показан на игре "Танки Онлайн", продвинутые пользователи могут адаптировать этот проект под любые другие, внеся небольшие изменения

*(Важное примечание: автор проекта не несет ответственность за дальнейшее использование/модификации со злым умыслом)*

## ![image](https://xeon.fun/logo/team.svg) Участвовали в разработке

- Логистика, дизайн и концепция в целом: [VK](https://vk.com/id468802366) | DS - <code>.hierophant.</code>
- Тестирование проекта, дизайн, идеи: [VK](https://vk.com/id362783176) | DS - <code>opium5834</code>
- Тестирование проекта, идеи: [VK](https://vk.com/id855075302) | DS - <code>neontechfox</code>

## ![image](https://xeon.fun/logo/download.svg) Установка для браузера

1. Установите/обновите расширение Tampermonkey: [жмать сюда](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Установите/обновите скрипт с реакт инспектором: [жмать сюда](https://xeon.fun/reactInspector/reactInspector.user.js)
3. Перезагрузите вкладку с приложением/игрой, если она открыта

## ![image](https://xeon.fun/logo/hotkeys.svg) Горячие клавиши

- <code>F9</code> - Показ/скрытие меню с различными видами поиска
- <code>F1</code> - Вывод в консоль компонента с освещением
- <code>F2</code> - Вывод в консоль компонента с припасами
- <code>F3</code> - Вывод в консоль компонента со скайбоксом
- <code>F7</code> - Активация сеттинга с освещением на карте
- <code>Numpad0</code> - Активация смены припасов в битве
- <code>Numpad8</code> - Активация вращения скайбокса по горизонтали, лучше всего сочетается с такой текстурой скайбокса [жмать сюда](https://xeon.fun/battle/skybox/parkour/darkspace.png)
- <code>Numpad9</code> - Активация циклического перемещения источника света
- <code>Numpad*</code> - Ручная деактивация всех активных циклов *(обычно циклы автоматически чистятся после выхода из битвы)*

## ![image](https://xeon.fun/logo/plan.svg) В планах реализовать/в разработке

- Добавить и проработать больше сетов с освещением в игре
- Реализация дополнительной секции в меню для лучшего взаимодействия с паттернами и сценариями
- Реализация отслеживания компонента *(слежка в реалтайме за изменениями внутри объекта)*
- Реализация условных конструкций в паре с отслеживанием
- Перевод массивов с паттернами и сценариями в жсон формат и парсинг в локалсторедж *(дополнение к секции меню)*
- Оптимизация алгоритмов поиска и улучшение их эффективности даже в самой глубокой структуре
- Улучшить логирование и их общую компоновку

## ![image](https://xeon.fun/logo/warning.svg) Список багов и нюансов, про которые уже известно

- Баги со стилями в меню
- Баги с логами
- Длительный поиск и фильтрация компоненентов на слабых устройствах

## ![image](https://xeon.fun/reactInspector/attachments/codeExample.svg) Примеры взаимодействия

1. Видеодемонстрация работы циклов в сценариях на примере <code>skyboxComponent</code>: [жмать сюда](https://xeon.fun/reactInspector/attachments/exampleSkybox.mp4)
- Как это выглядело в массиве сценариев:

```javascript
export const actions = [
    {
        pattern: 'skyboxComponent',
        keyCode: 104,
        child: '2',
        children: [
            {child: 'number'},
            {child: 'number'},
            {child: 'number', loopValue: '0/100![0.0050](0)'}
        ]
    },
]
```
*loopValue - это циклическое значение, т.е в данном случае задано значение от <code>0</code> до <code>100</code>, с реверсом <code>!</code>, с шагом циклического прохода <code>0.0050</code> и задержкой <code>0</code> миллисекунд*

- Как это выглядело в массиве паттернов:
```javascript
export const patterns = [
    {
        componentName: 'skyboxComponent',
        keyCode: 114,
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
            {type: 'object'}
        ]
    }
]
```

2. Демонстрация работы сценариев без циклов на примере <code>lightComponent</code>:

*До использования сценария:*
![](https://xeon.fun/reactInspector/attachments/exampleDefaultLight.jpg)

*После использования сценария:*
![](https://xeon.fun/reactInspector/attachments/exampleModifiedLight.jpg)
- Как это выглядело в массиве сценариев:

```javascript
export const actions = [
    {
        pattern: 'lightComponent',
        battle: true,
        keyCode: 118,
        child: '12',
        children: [
            {child: 'number'},
            {child: 'number'},
            {child: 'number', value: -0.3}
        ]
    },
    {
        pattern: 'lightComponent',
        battle: true,
        keyCode: 118,
        child: '13',
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
        keyCode: 118,
        child: '14',
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
        keyCode: 118,
        child: '11',
        value: [
            {child: 'boolean', value: true}
        ]
    }
]
```
*value - это одиночная смена значений, т.е в данном случае задаются значения с синтаксисом <code>value: -0.3</code> для различных потомков и их типов*

*(Примечание: флаг <code>battle: true</code> устанавливается только в том случае, если мы хотим автоматически применить заданный сценарий как только загрузились в битву)*

- Как это выглядело в массиве паттернов:
```javascript
export const patterns = [
    {
        componentName: 'lightComponent',
        keyCode: 112,
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
            {type: 'object', name: 'light'},
            {type: 'object', name: 'light1'},
            {type: 'object'},
            {type: 'number'}
        ]
    },
]
```

3. Демонстрация более простой интеракции с потомками без углублений, если они находятся на одном уровне в родителе:
- Как это выглядело в массиве сценариев:
```javascript
export const actions = [
    {
        pattern: 'lightComponent',
        keyCode: 118,
        child: '11',
        value: [
            {child: 'boolean', value: true}
        ]
    },
]
```
*В данном случае мы указываем сразу <code>value</code> без явного указания <code>children</code> как это было с другими примерами, поскольку <code>11</code> потомок не является объектом*

4. Демонстрация более сложной интеракции с потомками:

- Как это выглядело в массиве cценариев:
```javascript
export const actions = [
    {
        pattern: 'suppliesComponent',
        keyCode: 97,
        child: '1',
        children: [
            {
                child: 'object',
                children: [
                    {child: 'string', value: "GAYCLEAR"},
                    {child: 'number'},
                        {
                            child: 'object',
                            children: [
                                {child: 'string', value: "GAYCLEAR"},
                                {child: 'number'}
                            ]
                        }
                    ]
                },
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '1611(0)'},
                {child: 'object'}
        ]
    },
]
```
*На данном примере прекрасно видно, что мы проникли во множество вложенностей внутри первого потомока от компонента <code>suppliesComponent</code> и поменяли значения внутри потомков с <code>NUCLEAR</code> на <code>GAYCLEAR</code>*

5. Демонстрация составления паттерна на примере <code>lightComponent</code>:
*Предположим, что мы наткнулись на объект после тщательного анализа всего древа с его вложенностями, извлекли частичный именной путь <code>o3h_1.n3d_1</code>:*
![](https://xeon.fun/reactInspector/attachments/exampleSearchPattern.jpg)
*После чего мы находим нужный нам компонент:*
![](https://xeon.fun/reactInspector/attachments/exampleFoundPattern.jpg)
*После анализа структуры выведенного компонента мы составляем паттерн на его основе:*
![](https://xeon.fun/reactInspector/attachments/exampleCreatedPattern.jpg)
- Как это выглядело в массиве паттернов:
```javascript
export const patterns = [
    {
        componentName: 'lightComponent',
        keyCode: 112,
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
            {type: 'object', name: 'light'},
            {type: 'object', name: 'light1'},
            {type: 'object'},
            {type: 'number'}
        ]
    },
]
```
*Проще говоря: мы основываемся на типах внутри нужного нам компонента и их количестве каждого из типов, при желании присваиваем локальное наименование на ключевых потомков*

*(Примечание: правильный порядок потомков для дальнейшего взаимодействия через сценарии выстраивается автоматически после корректно составленного и выведенного паттерна в логи)*

## ![image](https://xeon.fun/logo/changelog.svg) Список изменений

**changelog version beta === 3.4:**

- Проведен неоднократный полный рефакторинг и багфикс проекта
- Проект полностью разбит на модули под дальнейшую сборку с заделом на масштабируемость и универсальность
- Реализован весьма колхозный но практичный мониторинг состояния битвы для автоматизации применения сценариев *(в будущем будет заменен на мониторинг объектов)*
- Реализовано полноценное меню для различных видов поиска
- Реализована функция поиска компонентов по именам
- Реализована функция поиска компонентов по индексам
- Реализована функция поиска компонентов по значениям
- Реализована функция поиска компонентов по частям имени
- Реализована функция поиска компонентов по структурным паттернам
- Реализована функциональность с паттернами
- Реализована функциональность сценариев для более удобного взаимодействия с компонентами, включая множество вложенностей внутри ссылаемого паттерна
- Реализовано кэширование для лучшего и более плавного взаимодействия со структурой
- Реализован поиск с кастомным выбором глубины для фильтрации лишних и схожих объектов
- Реализована возможность пускать в цикл значения для любого типа потомка

*(Примечание: да, мне было лень вести полноценную историю версий до недавних пор)*

## ![image](https://xeon.fun/reactInspector/attachments/miniLogo.svg) About project

**React Inspector** — is a universal project whose primary goal is to simplify the interaction with the component environment of any reactive application/game with the user

- An example of project realization is shown on the game “Tanki Online”, advanced users can adapt this project for any other by making small changes

*(Important note: the author of the project is not responsible for further malicious use/modifications)*

## ![image](https://xeon.fun/logo/team.svg) Participated in development

- Logistics, design and overall concept: [VK](https://vk.com/id468802366) | DS - <code>.hierophant.</code>
- Project testing, design, ideas: [VK](https://vk.com/id362783176) | DS - <code>opium5834</code>
- Project testing, ideas: [VK](https://vk.com/id855075302) | DS - <code>neontechfox</code>

## ![image](https://xeon.fun/logo/download.svg) Browser installation

1. Install/update the Tampermonkey extension: [click here](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Install/update the script with react inspector: [click here](https://xeon.fun/reactInspector/reactInspector.user.js)
3. Reload the application/game tab if it is open

## ![image](https://xeon.fun/logo/hotkeys.svg) Hotkeys

- <code>F9</code> - Show/hide menu with different search types
- <code>F1</code> - Console output of lighting component
- <code>F2</code> - Console output of a component with supplies
- <code>F3</code> - Console output of a component with a skybox
- <code>F7</code> - Activation of setting with lighting on the map
- <code>Numpad0</code> - Activation of changing supplies in battle
- <code>Numpad8</code> - Activation of skybox horizontal rotation, best with this skybox texture [click here](https://xeon.fun/battle/skybox/parkour/darkspace.png)
- <code>Numpad9</code> - Activation of light source cycling
- <code>Numpad*</code> - Manual deactivation of all active cycles *(usually cycles are automatically cleared after exiting the battle)*

## ![image](https://xeon.fun/logo/plan.svg) Planned/in development

- Add and work through more sets with lighting in the game
- Implement an additional section in the menu for better interaction with patterns and scenarios
- Implement component tracking *(real-time tracking of changes within an object)*
- Implementation of conditional constructs paired with tracking
- Translation of pattern and script arrays into json format and parsing into localstorege *(addition to menu section)*
- Optimize search algorithms and improve their efficiency even in the deepest structure
- Improve logging and their overall layout

## ![image](https://xeon.fun/logo/warning.svg) List of bugs that are already known about

- Bugs with styles in menu
- Bugs with logs
- Long search and filtering of components on weak devices

## ![image](https://xeon.fun/reactInspector/attachments/codeExample.svg) Examples of interaction

1. video demo of how loops work in scripts by example <code>skyboxComponent</code>: [click here](https://xeon.fun/reactInspector/attachments/exampleSkybox.mp4)
- What it looked like in the array of scenarios:

```javascript
export const actions = [
    {
        pattern: 'skyboxComponent',
        keyCode: 104,
        child: '2',
        children: [
            {child: 'number'},
            {child: 'number'},
            {child: 'number', loopValue: '0/100![0.0050](0)'}
        ]
    },
]
```
*loopValue - is a cyclic value, i.e. in this case the value from <code>0</code> to <code>100</code>, reversed <code>!</code>, with cyclic pitch <code>0.0050</code> and delay <code>0</code> milliseconds*

- What it looked like in the patterns array:
```javascript
export const patterns = [
    {
        componentName: 'skyboxComponent',
        keyCode: 114,
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
            {type: 'object'}
        ]
    }
]
```

2. Demonstration of the work of scripts without loops by example <code>lightComponent</code>:

*Before using the script:*
![](https://xeon.fun/reactInspector/attachments/exampleDefaultLight.jpg)

*After using the script:*
![](https://xeon.fun/reactInspector/attachments/exampleModifiedLight.jpg)
- What it looked like in the array of scenarios:

```javascript
export const actions = [
    {
        pattern: 'lightComponent',
        battle: true,
        keyCode: 118,
        child: '12',
        children: [
            {child: 'number'},
            {child: 'number'},
            {child: 'number', value: -0.3}
        ]
    },
    {
        pattern: 'lightComponent',
        battle: true,
        keyCode: 118,
        child: '13',
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
        keyCode: 118,
        child: '14',
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
        keyCode: 118,
        child: '11',
        value: [
            {child: 'boolean', value: true}
        ]
    }
]
```
*value - is a single change of values, i.e. in this case values with the syntax of <code>value: -0.3</code> for different offspring and their types*

*(Note: flag <code>battle: true</code> is set only if we want to automatically apply the given script as soon as we have loaded into the battle)*

- What it looked like in the patterns array:
```javascript
export const patterns = [
    {
        componentName: 'lightComponent',
        keyCode: 112,
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
            {type: 'object', name: 'light'},
            {type: 'object', name: 'light1'},
            {type: 'object'},
            {type: 'number'}
        ]
    },
]
```

3. Demonstrate easier interaction with descendants without deepening if they are at the same level in the parent:
- What it looked like in the array of scenarios:
```javascript
export const actions = [
    {
        pattern: 'lightComponent',
        keyCode: 118,
        child: '11',
        value: [
            {child: 'boolean', value: true}
        ]
    },
]
```
*In this case, we specify immediately <code>value</code> without explicitly stating <code>children</code> as was the case with the other examples, since <code>11</code> descendant is not the subject*

4. Demonstration of a more complex interaction with descendants:

- What it looked like in the array of scenarios:
```javascript
export const actions = [
    {
        pattern: 'suppliesComponent',
        keyCode: 97,
        child: '1',
        children: [
            {
                child: 'object',
                children: [
                    {child: 'string', value: "GAYCLEAR"},
                    {child: 'number'},
                        {
                            child: 'object',
                            children: [
                                {child: 'string', value: "GAYCLEAR"},
                                {child: 'number'}
                            ]
                        }
                    ]
                },
                {child: 'object'},
                {child: 'number'},
                {child: 'object'},
                {child: 'boolean'},
                {child: 'number', loopValue: '1611(0)'},
                {child: 'object'}
        ]
    },
]
```
*In this example, we can perfectly see that we have penetrated many nesting within the first descendant from the component <code>suppliesComponent</code> and changed the values inside the descendants from <code>NUCLEAR</code> to <code>GAYCLEAR</code>*

5. Demonstration of pattern making by example <code>lightComponent</code>:
*Suppose we came across an object after carefully analyzing the entire tree with its nestings, extracted a partial name path <code>o3h_1.n3d_1</code>:*
![](https://xeon.fun/reactInspector/attachments/exampleSearchPattern.jpg)
*After that we find the component we need:*
![](https://xeon.fun/reactInspector/attachments/exampleFoundPattern.jpg)
*After analyzing the structure of the derived component, we make a pattern based on it:*
![](https://xeon.fun/reactInspector/attachments/exampleCreatedPattern.jpg)
- What it looked like in the patterns array:
```javascript
export const patterns = [
    {
        componentName: 'lightComponent',
        keyCode: 112,
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
            {type: 'object', name: 'light'},
            {type: 'object', name: 'light1'},
            {type: 'object'},
            {type: 'number'}
        ]
    },
]
```
*Simply put: we base the types within the component we need and their number of each type, assign local naming on key descendants if desired*

*(Note: the correct order of descendants for further interaction through scripts is built automatically after a correctly composed and output pattern in logs)*

## ![image](https://xeon.fun/logo/changelog.svg) List of changes

**changelog version beta === 3.4:**

- Repeated full refactoring and bugfixing of the project was carried out
- The project is fully broken down into modules for future builds with a focus on scalability and versatility.
- Implemented a very kolkhozny but practical monitoring of the state of the battle to automate the application of scenarios *(in the future will be replaced by object monitoring)*
- Implemented a full menu for different types of searches
- Implemented search function for components by name
- Implemented search function for components by indexes
- Component search function by values has been implemented
- Component search function by name parts is implemented
- Function for searching components by structural patterns implemented
- Functionality with patterns implemented
- Implemented scripting functionality for easier interaction with components, including multiple nesting within a referenced pattern
- Implemented caching for better and smoother interaction with the structure
- Implemented search with custom depth selection to filter out redundant and similar objects
- Implemented the ability to loop values for any type of descendant

*(Note: yes, i was too lazy to keep a full-fledged version history until recently)*