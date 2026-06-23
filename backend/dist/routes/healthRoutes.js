"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const dbState = mongoose_1.default.connection.readyState;
    let dbStatus = 'disconnected';
    if (dbState === 1)
        dbStatus = 'connected';
    if (dbState === 2)
        dbStatus = 'connecting';
    res.json({
        status: dbStatus === 'connected' ? 'online' : 'degraded',
        service: 'SiteBuilder Engine API',
        database: dbStatus,
        builderEngine: 'ready',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())}s`
    });
});
exports.default = router;
//# sourceMappingURL=healthRoutes.js.map