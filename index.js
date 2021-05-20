// process.env.PORT - szerver által megadott port, localban a sajátunkat használjuk
const port = process.env.PORT || 3002;

const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs'); // pw titkosítás
const jwt = require('jsonwebtoken'); // hosszú random stringet generál felhasználó azonosításhoz, ezt a tokent küldjük a frontendnek, ameddig ez érvényes addig a felhasználó hozzáférhet a levédett útvonalakhoz
const { Pool } = require('pg');
require('dotenv').config();

const devSettings = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}
const prodSettings = {
    connectionString: 'process.env.DATABASE_URL'
}

const pool = new Pool(process.env.NODE_ENV === "production" ? prodSettings : devSettings);

// amiben next van az a middleware:
function isPwLongEnough(req, res, next) {
    let pw = req.body.pw;

    // console.log('Log from middleware', pw);

    if (pw.length >= 6) {
        // next tovább engedi lefutni a funkciót ahova beraktuk
        next();
    } else {
        res.status(403).json({msg: 'The length of password should be at least 6 characters.'});
    }

}

function isEmail (req, res, next) {
    let email = req.body.email;
    let at = '@';
    let dot = '.';

    if (email.includes(at) && email.includes(dot)) {
        next();
    } else {
        res.status(403).json({msg: 'Your email format is not valid'})
    }
}

// authentication (token):
function authMw (req, res, next) {
    // objektumnak a kulcsaira így is lehet hivatkozni: ["objectkey"] - ez kifejezetten fontos JSON objektumoknál
    let token = req.headers['x-auth-token'];
    // let token = req.headers.x-auth-token;     <--- így nem működne
    console.log('authMw', token);

    if (token) {
        // jwt könyvtárral beazonosítjuk és next()
        jwt.verify(token, 'nomoresecret', (err, decodedToken) => {
            // válasz: err -> null, decodedToken -> { id: 6, iat: 4234234234 }
            console.log(err, decodedToken);
            if (decodedToken) {
                // lentebb req objektumunkat kibővítjük egy hozzáadott userId résszel:
                // azért adom hozzá a userId-t, mert headerrel operálunk, mert az minden kérés típusnál megtalálható, nincs body rész a get funkcióban és nincs id része
                // GET - params, header
                // POST, DELETE, PUT - body, params, header
                req.userId = decodedToken.id;
                next();
            } else {
                res.status(401).json({msg: 'Token is not valid'})
            }
        })
    } else {
        // error üzi - res
        res.status(401).json({msg: 'No token found'})
    }
}


// Middleware globálisan, minden útvonalra kiterjesztve ha
// app.use(authMW());

// Middleware - amennyiben a környezet "éles", akkor statikus file-okat használjuk, ha nem
// akkor a src mappából, esetünkben a frontend mappában vannak a statikus file-ok:
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("./frontend/build"));  
} 
app.use(cors());
app.use(express.json());

// Itt az authMw csak egy útvonalra érvényes:
app.get('/todos', authMw, (request, response) => {
    console.log(request);
    let userId = request.userId;
    pool.query('SELECT * FROM todos WHERE userId=$1', [userId])
    // .then((res) => response.json(res.row))
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch all todos'}));
});

app.get('/todos/:id', (request, response) => {
    let id = request.params.id;

    pool.query('SELECT * FROM todos WHERE id=$1', [id])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch todos2 by id'}));
});

app.post('/todos', authMw, (request, response) => {
    let title = request.body.title;
    // let importance = request.body.importance;
    let userId = request.userId;
    // console.log(title);

    // RETURNING-gel nem kell újra get request-tel befetchelni az összes adatot
    pool.query('INSERT INTO todos(title, userId) VALUES ($1, $2) RETURNING *', [title, userId])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to add a new todo'}));
});

app.delete('/todos/:id', authMw, (request, response) => {
    let id = request.params.id;

    pool.query('DELETE FROM todos WHERE id=$1', [id])
    .then((res) => response.status(200).json({msg: 'Todo is successfully deleted'}))
    .catch((err) => response.status(400).json({msg: 'Failed to delete the todo'}));
});

