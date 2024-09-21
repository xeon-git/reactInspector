export const cachedPaths = {paths: {},
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