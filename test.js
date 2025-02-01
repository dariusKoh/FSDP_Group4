const { runTestInContainers } = require("./scripts/run-tests");
async function pee() {
	await runTestInContainers(1, 'testuser');
}
pee();
