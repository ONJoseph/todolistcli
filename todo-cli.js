const yargs = require('yargs');
const fs = require('fs');

// Define the path to the JSON file where tasks will be stored
const dataFilePath = 'tasks.json';

// Load tasks from the data file (if it exists)
const loadTasks = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save tasks to the data file
const saveTasks = (tasks) => {
  const data = JSON.stringify(tasks);
  fs.writeFileSync(dataFilePath, data);
};

// Add a new task
yargs.command({
  command: 'add',
  describe: 'Add a new task',
  builder: {
    task: {
      describe: 'Task description',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const tasks = loadTasks();
    tasks.push(argv.task);
    saveTasks(tasks);
    console.log('Task added:', argv.task);
  },
});

// List all tasks
yargs.command({
  command: 'list',
  describe: 'List all tasks',
  handler: () => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      console.log('Tasks:');
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
  },
});

// Remove a task
yargs.command({
  command: 'remove',
  describe: 'Remove a task',
  builder: {
    index: {
      describe: 'Task index to remove',
      demandOption: true,
      type: 'number',
    },
  },
  handler: (argv) => {
    const tasks = loadTasks();
    if (argv.index >= 1 && argv.index <= tasks.length) {
      const removedTask = tasks.splice(argv.index - 1, 1)[0];
      saveTasks(tasks);
      console.log('Task removed:', removedTask);
    } else {
      console.error('Invalid task index.');
    }
  },
});

yargs.parse();


/*
Run Your CLI Application
Now you can run your to-do list application:
node todo-cli.js --help

This command will display the available commands and options. You can add tasks, list tasks, and remove tasks using the provided commands.
Example usage:
Run the todo-cli.js file using Node.js:
node todo-cli.js add --task "Buy groceries"
You should replace "Buy groceries" with the actual task description you want to add. Similarly, you can use other commands like list and remove:
node todo-cli.js list
node todo-cli.js remove --index 1

===============================================
Node.js command-line application for managing a simple to-do list. It uses the yargs library to define and handle command-line commands and arguments. Let's break down the code step by step:

Import Required Modules:

const yargs = require('yargs');
const fs = require('fs');
yargs: A library for parsing command-line arguments and generating user-friendly command-line interfaces.
fs: The Node.js built-in file system module, used for reading and writing data to files.
Define the Data File Path:

const dataFilePath = 'tasks.json';
This variable stores the path to a JSON file where tasks will be stored. The file is named tasks.json.
Load Tasks from Data File:

const loadTasks = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
loadTasks is a function that attempts to read and parse the contents of the tasks.json file.
If the file exists and contains valid JSON data, it returns the parsed tasks array.
If the file doesn't exist or encounters an error during reading or parsing, it returns an empty array.
Save Tasks to Data File:

const saveTasks = (tasks) => {
  const data = JSON.stringify(tasks);
  fs.writeFileSync(dataFilePath, data);
};
saveTasks is a function that takes a tasks array and saves it to the tasks.json file.
It converts the tasks array to a JSON string and writes it to the file.
Define Command to Add a Task:

yargs.command({
  command: 'add',
  describe: 'Add a new task',
  builder: {
    task: {
      describe: 'Task description',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    const tasks = loadTasks();
    tasks.push(argv.task);
    saveTasks(tasks);
    console.log('Task added:', argv.task);
  },
});
This command defines how to add a new task.
It expects a task argument (the task description) to be passed with the --task flag when running the command.
The handler function is called when the add command is executed. It loads existing tasks, adds the new task to the array, saves it to the file, and logs a confirmation message.
Define Command to List All Tasks:

yargs.command({
  command: 'list',
  describe: 'List all tasks',
  handler: () => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      console.log('Tasks:');
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
  },
});
This command defines how to list all tasks.
The handler function loads tasks, checks if any tasks exist, and either displays the list of tasks or a message if no tasks are found.
Define Command to Remove a Task:

yargs.command({
  command: 'remove',
  describe: 'Remove a task',
  builder: {
    index: {
      describe: 'Task index to remove',
      demandOption: true,
      type: 'number',
    },
  },
  handler: (argv) => {
    const tasks = loadTasks();
    if (argv.index >= 1 && argv.index <= tasks.length) {
      const removedTask = tasks.splice(argv.index - 1, 1)[0];
      saveTasks(tasks);
      console.log('Task removed:', removedTask);
    } else {
      console.error('Invalid task index.');
    }
  },
});
This command defines how to remove a task by its index.
It expects an index argument (the task index) to be passed with the --index flag.
The handler function verifies that the index is valid, removes the task, saves the updated task list to the file, and logs a confirmation message.
Parse Command-Line Arguments:

yargs.parse();
This line instructs yargs to parse the command-line arguments and execute the corresponding command based on the provided arguments.
*/