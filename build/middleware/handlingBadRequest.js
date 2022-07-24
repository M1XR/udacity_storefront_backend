"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
// handling Bad Requests
var handlingBadRequest = function (req, res) {
    try {
        res.sendFile(path_1["default"].join(__dirname, '../../views/badRequest.html'));
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
};
exports["default"] = handlingBadRequest;
