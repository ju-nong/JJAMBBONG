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

const rand = () => `code${Math.random().toString(36).substr(2, 11)}`;

const form = ({ status = 1, response = null, message = "" }) => ({
    status: status,
    response: response,
    message: message,
});

const users = {
    user1: {
        _type: "buyer",
        _id: "user1",
        _password: "pw1",
        _name: "구매자1",
    },
    user2: {
        _type: "seller",
        _id: "user2",
        _password: "pw2",
        _name: "판매자2",
    },
};
const products = {
    codef8iwjfjxjvw: {
        seller: "user2",
        code: "codef8iwjfjxjvw",
        name: "사과",
        price: 10000,
        count: 100,
        content: "맛있는 사과에요",
    },
    codehhijqbt4gq8: {
        seller: "user2",
        code: "codehhijqbt4gq8",
        name: "비락식혜",
        price: 3000,
        count: 1000,
        content: "맛있는 비락식혜에요",
    },
};

const sell = {
    user2: ["codef8iwjfjxjvw", "codehhijqbt4gq8"],
};

const cart = { user1: [] };
const buy = {};

const msg = {
    notMatch: "아이디 또는 비밀번호가 일치하지 않습니다.",
    alreadyID: "이미 사용중인 아이디입니다.",
    wrongPath: "잘못된 경로입니다.",
    emptyProduct: "상품이 존재하지 않습니다.",
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

    const user = users[id];

    if (isNull(user)) {
        users[id] = {
            _type: type,
            _id: id,
            _password: password,
            _name: name,
        };

        if (type == "buyer") {
            cart[id] = [];
            buy[id] = [];
        } else {
            products[id] = [];
            sell[id] = [];
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

app.get("/getProducts", (req, res, next) => {
    const sellList = sell[req.query.id];

    if (isNull(sellList)) {
        next(new Error(msg.wrongPath));
    } else {
        const productList = [];

        for (const s in sellList) {
            productList.push(products[sellList[s]]);
        }

        res.send(form({ response: productList }));
    }
});

app.get("/product/:code", (req, res, next) => {
    const product = products[req.params.code];

    if (isNull(product)) {
        next(new Error(msg.wrongPath));
    } else {
        res.send(form({ response: product }));
    }
});

app.post("/product/add", (req, res, next) => {
    const { name, price, count, content } = req.body;

    const code = rand();
    const seller = req.headers.id;

    products[code] = {
        seller: seller,
        code: code,
        name: name,
        price: price,
        count: count,
        content: content,
    };

    sell[seller].push(code);

    res.send(form({ message: "상품이 추가 되었습니다." }));
});

app.post("/product/edit", (req, res, next) => {
    const { code, name, price, count, content } = req.body;

    products[code].name = name;
    products[code].price = price;
    products[code].count = count;
    products[code].content = content;

    res.send(form({ response: code, message: "상품이 수정 되었습니다." }));
});

app.post("/product/remove", (req, res, next) => {
    const { seller, code } = req.body;

    const sellList = sell[seller];

    if (sellList.includes(code)) {
        sellList.splice(sellList.indexOf(code), 1);

        delete products[code];

        res.send(form({ message: "삭제 되었습니다." }));
    } else {
        next(new Error(msg.emptyProduct));
    }
});

app.post("/cart", (req, res, next) => {
    const { code, count } = req.body;

    cart[req.headers.id].push({ code: code, count: count });
    const c = (products[code].count -= count);

    res.send(form({ response: c }));
});

app.use((err, req, res, next) => {
    console.log(`server error: ${err}`);
    res.send(form({ status: 0, message: err.message }));
});
