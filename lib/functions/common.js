const resetColor = '\x1b[0m';
const print = {
  reset: (text) => `${text}${resetColor}`,
  bright: (text) => `\x1b[1m${text}${resetColor}`,
  dim: (text) => `\x1b[2m${text}${resetColor}`,
  underscore: (text) => `\x1b[4m${text}${resetColor}`,
  blink: (text) => `\x1b[5m${text}${resetColor}`,
  reverse: (text) => `\x1b[7m${text}${resetColor}`,
  hidden: (text) => `\x1b[8m${text}${resetColor}`,

  black: (text) => `\x1b[30m${text}${resetColor}`,
  red: (text) => `\x1b[31m${text}${resetColor}`,
  green: (text) => `\x1b[32m${text}${resetColor}`,
  gray: (text) => `\x1b[38;5;8m${text}${resetColor}`,
  yellow: (text) => `\x1b[33m${text}${resetColor}`,
  blue: (text) => `\x1b[34m${text}${resetColor}`,
  magenta: (text) => `\x1b[35m${text}${resetColor}`,
  cyan: (text) => `\x1b[36m${text}${resetColor}`,
  white: (text) => `\x1b[37m${text}${resetColor}`,

  bgBlack: (text) => `\x1b[40m${text}${resetColor}`,
  bgRed: (text) => `\x1b[41m${text}${resetColor}`,
  bgGreen: (text) => `\x1b[42m${text}${resetColor}`,
  bgYellow: (text) => `\x1b[43m${text}${resetColor}`,
  bgBlue: (text) => `\x1b[44m${text}${resetColor}`,
  bgMagenta: (text) => `\x1b[45m${text}${resetColor}`,
  bgCyan: (text) => `\x1b[46m${text}${resetColor}`,
  bgWhite: (text) => `\x1b[47m${text}${resetColor}`,
};

function dateTime(d) {
  let offsetIST = 330;
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset() + offsetIST);

  const year = String(d.getFullYear()), time = String(d.toLocaleTimeString());
  let month = String(d.getMonth() + 1), day = String(d.getDate());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return `${year}-${month}-${day}  ${time}`;
}


const logger = {
  Info: (n, m) => console.log('✔', print.green('  INFO'), ' ', print.blue(n.padEnd(20)), print.green(m.padEnd(25)), print.gray(dateTime(new Date()))),
  Warn: (n, m) => console.log('✖', print.yellow('  WARN'), ' ', print.blue(n.padEnd(20)), print.yellow(m.padEnd(25)), print.gray(dateTime(new Date()))),
  Error: (n, m) => console.log('⚠', print.red('  ERROR'), ' ', print.blue(n.padEnd(20)), print.red(m.padEnd(25)), print.gray(dateTime(new Date())))
}



module.exports = {
  print,
  logger
};
