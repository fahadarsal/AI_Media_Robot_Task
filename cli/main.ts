import { Direction, Robot } from "./Robot";
import * as readline from "readline";

async function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await new Promise<string>((resolve) => {
    rl.question("Enter input: ", (answer: string) => {
      resolve(answer);
    });
  });

  rl.close();

  return input;
}

const commands = ["LEFT", "RIGHT", "MOVE", "REPORT", "PLACE"];
(async () => {
  const robot = new Robot();

  while (true) {
    const inputString = await getUserInput();
    const commandArray = inputString.trim().split(" ");
    const command = commandArray[0];
    if (!commands.find((c) => c == command)) {
      console.log(
        "Invalid Command. The allowed commands are: PLACE, LEFT, RIGHT, MOVE, REPORT"
      );
      continue;
    }

    if (command === "LEFT") {
      robot.commandLeft();
    }
    if (command === "RIGHT") {
      robot.commandRight();
    }
    if (command === "REPORT") {
      console.log(robot.commandReport());
    }
    if (command === "MOVE") {
      robot.commandMove();
    }
    if (command === "PLACE") {
      if (commandArray.length < 2) {
        console.log(
          "Invalid Parameters for PLACE commands. The format is PLACE x,y,DIRECTION (no spaces in params)"
        );
        console.log(
          "Valid values for directions are: EAST, WEST, SOUTH, NORTH"
        );
        continue;
      }
      const params = commandArray[1].split(",");
      if (params.length < 3) {
        console.log(
          "Invalid Parameters for PLACE commands. The format is PLACE x,y,DIRECTION (no spaces in params)"
        );
        console.log(
          "Valid values for directions are: EAST, WEST, SOUTH, NORTH"
        );
        continue;
      }
      const x = Number(params[0]);
      const y = Number(params[1]);
      const direction = params[2];
      robot.commandPlace(x, y, Direction[direction]);
    }
  }
})();
