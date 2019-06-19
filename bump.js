/// This is run before publishing to npm
const { exec } = require('child_process');
const inquirer = require('inquirer');

const question = {
	name: 'type',
	type: 'list',
	message: 'Please select a semantic version type for this release',
	choices: ['Major', 'Minor', 'Patch']
}



inquirer.prompt([question])
	.then(answers => { 

		exec(`npm version ${answers.type.toLowerCase()}`, (error, stderr, stdout) => {

			if (error) {
				console.log(error);
				process.exit(1);
			}

			console.log({ stderr });
			console.log({ stdout });
			process.exit(0);
		})

	})


	


