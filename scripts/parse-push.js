const fs = require('fs');
const path = "./jest-stare/jest-results.json";

fs.readFile(path, function(err, data) { 

    if (err) throw err; 

    const obj = JSON.parse(data); 
    const testResults = obj.testResults[0].testResults;
    const perfStats = obj.testResults[0].perfStats;
    const totalFailed = obj.numFailedTests;
    const totalPassed = obj.numPassedTests;
    const totalPending = obj.numPendingTests;
    const totalTodo = obj.numTodoTests;
    const totalTests = obj.numTotalTests;
    const totalDuration = parseInt(perfStats.runtime, 10) / 1000;


    parsed_data = [];
    for (let i = 0; i < testResults.length; i++) {
        
        let testId = "TC_" + (i+1);
        const test = testResults[i];
        const ancestorTitles = test.ancestorTitles;
        const duration = test.duration;
        const status = test.status.toUpperCase();
        let failureMessages = test.failureMessages;
        if (failureMessages.length == 0) { failureMessages = "None"; }
        console.log(`Test id: ${testId}\nTest name: ${ancestorTitles}\nStatus: ${status}\nDuration: ${duration}ms\nFailure messages: ${failureMessages}\n`);
    }
    console.log(`Total tests: ${totalTests}\nTotal failed: ${totalFailed}\nTotal passed: ${totalPassed}\nTotal pending: ${totalPending}\nTotal todo: ${totalTodo}\nTotal duration: ${totalDuration}s`);
}); 