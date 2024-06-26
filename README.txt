project-directory/
│
├── src/
│   ├── test/
│   │   ├── features/
│   │   │   └── *.feature          # Cucumber feature files
│   │   ├── steps/
│   │   │   └── *.ts               # TypeScript step definitions
│   │   ├── pages/
│   │   │   └── *.ts               # Playwright page objects
│   │   └── helper/
│   │       └── hooks.ts            # Cucumber hooks 
│   │       └── / report.ts         # Custom reporting script  
├── test-results/reports/index.html  # Test Reporting file            
├── node_modules/                    # Node.js modules (auto-generated)
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project overview and instructions



Dependencies (package.json)
List key dependencies and their purpose:

  -@cucumber/cucumber: Cucumber framework for BDD testing. 
  -@playwright/test: Playwright for browser automation.
  -typescript: TypeScript for writing type-safe JavaScript.


Reports

  -HTML Report: test-results/cucumber-report.html
  -JSON Report: test-results/cucumber-report.json


Features
List key features or functionalities of your project.

Prerequisites (ensure you have the following installed):
  -Node.js 
  -npm 
  -VS Code


Installation
  unzip the file and install dependencies:
  -npm install

Running Tests
  -npm test