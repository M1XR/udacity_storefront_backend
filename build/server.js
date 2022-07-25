"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var handlingBadRequest_1 = __importDefault(require("./middleware/handlingBadRequest"));
var cors_1 = __importDefault(require("cors"));
var users_handler_1 = __importDefault(require("./handlers/users.handler"));
var product_handler_1 = __importDefault(require("./handlers/product.handler"));
var order_handler_1 = __importDefault(require("./handlers/order.handler"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
(0, users_handler_1["default"])(app);
(0, product_handler_1["default"])(app);
(0, order_handler_1["default"])(app);
app.use(handlingBadRequest_1["default"]);
app.listen(3000, function () {
    console.log("starting CORS-enabled web server app on: ".concat(address));
});
