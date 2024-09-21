export const patterns = [
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
            {type: 'object', name: 'light'},
            {type: 'object', name: 'light1'},
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
            {type: 'object'}
        ]
    }
];