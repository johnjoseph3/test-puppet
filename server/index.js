const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', {title: 'Test'} );
});

app.post('/test', (req, res) => {
  const testDataFilePath = path.join(__dirname, '../test/test-params.json');

  fs.writeFileSync(testDataFilePath, JSON.stringify(req.body));

  const jest = exec(`jest --json`);

  jest.stdout.on('data', (data) => {
    const results = JSON.parse(data);

    const successMessage = results.success ? 'Passed' : 'Failed';

    res.render('results', {
      title: 'Results',
      successMessage,
      success: results.success,
      numFailedTestSuites: results.numFailedTestSuites,
      numFailedTests: results.numFailedTests,
      numPassedTestSuites: results.numPassedTestSuites,
      numPassedTests: results.numPassedTests,
    })
  });
  
  jest.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  jest.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

});

app.listen(8080);