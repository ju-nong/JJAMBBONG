const express = require("express");
const cors = require("cors");

const app = express();
const port = 4040;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`${port} listen!`);
});

const isNull = (node) => node == null || node == undefined;

const form = ({ status = 1, response = null, message = "" }) => ({
    status: status,
    response: response,
    message: message,
});

const users = {};
const products = {};
const cart = {};
const buy = {};

const msg = {
    notMatch: "아이디 또는 비밀번호가 일치하지 않습니다.",
    alreadyID: "이미 사용중인 아이디입니다.",
};

app.post("/login", (req, res, next) => {
    const { id, password } = req.body;

    const user = users[id];
    if (user?._password == password) {
        const inCart = user._type == "buyer" ? { cart: cart[user._id] } : null;

        res.send(
            form({
                response: {
                    type: user._type,
                    id: user._id,
                    password: user._password,
                    name: user._name,
                    ...inCart,
                },
            }),
        );
    } else {
        next(new Error(msg.notMatch));
    }
});

app.post("/join", (req, res, next) => {
    const { type, id, password, name } = req.body;
    console.log(type, id, password, name);

    const user = users[id];

    if (isNull(user)) {
        users[id] = {
            _type: type,
            _id: id,
            _password: password,
            _name: name,
            _type: type,
        };

        if (type == "buyer") {
            cart[id] = [];
            buy[id] = [];
        } else {
            products[id] = {};
        }
        res.send(form({}));
    } else {
        next(new Error(msg.alreadyID));
    }
});

app.get("/getStores", (req, res, next) => {
    const sellers = [];

    for (const seller in users) {
        if (users[seller]._type === "seller") {
            sellers.push(seller);
        }
    }

    res.send(form({ response: sellers }));
});

app.post("productAdd", (req, res, next) => {
    const { name, price, count, content } = req.body;
});

app.use((err, req, res, next) => {
    console.log(`server error: ${err}`);
    res.send(form({ status: 0, message: err.message }));
});
