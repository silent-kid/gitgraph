import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

const writeCommit = async (date) => {
  const data = { date };
  await jsonfile.writeFile(path, data);
  await git.add([path]);
  await git.commit(date, { "--date": date });
};

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const x = random.int(0, 54); // weeks
    const y = random.int(0, 6);  // days
    const date = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    console.log(`Commit on: ${date}`);
    await writeCommit(date);
  }

  // push only once at the end
  await git.push();
};

makeCommits(100);
