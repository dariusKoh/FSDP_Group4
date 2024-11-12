const { exec } = require('child_process');

exec('npm test', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing npm test: ${error.message}`);
    return;
  }

  console.log(`Output:\n${stdout}`);
  if (stderr) {
    console.error(`Errors:\n${stderr}`);
  }
});