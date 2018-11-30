__component__ = async () => { 
        const module = await import( 
            /* webpackChunkName: "chunk-__componentName__" */ `@/pages/__pageDir__-pages/__componentName__`
        ); 
        return module.default; 
    };
    // __component__