const getVersionInfo = (show) => {
    if (show) {
        let { version } = require('../../package.json');
        return console.log('@ruochuan/mp-cli, v' + version);
    }
}


const getHelpInfo = (show) => {
    if (show) {
        let msg = '';
        msg += '\n  Usage';
        msg += '\n    $ @ruochuan/mp-cli [options]\n';
        msg += '\n  Options';
        msg += '\n    -u, --upload             上传';
        msg += '\n    -p, --preview            预览';
        msg += '\n    -r, --robot              指定机器人 (default: 1)';
        msg += '\n    -d, --dry                空跑';
        msg += '\n    -s, --useSelect          单选';
        msg += '\n    -m, --useMultiSelect     多选';
        msg += '\n    -v, --version            显示当前版本';
        msg += '\n    -h, --help               显示帮助信息\n';
        msg += '\n  Examples';
        msg += '\n    $ @ruochuan/mp-cli --upload';
        msg += '\n    $ @ruochuan/mp-cli --preview';
        msg += '\n    $ @ruochuan/mp-cli --version';
        return console.log(msg + '\n');
    }
}

module.exports = {
    getVersionInfo,
    getHelpInfo,
}