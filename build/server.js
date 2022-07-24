"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
var port = 3000;
var corsOptions = {
    origin: '',
    optionSuccessStatus: 200
};
app.use((0, cors_1["default"])(corsOptions));
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/test-cors', (0, cors_1["default"])(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS enabled with a Middleware' });
});
app.listen(port, function () {
    console.log("starting app on: ".concat(address));
});
