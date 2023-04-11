import { Direction, Robot } from "./Robot";

const robot = new Robot();

robot.commandPlace(0, 0, Direction.EAST);
robot.commandLeft();
robot.commandMove();
robot.commandMove();
robot.commandMove();
robot.commandMove();
robot.commandMove();

console.log(robot.commandReport());
