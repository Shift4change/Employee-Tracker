
const mysql = require('mysql');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 8080;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dragostea11',
    database: 'employee_db'
});
connection.connect(function(err){
    if (err) {
        console.log('error connection: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    askQuestions();
});
function askQuestions(){
    inquirer.prompt([
        {
            name: 'menuChoices',
            type:'list',
            message: 'Please select from options in the menu',
            choices: ["Add Department", "View Departments", "Add Role", "View Roles", "Add Employee", "View Employees", "Exit"]
        }
    ]).then(function(menuAnswers){
        if(menuAnswers.menuChoices === "Add Department") {
            addDept();
        } else if(menuAnswers.menuChoices === "View Departments"){
            viewDept();
        } else if(menuAnswers.menuChoices === "Add Role"){
            addRole();
        } else if(menuAnswers.menuChoices === "View Roles") {
            viewRole();
        } else if(menuAnswers.menuChoices === "Add Employee") {
            addEmployee();
        } else if(menuAnswers.menuChoices === "View Employees"){
            viewEmployees();
        } else {
            connection.end();
        };
    });
}
function addDept() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "Please enter department name:"
        }
    ]).then(function(deptAnswers){
        const departmentName = deptAnswers.deptName;
        connection.query("INSERT INTO department(name) VALUES(?)", [departmentName],
        function(err, data){
            if(err){
                throw err;
            }
            console.log(`${departmentName} was added successfully!`)
            askQuestions();
        })
    });
}
function addRole() {
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "Please enter name of the role:"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of this role?"
        },
        {
            name: "departmentId",
            type: "input",
            message: "What is the department id?"
        }
    ]).then(function(roleAnswers){
        const roleName = roleAnswers.roleName;
        const salary = roleAnswers.salary;
        const deptId = roleAnswers.departmentId;
        connection.query("INSERT INTO role(title, salary , department_id) VALUES(?)", [roleNmame], [salary], [deptId],
        function(err, data){
            if(err){
                throw err;
            }
            console.log(`${roleName} was added successfully!`)
            askQuestions();
        });
    });
}
