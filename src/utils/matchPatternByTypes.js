export const matchPatternByTypes = (obj, structure) => {
    const float32Array = structure.some(item => item.type === 'float32Array');
    const typeSequence = Object.values(obj).map(value => {
        if (value === null) {
            return 'null';}
                if (float32Array && value instanceof Float32Array) {
                    return 'float32Array';}
                        return typeof value;});
                            if (typeSequence.length !== structure.length) {
                                return false;}

    const patternTypeCount = {}; structure.forEach(item => {patternTypeCount[item.type] = (patternTypeCount[item.type] || 0) + 1;});

    const objTypeCount = {}; typeSequence.forEach(type => {objTypeCount[type] = (objTypeCount[type] || 0) + 1;});
        for (let type in patternTypeCount) {
            if (patternTypeCount[type] !== objTypeCount[type]) {
                return false;}}
                    return true;};