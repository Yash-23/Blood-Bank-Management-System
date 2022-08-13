module.exports = (app) => {
    require('fs')
        .readdirSync(__dirname)
        .forEach((file) => {
            if (file === 'index.js') return;
            let routeModule = require(require('path').join(__dirname, file));
            let path = '/' + (file === 'root.js' ? '' : `api/${file.replace('.js', '')}`);
            app.use(path, routeModule);
        });
};
