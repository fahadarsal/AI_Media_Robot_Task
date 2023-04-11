type Position = {
  x: number;
  y: number;
};

export enum Direction {
  NORTH = "NORTH",
  WEST = "WEST",
  SOUTH = "SOUTH",
  EAST = "EAST",
}

enum CommandDirection {
  LEFT,
  RIGHT,
}

export class Robot {
  private currentDirection: Direction;
  private currentPosition: Position;

  private static boardSize = 5;

  constructor() {
    this.currentPosition = { x: -1, y: -1 };
    this.currentDirection = Direction.EAST;
  }
  isPlaced(): boolean {
    return this.currentPosition.x !== -1 && this.currentPosition.y !== -1;
  }

  getNewPosition(): Position {
    const newPosition: Position = {
      x: this.currentPosition.x,
      y: this.currentPosition.y,
    };

    switch (this.currentDirection) {
      case Direction.NORTH:
        newPosition.y++;
        break;
      case Direction.EAST:
        newPosition.x++;
        break;
      case Direction.SOUTH:
        newPosition.y--;
        break;
      case Direction.WEST:
        newPosition.x--;
        break;
    }

    return newPosition;
  }

  getNewDirection(command: CommandDirection): Direction {
    let newDirection = this.currentDirection;
    if (command === CommandDirection.LEFT) {
      switch (this.currentDirection) {
        case Direction.NORTH:
          newDirection = Direction.WEST;
          break;
        case Direction.EAST:
          newDirection = Direction.NORTH;
          break;
        case Direction.SOUTH:
          newDirection = Direction.EAST;
          break;
        case Direction.WEST:
          newDirection = Direction.SOUTH;
          break;
      }
    }
    if (command === CommandDirection.RIGHT) {
      switch (this.currentDirection) {
        case Direction.NORTH:
          newDirection = Direction.EAST;
          break;
        case Direction.EAST:
          newDirection = Direction.SOUTH;
          break;
        case Direction.SOUTH:
          newDirection = Direction.WEST;
          break;
        case Direction.WEST:
          newDirection = Direction.NORTH;
          break;
      }
    }

    return newDirection;
  }

  isValidPosition(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x < Robot.boardSize &&
      position.y >= 0 &&
      position.y < Robot.boardSize
    );
  }

  commandPlace(x: number, y: number, dir: Direction): boolean {
    if (x >= Robot.boardSize || y >= Robot.boardSize || x < 0 || y < 0) {
      console.log("Invalid Command");
      return false;
    }
    if (Object.values(Direction).indexOf(dir) === -1) {
      console.log(
        "Invalid direction. Valid directions are: NORTH, EAST, SOUTH, WEST."
      );
      return false;
    }
    this.currentDirection = dir;

    this.currentPosition = { x, y };
    return true;
  }

  commandMove(): boolean {
    if (this.isPlaced() === false) {
      console.log(
        "The robot is not yet placed on the table. Please use the PLACE command first."
      );
      return false;
    }
    const newPosition = this.getNewPosition();
    if (!this.isValidPosition(newPosition)) {
      console.log("Invalid Move. The robot will fall from table.");
      return false;
    }

    this.currentPosition = { ...newPosition };
    return true;
  }

  commandDirectionChange(command: CommandDirection): boolean {
    if (this.isPlaced() === false) {
      console.log(
        "The robot is not yet placed on the table. Please use the PLACE command first."
      );
      return false;
    }
    const newDirection = this.getNewDirection(command);
    this.currentDirection = newDirection;

    return true;
  }

  commandLeft() {
    return this.commandDirectionChange(CommandDirection.LEFT);
  }
  commandRight() {
    return this.commandDirectionChange(CommandDirection.RIGHT);
  }

  commandReport() {
    if (this.isPlaced() === false) {
      console.log(
        "The robot is not yet placed on the table. Please use the PLACE command first."
      );
      return false;
    }

    return `${this.currentPosition.x},${this.currentPosition.y},${this.currentDirection}`;
  }
}
