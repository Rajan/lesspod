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

var initFbase = `<script src="https://www.gstatic.com/firebasejs/5.0.3/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCrGRcJTOpLQUAWFVMJuPyK_qwb1Swxys8",
      authDomain: "testpod-6c03e.firebaseapp.com",
      databaseURL: "https://testpod-6c03e.firebaseio.com",
      projectId: "testpod-6c03e",
      storageBucket: "",
      messagingSenderId: "224334694532"
    };
    firebase.initializeApp(config);
  </script>
</body>`;

shell.sed('-i', '</body>', initFbase, './client/vue/index.html');

// Run external tool synchronously
// if (shell.exec('git checkout -b fbase').code === 0) {
//   shell.echo('fbase git branch created.');
//   shell.exit(1);
// }