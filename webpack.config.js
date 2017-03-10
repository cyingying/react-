module.exports = {
    entry:'./src/js/index.js',
    output:{
        path:'./react-test/',
        publicPath:'./react-test/',
        filename:'index.js'
    },
    module:{ 
     loaders:[
       {test:/.js$/,loader:'babel-loader',query:{presets: ['react','es2015'] },exclude:/node_modules/},
       {test:/.less$/,loader:'style-loader!css-loader!less-loader'},
       {test:/.(jpg|png|gif)$/,loader:'url-loader?limit=8129'}
     ]
    }
}