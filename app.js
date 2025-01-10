require('dotenv').config();
const path = require('path');
const express = require('express');
const hbsExpress = require('express-handlebars');
// morgan 
var morgan = require('morgan');
// session
const session = require('express-session');
const MySqlSession=require('express-mysql-session')(session);
const varSession=require('./middleware/variables.js');

// routes
const routHome = require('./routes/rout_home.js');
const routLogin = require('./routes/rout_login.js');
const routAdminZona=require('./routes/rout_admin_zona.js');
const routUserZona=require('./routes/rout_user_zona.js');
const routProductos=require('./routes/rout_productos.js');
const routCompra=require('./routes/rout_compra.js');
const routCesta=require('./routes/rout_cesta.js');
const routTestAxios=require('./routes/rout_test_axios.js');
const rout404=require('./routes/rout_404.js');
// const { extname } = require('path');


const PORT = process.env.PORT || 3000;
const app = express();

const sessionDb= new MySqlSession({
    host:process.env.HOST,
    port:3306,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
});

// creamos hbs
const hbs = hbsExpress.create(
    {
        layoutDir: 'views/layouts',
        defaultLayout: 'main',
        extname: 'hbs'
    }
);
// registramos el engime hbs
app.engine('hbs', hbs.engine);
// aplicamos hbs engine
app.set('view engine', 'hbs');

// las carpetas estaticos:
app.set('views', path.join(__dirname, 'views'));
app.use('/dist', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// para elaborar los requisitos post
app.use(express.urlencoded(
    {
        expended: true
    }
));

// session
app.use(
    session(
        {
            secret:'un string para incriptar',
            resave:false,
            saveUninitialized:false,
            // session mysql
            store:sessionDb,
        }
    )
);

app.use(varSession);


// morgan 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// routes (con prefix)
app.use('/', routHome);
app.use('/login', routLogin);
app.use('/user_zona', routUserZona);
app.use('/admin_zona',routAdminZona);
app.use('/productos', routProductos);
app.use('/compra',routCompra);
app.use('/cesta', routCesta);
app.use('/test_axios', routTestAxios);
app.use('*', rout404);




app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})