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


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let team = [];

startProgram()
async function startProgram() {
    
    team.push(new Manager("Andrew", 1, "test@test.com", "001010"))
    // team.push(new Engineer("Andrew", 2, "test2@test.com"))
    // team.push(new Intern("Andrew", 3, "test3@test.com"))
    // team.push(new Intern("Andrew", 4, "test4@test.com"))

    let htmlDoc = render(team);

    await fs.writeFile(outputPath, htmlDoc);
}
