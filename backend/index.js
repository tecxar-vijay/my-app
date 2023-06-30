const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productRouters = require("./routes/Products.js");
const categoryRouter = require("./routes/Categories.js");
const brandRouter = require("./routes/Brands.js");
const userRouter = require("./routes/Users.js");
const authRouter = require("./routes/Auth.js");
const cartRouter = require("./routes/Cart.js");
const orderRouter = require("./routes/Order.js");
/// authentication
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

const cors = require("cors");
const { User } = require("./model/User");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

server.use(cors({ corsOptions, exposedHeaders: ["X-Total-Count"] })); // in pagination we had

const SECRET_KEY = "SECRET_KEY";

// jwt options
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

server.use(express.static("build"))
server.use(cookieParser())

// NOTE :: This code should be defined before all the routes
server.use(
    session({
        secret: "keyboard cat",
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
    })
);
server.use(passport.authenticate("session"));

//=====> passport strategy:Local
passport.use(
    "local",
    new LocalStrategy(
        {usernameField : "email"},
        async function (email, password, done) {
        // by default it takes username but in our case we have email to be veryfied
        // we have copied this code from the login controller and modified it
        try {
            const user = await User.findOne({ email: email }).exec();
            if (!user) {
                done(null, false, { message: "Invalid credential" });
            }
            console.log({ user });
            crypto.pbkdf2(
                password,
                user.salt,
                310000,
                32,
                "sha256",
                async function (err, hashedPassword) {
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        // it will check the stored password and the hashed password
                        return done(null, false, { message: "Invalid credential" });
                    } else {
                        const token = jwt.sign(sanitizeUser(user), SECRET_KEY);

                        return done(null, {token}); // this line sends to serializer
                    }
                }
            );
        } catch (error) {
            done(error);
        }
    })
);

// passport strategy ======> jwt
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findOne({ id: jwt_payload.sub });
            if (user) {
                return done(null,sanitizeUser(user));  // this calls serializer
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

// it creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
    console.log("serializeUser....", user);
    process.nextTick(function () {
        return cb(null, { id: user.id, role: user.role });
    });
});

// it changes session variable req.user on being called from authorized request
passport.deserializeUser(function (user, cb) {
    console.log("deserializeUser....", user);
    process.nextTick(function () {
        return cb(null, user);
    });
});

server.use(express.json());
server.use("/products", isAuth(), productRouters.router); // here we have put the isAuth route middleware so it will check the req.user and only then it will let go for the next step. so [we will not be able to fetch products before login]
server.use("/products", isAuth(), productRouters.router);
server.use("/categories",isAuth(), categoryRouter.router);
server.use("/brands",isAuth(), brandRouter.router);
server.use("/users",isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart",isAuth(), cartRouter.router);
server.use("/orders",isAuth(), orderRouter.router);

server.use(
    cors({
        exposedHeaders: ["X-Total-Count"],
    })
);

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("mongo connected");
}

server.get("/", (req, res) => {
    res.json({ status: "success" });
});

server.post("/products", createProduct);

server.listen(8000, () => {
    console.log("server started");
});

// C:\Program Files\MongoDB\Server\6.0\data\
