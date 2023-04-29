const pack = require('../package.json')

const bannerTxt = `/*! Ui-Kit v${pack.version} */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)
