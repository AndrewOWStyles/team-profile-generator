const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
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



startProgram();


// team.push(new Manager("Andrew", 1, "test@test.com", "001010"))
// team.push(new Engineer("Andrew", 2, "test2@test.com", "testgit"))
// team.push(new Intern("Andrew", 3, "test3@test.com", "testschool1"))
// team.push(new Intern("Andrew", 4, "test4@test.com", "testschool2"))