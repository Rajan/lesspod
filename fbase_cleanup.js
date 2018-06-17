// The goal of this file is to revert back changes made regarding firebase deployment.

var shell = require('shelljs');

if (!shell.which('git')) {
	
	shell.echo('Sorry, this script requires git');
	shell.exit(1);

} else {

	// shell.echo('Git found here');	
}

shell.exec('git stash');

shell.exec('git checkout master');

shell.exec('git branch -D fbase');

// Run external tool synchronously
// if (shell.exec('git branch -D fbase').code === 0) {
//   shell.echo('fbase git branch deleted.');
//   shell.exit(1);
// }