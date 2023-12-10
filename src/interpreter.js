// interpreter.js
class XinxongInterpreter {
  constructor() {
    this.variables = {};
  }

  evaluateExpression(expr) {
    const [head, ...rest] = expr;

    if (head === "this") {
      const [_, varName] = rest;
      if (this.variables.hasOwnProperty(varName)) {
        return this.variables[varName];
      } else {
        throw new Error(`Variable ${varName} not defined.`);
      }
    } else if (head === "noXing") {
      return null;
    } else if (head === "itsZing") {
      return true;
    } else if (head === "notZing") {
      return false;
    } else if (!isNaN(head)) {
      return Number(head);
    } else if (head === "+" || head === "-" || head === "*" || head === "/") {
      return (
        this.evaluateExpression(rest[0]) +
        head +
        this.evaluateExpression(rest[1])
      );
    } else {
      throw new Error(`Unexpected expression: ${expr}`);
    }
  }

  executeStatement(statement) {
    const [keyword, ...rest] = statement;

    if (keyword === "say") {
      console.log(rest.join(" "));
    } else if (keyword === "this") {
      const [_, varName, __, ...expr] = rest;
      const value = this.evaluateExpression(expr);
      this.variables[varName] = value;
    } else if (keyword === "so") {
      const [_, varName, __, ...expr] = rest;
      const value = this.evaluateExpression(expr);
      this.variables[varName] = value;
    } else if (keyword === "try") {
      const condition = this.evaluateExpression(rest.slice(1, -1));
      if (condition === true) {
        this.executeBlock(rest.slice(-1)[0]);
      }
    } else if (keyword === "tryagain") {
      const condition = this.evaluateExpression(rest.slice(1, -1));
      if (condition === true) {
        this.executeBlock(rest.slice(-1)[0]);
        return true; // Signal to skip subsequent tryagain blocks
      }
    } else if (keyword === "nvm") {
      this.executeBlock(rest[0]);
    } else if (keyword === "well") {
      const loopCondition = this.evaluateExpression(rest.slice(1, -1));
      while (loopCondition === true) {
        this.executeBlock(rest.slice(-1)[0]);
        if (this.variables["try.end"]) {
          delete this.variables["try.end"];
          break;
        }
      }
    }
  }

  executeBlock(block) {
    for (const statement of block) {
      const skipNextTryagain = this.executeStatement(statement);
      if (skipNextTryagain) {
        break;
      }
    }
  }

  interpret(ast) {
    try {
      for (const block of ast) {
        this.executeBlock(block);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

export default XinxongInterpreter;
