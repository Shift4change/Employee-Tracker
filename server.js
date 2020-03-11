
const mysql = require('mysql');
const inquirer = require('inquirer');
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
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
            choices: ["Add Department", "View Departments", "Update Role", "Add Role", "View Roles", "Add Employee", "View Employees", "Exit"]
        }
    ]).then(function(menuAnswers){
        if(menuAnswers.menuChoices === "Add Department") {
            addDept();
        } else if(menuAnswers.menuChoices === "View Departments"){
            viewDept();
        } else if(menuAnswers.menuChoices === "Update Role"){
            updateRole();
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
            console.table(`${departmentName} was added successfully!`)
            askQuestions();
        })
    });
}
function viewDept(){
    connection.query("SELECT * FROM department",
    function(err, rows){
        if(err)
        throw err;

    rows.forEach(function(row) {
        console.table(`ID:${row.id} Dept Name: ${row.name}`)
    });

    });
    askQuestions();
}
function addRole() {
    inquirer.prompt([
        {
            name: "title",
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
        const roleName = roleAnswers.title;
        const salary = roleAnswers.salary;
        const deptId = roleAnswers.departmentId;

        connection.query(`INSERT INTO role(title, salary , department_id) VALUES("${roleName}", ${salary}, ${deptId})`,
        function(err, data){
            if(err){
                throw err;
            }
            console.table(`${roleName} was added successfully!`)
            askQuestions();
        });
    });
};

/////grabing data from Mysql
function viewRole() {
    connection.query("SELECT * FROM role",
    function(err,rows){
        if(err)
        throw err;

        rows.forEach(function(row) {
            console.table(`ID: ${row.id} | Title: ${row.title} | Salary: ${row.salary} | Dept Nr: ${row.department_id}`)
        });
    });
    askQuestions();
}

// this may or may not work
function updateRole() {
    connection.query("SELECT * FROM employee", function(err, rows){
        if(err){
            throw err;

        }

    console.table(rows)
    inquirer.prompt([
        {
            name: "id",
            message: "Please enter Id of Employee you would like to update?",
            type: "input"
        },
        {
            name: "title",
            message:"Please enter the New role id that you are assigning the employee to",
            type:"input"
        }

    ]).then(function(res){
        connection.query(`UPDATE employee SET role_id = ${res.title}`,
        function(err) {
            if(err) {
                throw err;
            }
            console.table("Update Role Successful")

            askQuestions();
        });
    });
        
    });


}
// read above comment!!!!!!!!!!!!!!!!!!
function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter employee first name:"
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter employee last name:"
        },
        {
            name: "title",
            type: "input",
            message: "What is the employee's role Id?"
        },
        {
            name: "manager",
            type: "input",
            message: " Please enter Manager's Id "
        }
    ]).then(function(employeeAnswers){
        const employeeFirstName = employeeAnswers.first_name;
        const employeeLastName = employeeAnswers.last_name;
        const employeeTitle = employeeAnswers.title;
        const employeeManager = employeeAnswers.manager;
        connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id ) VALUES('${employeeFirstName}', '${employeeLastName}', ${employeeTitle}, ${employeeManager})`,
        function(err, data){
            if(err){
                throw err;
            }
            console.table(`${employeeFirstName} ${employeeLastName} was added successfully!`);

            askQuestions();
        });
    });
};

//////grabing data from Mysql 
function viewEmployees() {
    connection.query("SELECT * FROM employee",
    function(err, rows) {
        if(err)
        throw err;

        rows.forEach(function(row){

            console.table(`ID: ${row.id} | Fist Name ${row.first_name} | Last Name ${row.last_name} | Role id ${row.role_id} | Manager id ${row.manager_id}`)
        });
      
    });

    askQuestions();
}

