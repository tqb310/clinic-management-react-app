const context = require.context(
    './xa_phuong',
    true,
    /.json$/,
);

const all = {};
context.keys().forEach(key => {
    const fileName = key.replace('./', '');
    const resource = require(`_location-data/xa_phuong/${fileName}`);
    const namespace = fileName.replace('.json', '');
    all[namespace] = JSON.parse(JSON.stringify(resource));
});
//console.log(all)

export default all;
