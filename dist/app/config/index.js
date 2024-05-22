"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Correct path to the .env file
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
// Print all environment variables to debug
// console.log(process.env);
// Log the specific environment variable to check if it's defined
console.log('DATABASE_URL:', process.env.DATABASE_URL);
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
