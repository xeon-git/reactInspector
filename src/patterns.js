export const patterns = [
    {
        componentName: 'lightComponent',
        keyCode: 112, /* F1 */
        depth: 17,
        structure: [
            {type: 'object',
                name: 'light',
                children: [
                    {child: 'number'},
                    {child: 'number'},
                    {child: 'number'},
                    {child: 'number'}
                ]},
            {type: 'object',
                name: 'shadows',
                children: [
                    {child: 'object'},
                    {child: 'number'},
                    {child: 'object'},
                    {child: 'object'}
                ]},
            {type: 'object',
                children: [
                    {child: 'object'},
                    {child: 'object'},
                    {child: 'object'},
                    {child: 'object'}
                ]},
            {type: 'object',
                children: [
                    {child: 'object'},
                    {child: 'object'},
                    {child: 'object'},
                    {child: 'int32Array'}
                ]},
            {type: 'object',
                children: [
                    {child: 'float32Array'}
                ]}
        ]
    },
];