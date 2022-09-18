'use strict';

const omits = require('omit.js');
const ci = require('miniprogram-ci');
const kolorist = require('kolorist');
const loadJsonFile = require('load-json-file');
const minimist = require('minimist');
const node_child_process = require('node:child_process');
const parseGitConfig = require('parse-git-config');
const path = require('node:path');
const fs = require('node:fs');
const dotenv = require('dotenv');
const node_url = require('node:url');
const node_process = require('node:process');
const enquirer = require('enquirer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const omits__default = /*#__PURE__*/_interopDefaultLegacy(omits);
const ci__default = /*#__PURE__*/_interopDefaultLegacy(ci);
const minimist__default = /*#__PURE__*/_interopDefaultLegacy(minimist);
const parseGitConfig__default = /*#__PURE__*/_interopDefaultLegacy(parseGitConfig);
const path__default = /*#__PURE__*/_interopDefaultLegacy(path);
const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
const dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
const enquirer__default = /*#__PURE__*/_interopDefaultLegacy(enquirer);

const isObject = (val) => typeof val === "object" && val !== null;

const omit = omits__default.default;
const getLastOptions = (val) => isObject(val) ? val : {};
const step = (msg) => console.log(kolorist.bold(kolorist.green(`[step] ${msg}`)));
async function main(options = {}) {
  const {
    name,
    projectPath,
    appid,
    privateKeyPath,
    version,
    upload,
    isDryRun,
    preview,
    robot,
    desc,
    projectOptions,
    uploadOptions,
    previewOptions
  } = options;
  step(`\u5F53\u524D\u5C0F\u7A0B\u5E8F\u540D\u79F0\u4E3A\uFF1A${name}`);
  step("\u8F93\u51FA\u4E0A\u4F20\u76F8\u5173\u53C2\u6570");
  console.log("\u4F20\u9012\u7684\u53C2\u6570", options);
  const lastProjectOptions = {
    projectPath,
    type: "miniProgram",
    appid,
    privateKeyPath,
    ignores: [
      `${projectPath}/node_modules/**/*`,
      `${projectPath}/CHANGELOG.md`,
      `${projectPath}/README.md`,
      `${projectPath}/yarn.lock`,
      `${projectPath}/package-lock.json`
    ],
    ...getLastOptions(projectOptions)
  };
  console.log(
    "ci.Project \u9879\u76EE\u7684\u53C2\u6570",
    omit(lastProjectOptions, ["project", "privateKeyPath"])
  );
  const project = new ci__default.Project(lastProjectOptions);
  const setting = loadJsonFile.loadJsonFileSync(`${projectPath}/project.config.json`);
  const commonConfig = {
    version,
    robot,
    setting
  };
  if (upload) {
    step("\u5F00\u59CB\u4E0A\u4F20\u5C0F\u7A0B\u5E8F...");
    const lastUploadOptions = {
      project,
      ...commonConfig,
      desc,
      ...getLastOptions(uploadOptions)
    };
    console.log(
      "ci.upload \u4E0A\u4F20\u7684\u914D\u7F6E",
      omit(lastUploadOptions, ["project"])
    );
    if (isDryRun) {
      return;
    }
    const uploadResult = await ci__default.upload(lastUploadOptions);
    console.log("uploadResult", uploadResult);
  }
  if (preview) {
    step("\u5F00\u59CB\u751F\u6210\u9884\u89C8\u4E8C\u7EF4\u7801...");
    const lastPreviewOptions = {
      project,
      ...commonConfig,
      ...getLastOptions(previewOptions)
    };
    console.log(
      "ci.preview \u9884\u89C8\u7684\u914D\u7F6E",
      omit(lastPreviewOptions, ["project"])
    );
    if (isDryRun) {
      return;
    }
    const previewResult = await ci__default.preview(lastPreviewOptions);
    console.log("previewResult", previewResult);
  }
}

const getParams = () => {
  const params = process.argv.slice(2);
  const paramsDefault = {
    default: {
      robot: 1,
      preview: false,
      upload: false,
      dry: false,
      useSelect: false,
      useMultiSelect: false,
      help: false,
      version: false
    },
    alias: {
      u: "upload",
      r: "robot",
      v: "version",
      d: "dry",
      s: "useSelect",
      m: "useMultiSelect",
      p: "preview",
      h: "help"
    }
  };
  return minimist__default(params, paramsDefault);
};

const getDesc = (projectPath, version) => {
  let gitCommitHash = "git commit hash \u4E3A\u7A7A";
  try {
    gitCommitHash = node_child_process.execSync("git rev-parse --short HEAD", {
      cwd: projectPath
    }).toString().trim();
  } catch (e) {
    console.warn("\u83B7\u53D6 git commit hash \u5931\u8D25");
    console.warn(e);
  }
  let userName = "\u9ED8\u8BA4";
  try {
    const {
      user: { name = "\u9ED8\u8BA4" }
    } = parseGitConfig__default.sync({
      cwd: projectPath,
      path: ".git/config"
    });
    userName = name;
  } catch (e) {
    console.warn("\u83B7\u53D6 .git/config user.name \u5931\u8D25");
    console.warn(e);
  }
  const desc = `v${version} - ${gitCommitHash} - by@${userName}`;
  return desc;
};

const DEFAULT_CONFIG_FILES = [
  "wx.config.js",
  "wx.config.mjs",
  "wx.config.ts"
];

const cwdPath = node_process.cwd();
const formatConfig = (options) => {
  let {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    projectOptions,
    uploadOptions,
    previewOptions
  } = options;
  if (!name) {
    name = "\u672A\u8BBE\u7F6E\u540D\u79F0";
  }
  if (!appid) {
    throw new Error("appid \u4E0D\u80FD\u4E3A\u7A7A");
  }
  if (!privateKeyPath) {
    throw new Error("privateKeyPath \u4E0D\u80FD\u4E3A\u7A7A");
  }
  if (!projectPath) {
    throw new Error("projectPath \u4E0D\u80FD\u4E3A\u7A7A");
  }
  if (!packageJsonPath) {
    throw new Error("packageJsonPath \u4E0D\u80FD\u4E3A\u7A7A");
  }
  privateKeyPath = path__default.resolve(cwdPath, privateKeyPath);
  projectPath = path__default.resolve(cwdPath, projectPath);
  configPath = path__default.resolve(cwdPath, configPath || "");
  packageJsonPath = path__default.resolve(cwdPath, packageJsonPath || "");
  return {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    projectOptions,
    uploadOptions,
    previewOptions
  };
};
const loadWxconfig = async (cwd2) => {
  let resolvedPath;
  for (const filename of DEFAULT_CONFIG_FILES) {
    const filePath = path__default.join(cwd2, filename);
    if (!fs__default.existsSync(filePath))
      continue;
    resolvedPath = filePath;
    break;
  }
  let fileNameTmp;
  try {
    let fileUrl = resolvedPath;
    if (!/\.mjs$/.test(resolvedPath)) {
      const fileBase = `${resolvedPath}.timestamp-${Date.now()}`;
      fileNameTmp = `${fileBase}.mjs`;
      fileUrl = `${node_url.pathToFileURL(fileBase)}.mjs`;
      const code = fs__default.readFileSync(resolvedPath, "utf8");
      fs__default.writeFileSync(fileNameTmp, code, "utf8");
    }
    const res = await import(fileUrl);
    return res.default;
  } catch (e) {
    console.log(
      `\u52A0\u8F7D ${resolvedPath || "wx.config.js"} \u5931\u8D25\uFF0C\u5C06\u4F7F\u7528 .env \u4E2D\u7684\u914D\u7F6E`,
      e
    );
    return {
      error: `\u672A\u914D\u7F6E ${resolvedPath || "wx.config.js"} \u6587\u4EF6`
    };
  } finally {
    try {
      fs__default.unlinkSync(fileNameTmp);
    } catch {
    }
  }
};
const parseEnv = async () => {
  let parsed = {};
  let wxconfig = await loadWxconfig(cwdPath);
  if (!isObject(wxconfig)) {
    throw new Error(`wx.config \u5FC5\u987B\u5BFC\u51FA\u4E00\u4E2A\u5BF9\u8C61`);
  }
  if (wxconfig.error) {
    let dotenvResult = dotenv__default.config({
      path: path__default.resolve(cwdPath, "./.env")
    });
    parsed = dotenvResult.parsed;
    if (dotenvResult.error) {
      throw error;
    }
  } else {
    parsed = wxconfig;
  }
  let {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    projectOptions,
    uploadOptions,
    previewOptions
  } = formatConfig(parsed);
  return {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    projectOptions,
    uploadOptions,
    previewOptions
  };
};

const getConfig = async (options = {}) => {
  let { configPath, useSelect = true, useMultiSelect = false } = options;
  console.log("\u6839\u636E\u5355\u9009\u6216\u8005\u591A\u9009\u9009\u62E9\u5C0F\u7A0B\u5E8F\u53C2\u6570", options);
  let configPathList = [];
  if (useSelect || useMultiSelect) {
    try {
      configPathList = fs__default.readdirSync(configPath);
    } catch (error) {
      throw new Error("\u8BF7\u8BBE\u7F6E \u5C0F\u7A0B\u5E8F\u914D\u7F6E\u8DEF\u5F84 configPath");
    }
    if (configPathList.length === 0) {
      throw new Error("\u8BF7\u8BBE\u7F6E \u5C0F\u7A0B\u5E8F\u914D\u7F6E\u8DEF\u5F84 configPath");
    }
  }
  if (useSelect) {
    useMultiSelect = false;
  }
  if (useMultiSelect) {
    useSelect = false;
  }
  const { prompt, MultiSelect } = enquirer__default;
  const configPathListJson = configPathList.map((el) => {
    return loadJsonFile.loadJsonFileSync(`${configPath}/${el}`);
  });
  let result = [];
  if (useSelect) {
    const { name } = await prompt({
      type: "select",
      name: "name",
      message: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u5C0F\u7A0B\u5E8F\u914D\u7F6E",
      choices: configPathListJson
    });
    result = configPathListJson.filter((el) => el.name === name);
    return result;
  }
  if (useMultiSelect) {
    const multiSelectPrompt = new MultiSelect({
      name: "value",
      message: "\u53EF\u9009\u62E9\u591A\u4E2A\u5C0F\u7A0B\u5E8F\u914D\u7F6E",
      limit: 7,
      choices: configPathListJson
    });
    try {
      const answer = await multiSelectPrompt.run();
      console.log("Answer:", answer);
      result = configPathListJson.filter(
        (el) => answer.includes(el.name)
      );
      return result;
    } catch (err) {
      console.log("\u60A8\u5DF2\u7ECF\u53D6\u6D88");
      console.log(err);
      process.exit(1);
    }
  }
  const { yes } = await prompt({
    type: "confirm",
    name: "yes",
    message: `\u786E\u8BA4\u9009\u62E9\u8FD9(\u51E0)\u4E2A\u5C0F\u7A0B\u5E8F\uFF1F`
  });
  if (!yes) {
    return;
  }
};

const getVersion = (packageJsonPath) => {
  let version;
  try {
    version = loadJsonFile.loadJsonFileSync(`${packageJsonPath}/package.json`).version;
  } catch (e) {
    console.log(e);
    console.log(
      kolorist.red(
        kolorist.bold(
          "\u672A\u8BBE\u7F6E version , \u5E76\u4E14\u672A\u8BBE\u7F6E package.json \u8DEF\u5F84\uFF0C\u65E0\u6CD5\u8BFB\u53D6 version"
        )
      )
    );
  }
  return version;
};

const version$1 = "0.10.1";

const getVersionInfo = (show) => {
  if (show) {
    return console.log("@ruochuan/mp-cli, v" + version$1);
  }
};
const getHelpInfo = (show) => {
  if (show) {
    let msg = "";
    msg += "\n  Usage";
    msg += "\n    $ mp-cli [options]";
    msg += "\n    $ \u6216\u8005\uFF1Aruochuan-mp-cli [options]";
    msg += "\n    $ \u6216\u8005\uFF1Armc [options]\n";
    msg += "\n  Configs";
    msg += "\n    $ \u4F7F\u7528\u524D\u67E5\u770B github \u6587\u6863\uFF1Ahttps://github.com/lxchuan12/mp-cli";
    msg += "\n    $ \u6309\u7167\u6587\u6863\u5728\u9879\u76EE\u4E2D\u914D\u7F6E\u597D wx.config.js (\u53C2\u8003\uFF1Ahttps://github.com/lxchuan12/mp-cli/blob/main/wx.config.js)";
    msg += "\n    $ \u6216\u8005\u914D\u7F6E\u597D .env (\u53C2\u8003\uFF1Ahttps://github.com/lxchuan12/mp-cli/blob/main/.env)\n";
    msg += "\n  Options";
    msg += "\n    -u, --upload             \u4E0A\u4F20";
    msg += "\n    -p, --preview            \u9884\u89C8";
    msg += "\n    -r, --robot              \u6307\u5B9A\u673A\u5668\u4EBA (default: 1)";
    msg += "\n    -d, --dry                \u7A7A\u8DD1";
    msg += "\n    -s, --useSelect          \u5355\u9009";
    msg += "\n    -m, --useMultiSelect     \u591A\u9009";
    msg += "\n    -v, --version            \u663E\u793A\u5F53\u524D\u7248\u672C";
    msg += "\n    -h, --help               \u663E\u793A\u5E2E\u52A9\u4FE1\u606F\n";
    msg += "\n  Examples";
    msg += "\n    $ mp-cli --upload";
    msg += "\n    $ mp-cli --upload --dry --robot 2";
    msg += "\n    $ mp-cli --preview";
    msg += "\n    $ mp-cli --preview --useSelect --dry --robot 2";
    msg += "\n    $ mp-cli --version";
    msg += "\n    $ mp-cli --help\n";
    msg += "\n  Docs";
    msg += "\n    $ \u66F4\u591A\u5982\u4F55\u4F7F\u7528\u53EF\u67E5\u770B github \u6587\u6863\uFF1Ahttps://github.com/lxchuan12/mp-cli";
    msg += "\n    $ \u6216\u8005\u53EF\u67E5\u770B npm \u6587\u6863\uFF1Ahttps://www.npmjs.com/package/@ruochuan/mp-cli";
    msg += "\n    $ \u5F53\u7136\u4E5F\u53EF\u4EE5\u514B\u9686\u4E0B\u6765\u4F7F\u7528\uFF0C\u53EF\u4EE5\u6839\u636E\u8981\u6C42\u81EA\u884C\u4FEE\u6539";
    return console.log(msg + "\n");
  }
};

const {
  robot,
  dry: isDryRun,
  preview,
  upload,
  useSelect,
  useMultiSelect,
  version,
  help
} = getParams();
const init = async () => {
  process.title = "@ruochuan/mp-cli\uFF0C\u4F5C\u8005@\u82E5\u5DDD";
  if (version || help) {
    getVersionInfo(version);
    getHelpInfo(help);
    return;
  }
  const parseEnvResult = await parseEnv();
  let mpConfigList = [parseEnvResult];
  if (useSelect || useMultiSelect) {
    const configResult = await getConfig({
      configPath: parseEnvResult.configPath,
      useSelect,
      useMultiSelect
    });
    mpConfigList = !Array.isArray(configResult) ? [] : configResult.map((el) => formatConfig(el));
  }
  for (const mpConfigItem of mpConfigList) {
    const {
      name,
      appid,
      privateKeyPath,
      projectPath,
      packageJsonPath,
      version: version2,
      desc,
      projectOptions,
      uploadOptions,
      previewOptions
    } = mpConfigItem;
    let lastVersion = version2 || getVersion(packageJsonPath);
    const lastDesc = desc || getDesc(projectPath, lastVersion);
    try {
      const res = await main({
        name,
        projectPath,
        appid,
        privateKeyPath,
        version: lastVersion,
        robot,
        upload,
        preview,
        isDryRun,
        desc: lastDesc,
        projectOptions,
        uploadOptions,
        previewOptions
      });
      console.log(res);
    } catch (err) {
      console.log("\u6267\u884C\u5931\u8D25", err);
    }
  }
};
init().catch((e) => {
  console.log("init \u6267\u884C\u5F02\u5E38", e);
});
