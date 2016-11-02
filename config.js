exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://user:password@ds011419.mlab.com:11419/pokemongo' :
                            'mongodb://localhost/node-capstone-dev');
exports.PORT = process.env.PORT || 8080;
