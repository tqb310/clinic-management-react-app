//Make all routes for reception module
let routes = [];

const context = require.context(".", true, /route.js$/);

context.keys().forEach(path => {
    routes.push(require(`${path}`).default);
});

// console.log(context.resolve);
export default routes;