
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const profileDataArgs = process.argv.slice(2);
// const [name,github] = profileDataArgs;


// fs.writeFile('index.html',generatePage(name,github),err => {
//     if(err) throw err;
//     console.log(`Portfolio Complete. Check out index.html to see the output!`);
// });

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubName => {
                if(githubName){
                    return true;
                } else {
                    console.log('Enter github username');
                    return false;
                }
            } 
        },
        {
            type:'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => confirmAbout
        }
    ])
};

const promptProject = (portfolioData) => {
   if (!portfolioData.projects){
        portfolioData.projects =[];
   }
    console.log(`
    =================
    Add a New Project
    =================`
    );
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName){
                    return true;
                } else {
                    console.log('Enter project name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionName => {
                if(descriptionName){
                    return true;
                } else {
                    console.log('Enter a description');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLink => {
                if (githubLink){
                    return true;
                } else {
                    console.log('Enter GitHub link');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
}

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
});

