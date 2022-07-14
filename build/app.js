"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const greeting_banner_1 = require("./services/greeting-banner");
const livereload_1 = __importDefault(require("livereload"));
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const liveReloadServer = livereload_1.default.createServer();
liveReloadServer.server.once("connections", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
const PORT = Number(process.env.PORT) || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny")); // RESTful API logging tool
app.use(express_1.default.static("public"));
console.log(process.version);
app.use((0, connect_livereload_1.default)());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json" // CRITICAL! `/` is a must
    }
}));
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log((0, greeting_banner_1.greetingBanner)('127.0.0.1', PORT));
});
