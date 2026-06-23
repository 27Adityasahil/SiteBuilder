"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled Project'
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    defaultPageId: {
        type: String,
        default: 'home'
    },
    pages: {
        type: Array,
        default: [
            {
                id: 'home',
                name: 'Home',
                path: '/',
                tree: {
                    id: 'root',
                    type: 'Page',
                    name: 'Page',
                    props: {
                        style: {
                            minHeight: '100vh',
                            backgroundColor: '#ffffff'
                        }
                    },
                    children: []
                }
            }
        ]
    },
    thumbnail: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
});
const Project = mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
//# sourceMappingURL=Project.js.map