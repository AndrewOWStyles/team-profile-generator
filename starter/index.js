const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let team = [];

async function startProgram() {
  await manager();
  let addAnotherEmployee = await addAnEmployeeConfirm();
  while (addAnotherEmployee) {
    let employeeType = await employeeOptions();
    if (employeeType === "Engineer") {
      await engineer();
    } else {
      await intern();
    }
    addAnotherEmployee = await addAnEmployeeConfirm();
  }
  let htmlDoc = render(team);
  await fs.writeFile(outputPath, htmlDoc);
}

function manager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
      },
    ])
    .then((managerAnswers) => {
      const { name, id, email, officeNumber } = managerAnswers;
      const manager = new Manager(name, id, email, officeNumber);
      team.push(manager);
    });
}

function addAnEmployeeConfirm() {
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add a new employee?",
      },
    ])
    .then((answers) => {
      return answers.addEmployee;
    });
}

function employeeOptions() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employeeType",
        message: "What type of employee would you like to add?",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then((answers) => {
      return answers.employeeType;
    });
}

function engineer() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is your GitHub username?",
      },
    ])
    .then((engineerAnswers) => {
      const { name, id, email, github } = engineerAnswers;
      const engineer = new Engineer(name, id, email, github);
      team.push(engineer);
    });
}

function intern() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the Intern's name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the Employee ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is your email?",
        },
        {
          type: "input",
          name: "school",
          message: "What is your school's name?",
        },
      ])
      .then((internAnswers) => {
        const { name, id, email, school } = internAnswers;
        const intern = new Intern(name, id, email, school);
        team.push(intern);
      });
  }

startProgram();
