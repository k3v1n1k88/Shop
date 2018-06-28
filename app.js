var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wnumb = require('wnumb');
var exphbs = require('express-handlebars');
var hbs = require('hbs');
var session = require('express-session');
var restrict = require('./middle-wares/restrict');

// var index = require('./routes/index');
var homeController = require('./controllers/homeController'),
    productController = require('./controllers/productController'),
    productsController = require('./controllers/productsController'),
    cartController = require('./controllers/cartController'),
    userController = require('./controllers/userController'),
    adminController = require('./controllers/adminController'),
    orderController = require('./controllers/orderController'),
    loginController = require('./controllers/loginController'),
    registerController = require('./controllers/registerController');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
// app.engine('hbs', exphbs({
//     defaultLayout: 'layout',
//     layoutsDir: '/',
//     helpers: {
//         number_format: n => {
//             var nf = wnumb({
//                 thousand: ','
//             });
//             return nf.to(n);
//         }
//     }
// }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + 'public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/', homeController);
app.use('/home', homeController);
app.use('/product', productController);
app.use('/products', productsController);
app.use('/login', loginController);
app.use('/register', registerController);
app.use('/cart', restrict, cartController);
app.use('/user', restrict, userController);
app.use('/admin', restrict, adminController);
app.use('/order', restrict, orderController);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

module.exports = app;
