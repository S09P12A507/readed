const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
    {
        options: {
            'sonar.projectName': 'S09P12A507-frontend',
            'sonar.projectKey': 'S09P12A507',
            'sonar.sources': 'src',
            'sonar.inclusions': '**',
            // 'sonar.test.inclusions': 'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            // 'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            // 'sonar.testExecutionReportPaths': 'coverage/cover.xml',
        },
    },
    () => process.exit(),
);
module.exports = sonarqubeScanner;