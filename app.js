const { spawn } = require('child_process');

const testProcess = spawn('npm', ['test']);

testProcess.stdout.on('data', (data) => {
  console.log(`Output:\n${data}`);
});

testProcess.stderr.on('data', (data) => {
  console.error(`Errors:\n${data}`);
});

testProcess.on('close', (code) => {
  console.log(`npm test finished with exit code ${code}`);
});