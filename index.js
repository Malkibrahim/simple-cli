let id = 0;
let newObj;
const { program } = require("commander");
const fs = require("fs");
const myStoreStr = fs.readFileSync("./store.json", "utf8");
const myStore = JSON.parse(myStoreStr);
program
  .command("add")
  .description("adding new to do")

  .action(function (cmd) {
    id = myStore.length + 1;
    newObj = { Id: id++, Title: cmd.title };
    myStore.push(newObj);
    fs.writeFileSync("./store.json", JSON.stringify(myStore), "utf8");
  })
  .requiredOption("-t --title <title>", "Indicates the title of entry");
program
  .command("list")
  .description("Show all to-do")

  .action(function () {
    console.log(myStore);
  });
program
  .command("edit")
  .description("edit any to-do")

  .action(function (cmd) {
    let newId = parseInt(cmd.id);

    let i = parseInt(myStore.findIndex((a) => a.Id === newId));

    myStore[i].Title = cmd.title;
    fs.writeFileSync("./store.json", JSON.stringify(myStore), "utf8");
  })
  .requiredOption("-i --id <id>", "edit with id ")
  .requiredOption("-t --title <title>", "edit title");
program
  .command("delete")
  .description("delete any to-do")
  .arguments("<id>")
  .action(function (id, cmd) {
    let newId = parseInt(id);

    let i = myStore.findIndex((a) => a.Id === newId);

    console.log(i);
    myStore.splice(i, 1);
    console.log(myStore);
    fs.writeFileSync("./store.json", JSON.stringify(myStore), "utf8");
  });

program
  .command("edits")
  .description("edit any to-do with status")

  .action(function (cmd) {
    let newId = parseInt(cmd.id);

    let obj = myStore.find((a) => a.Id === newId);

    obj.Title = cmd.title;
    obj.status = cmd.status;

    fs.writeFileSync("./store.json", JSON.stringify(myStore), "utf8");
  })
  .requiredOption("-i --id <id>", "edit with id ")
  .option("-t --title <title>", "edit with title ")
  .option("-s --status <status>", "edit with status ");
program
  .command("lists")
  .description("lis any to-do with status")

  .action(function (cmd) {
    let obj = myStore.filter((a) => a.status == cmd.status);

    console.log(obj);
    console.log(myStore);
    fs.writeFileSync("./store.json", JSON.stringify(myStore), "utf8");
  })

  .option("-s --status <status>", "edit with status ");

program.parse(process.argv);
