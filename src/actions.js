export const actions = [
    /* освещение */
    {
        pattern: 'lightComponent',
        keyCode: 118, /* F7 */
        battle: true,
        child: '1',
        children: [
            {child: 'number', value: 0.87},
            {child: 'number', value: 0.87},
            {child: 'number', value: 1},
            {child: 'number'}
        ]
    },
    {
        pattern: 'lightComponent',
        keyCode: 118, /* F7 */
        battle: true,
        child: '2',
        children: [
            {child: 'object',
                children: [
                    {child: 'number', value: 0.87},
                    {child: 'number', value: 0.87},
                    {child: 'number', value: 1},
                    {child: 'number'}
            ]},
            {child: 'number'},
            {child: 'object'},
            {child: 'object',
                children: [
                    {child: 'number'},
                    {child: 'number'},
                    {child: 'number', value: -0.3}
            ]}
        ]
    },
    {   /* цикл источника */
        pattern: 'lightComponent',
        keyCode: 119, /* F8 */
        child: '2',
        children: [
            {child: 'object'},
            {child: 'number'},
            {child: 'object'},
            {child: 'object',
                children: [
                    {child: 'number'},
                    {child: 'number'},
                    {child: 'number', loopValue: '-0.5/0![0.001](15)'}
            ]}
        ]
    }
];