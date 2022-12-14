"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var core = __importStar(require("@actions/core"));
var exec = __importStar(require("@actions/exec"));
var fs_1 = require("fs");
// ????????????
// process.env['INPUT_RELEASE'] = 'TEST'
// process.env['INPUT_GITHUB_TOKEN'] = 'TEST'
// process.env['INPUT_PACKAGE_ROOT'] = '/Users/yinxulai/Desktop/talpa'
// ?????????????????????
function action() {
    return __awaiter(this, void 0, void 0, function () {
        var release, pkgRoot, githubToken, yarnLockPath, pkgJsonPath, npmLockPath, execOptions, pkgJson, useNpm, useYarn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    release = !!core.getInput('release', { required: false });
                    pkgRoot = core.getInput('package_root', { required: true });
                    githubToken = core.getInput('github_token', { required: release });
                    yarnLockPath = path_1.join(pkgRoot, 'yarn.lock');
                    pkgJsonPath = path_1.join(pkgRoot, "package.json");
                    npmLockPath = path_1.join(pkgRoot, 'package-lock.json');
                    execOptions = { cwd: pkgRoot, env: { 'GITHUB_TOKEN': githubToken } };
                    pkgJson = JSON.parse(fs_1.readFileSync(pkgJsonPath, "utf8"));
                    if (!pkgJson.scripts) {
                        core.info("Package.json no scripts configured");
                    }
                    useNpm = fs_1.existsSync(npmLockPath);
                    if (!useNpm) return [3 /*break*/, 4];
                    core.info("Will run NPM commands in directory '" + pkgRoot + "'");
                    return [4 /*yield*/, exec.exec('npm', ['install'], execOptions)];
                case 1:
                    _a.sent();
                    if (!release) return [3 /*break*/, 3];
                    return [4 /*yield*/, exec.exec('npm', ['run', 'publish'], execOptions)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, core.info('done!')];
                case 4:
                    useYarn = fs_1.existsSync(yarnLockPath);
                    if (!useYarn) return [3 /*break*/, 8];
                    core.info("Will run Yarn commands in directory '" + pkgRoot + "'");
                    return [4 /*yield*/, exec.exec('yarn', ['install'], execOptions)];
                case 5:
                    _a.sent();
                    if (!release) return [3 /*break*/, 7];
                    return [4 /*yield*/, exec.exec('yarn', ['run', 'publish'], execOptions)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, core.info('done!')];
                case 8: return [2 /*return*/];
            }
        });
    });
}
action();
