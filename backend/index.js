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

const msg = {
    notMatch: "아이디 또는 비밀번호가 일치하지 않습니다.",
    alreadyID: "이미 사용중인 아이디입니다.",
};

app.post("/login", (req, res, next) => {
    const { id, password } = req.body;

    const user = users[id];
    if (user?._password == password) {
        res.send(form({ response: { name: user._name, type: user._type } }));
    } else {
        next(new Error(msg.notMatch));
    }
});

app.post("/join", (req, res, next) => {
    const { id, password, name, type } = req.body;

    const user = users[id];

    if (isNull(user)) {
        users[id] = {
            _id: id,
            _password: password,
            _name: name,
            _type: type,
        };

        if (!type) {
            products.push({ id: [] });
        }

        res.send(form({}));
    } else {
        next(new Error(msg.alreadyID));
    }
    console.log(users);
});

app.use((err, req, res, next) => {
    res.send({ status: 0, message: err.message });
});
