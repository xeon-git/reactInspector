export const actions = [
    /* освещение */
    {   /* лучше всего под темные карты, могут быть артефакты на зимних и ремастерах */
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
        child: '13', /* light */
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
        child: '14', /* light1 */
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
    {   /* цикл скайбокса по горизонтали */
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