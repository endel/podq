import path from 'path';
import fs from 'fs-extra';
import shell from 'shelljs';

var taskname = process.argv[2] || 'release';
var taskmap = {
  'release': release,
  'dev': dev
}
run(taskmap[taskname]);

async function release() {
  await run(clean);
  await run(jsRelease);
}

async function dev() {
  await run(clean);
  await run(jsWatch);
}

async function clean() {
  shell.exec('find . -name \'*.DS_Store\' -type f -delete');
}

async function jsRelease() {
  var cmd = 'browserify src/Player.js -s Player -t [ babelify ] | uglifyjs -mc > player.js';
  shell.exec(cmd);
}

async function jsWatch() {
  var cmd = 'watchify src/Player.js -s Player -t [ babelify ] -o player.js -d -v';
  var server = 'http-server . -p 8080 -s';
  shell.exec(`${cmd} & ${server}`);
}

// TOOLS -------------------------------------------------

function log(msg) {
  console.log('[tasks]', msg);
}

function getTime() {
  var d = new Date();
  return d.getTime();
}

async function run(fn) {
  const start = getTime();
  log(`${fn.name} - start`);
  await fn();
  const time = getTime() - start;
  log(`${fn.name} - finish after ${time} ms`);
}
