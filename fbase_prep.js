// The goal of this file is to replace all axios calls from vue client with firebase calls.

var shell = require('shelljs');

if (!shell.which('git')) {

	shell.echo('Sorry, this script requires git');
	shell.exit(1);

} else {

	// shell.echo('Git found here');
}

shell.exec('git branch -D fbase');

shell.exec('git checkout -b fbase');

// inject connect to firebase in index.html



/// read from file

var initFbase = shell.cat('firebase_init.txt');

console.log('initFbase ===' + initFbase);

shell.sed('-i', '</body>', initFbase + '</body>', './client/vue/index.html');
shell.sed('-i', `deploymentTarget: 'localhost'`, `deploymentTarget: 'firebase'`, './client/vue/src/main.js');

// Run external tool synchronously
// if (shell.exec('git checkout -b fbase').code === 0) {
//   shell.echo('fbase git branch created.');
//   shell.exit(1);
// }