app.put('/todos/:id', authMw, (request, response) => {
    let id = request.params.id;
    let title = request.body.title;
    let completed = request.body.completed;
    let importance = request.body.importance;

    pool.query('UPDATE todos SET title=$1, completed=$2, importance=$3 WHERE id=$4', [title, completed, importance, id])
    // .then((res) => console.log(res))
    .then((res) => response.status(200).json({msg: 'Todo is successfully updated'}))
    .catch((err) => response.status(400).json({msg: 'Failed to update the todo'}));

});

// User registration and authentication:
// password must be hashed (titkosítattva) before saving to the DB
// install bcrypt: npm install bcryptjs

app.post('/signup', [isPwLongEnough, isEmail], (request, response) => {
    let email = request.body.email;
    let username = request.body.username;
    let pw = request.body.pw;
    // Ezzel titkosítjuk a jelszót:
    let encryptedPw = bcrypt.hashSync(pw, 10);
    // console.log(email,username,pw);
    pool.query('INSERT INTO users (email, username, pw) VALUES ($1, $2, $3) RETURNING *', [email, username, encryptedPw])
    .then((res) => {response.status(200).json({msg: 'User successfully created'})})
    // .catch((err) => response.json({msg: 'Failed to create new user'}));
    .catch((err) => {
        // sql code: '23505' - unique_violation
        if (err.code = '23505') {
            response.status(403).json({msg: 'User already exists'});
        } else {
            response.status(401).json({msg: 'Fail to create user'});
        }
        // console.log(err)
    });
    
});

// 1. Kati beírja az emailt és a jelszót
// 2. A beírt email és jelszó megy a backendre
// 3. Az email alapján kikeressük az adatbázisból a felhasználó objektumot
// 4. A szerver összehasonlítja a talált objektum titkosított jelszavát a felhasználó által megadott jelszóval (bcyrpt compare)
// 5. Amennyiben stimmel (true), akkor generálunk egy tokent (jwt.sign) és válaszként elküldjük a frontendre
// 6. Amennyiben nem azonos a két jelszó (false) válaszként ezt elküldjük
// Ezután jön majd az útvonalak levédése az egyedi tokennel

// install jws: npm install jsonwebtoken
app.post('/login', [isPwLongEnough, isEmail], (request, response) => {
    
    let email = request.body.email;
    let pw = request.body.pw;

    // console.log(email, pw);
    // $1 - mint változó, az a fenti email, vagy pw lehet, SQL változót hasonlítunk össze egy JS változóval
    // email alapján (ami egyedi) kikeressük az adatbázisban a teljes felhasználó objektumot
    pool.query('SELECT * FROM users WHERE email=$1', [email])
    // .then((res) => console.log(res.rows))
    // ez pedig összehasonlítja hashelt jelszót a felhasználó által megadott jelszóval:
    .then((res) => {
        // console.log(res.rows[0].pw)
        let encryptedPw = res.rows[0].pw;
        res.rows && bcrypt.compare(pw, encryptedPw).then((isMatch) => {
        // res === true (boolean)
            // console.log(res);
            if (isMatch === true) {
                // amennyiben a jelszó megegyezik, generálunk egy tokent, el is küldjük válasz formájában
                // jwt.sign(payload, secretOrPrivateKey, [options, callback])
                jwt.sign({ id: res.rows[0].id }, 'nomoresecret', (err, token) => {
                    // console.log(token);
                    let currentUser = {};
                    currentUser.token = token;
                    currentUser.id = res.rows[0].id;
                    currentUser.name = res.rows[0].username;
                    response.status(200).json(currentUser);
                });
            } else {
                // amennyiben nem egyezik, visszatérítünk egy hibaüzenetet
                response.status(403).json({msg: "Passwords don't match"});
            }
        });
    })
    .catch((err) => response.status(400).json({msg: "User not found"}));

});

app.get('*', (request, response) => {
    response.sendFile("./frontend/build/index.html");
});
//szerver, port változó:
app.listen(port, () => console.log("server is running on 3002"));