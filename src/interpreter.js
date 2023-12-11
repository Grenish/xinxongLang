import { PrintStatementNode } from "./ast.js";

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
    } else if (!isNaN(parseFloat(head))) {
      return parseFloat(head);
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
    const [keyword, ...rest] = statement.body;

    if (keyword === "say") {
      if (rest[0] instanceof PrintStatementNode) {
        const expression = this.evaluateExpression(rest[0].expression);
        console.log(expression);
      } else {
        const expression = rest.join(" ");
        console.log(expression);
      }
    } else if (keyword === "this" || keyword === "so") {
      const [_, varName, __, ...expr] = rest;
      const value = this.evaluateExpression(expr);
      this.variables[varName] = value;
    } else if (keyword === "try") {
      const condition = this.evaluateExpression(rest.slice(1, -1));
      if (condition === true && statement.body.length >= 2) {
        this.executeBlock(statement.body[1]);
      }
    } else if (keyword === "tryagain") {
      const condition = this.evaluateExpression(rest.slice(1, -1));
      if (condition === true && statement.body.length >= 2) {
        this.executeBlock(statement.body[1]);
        return true; // Signal to skip subsequent tryagain blocks
      }
    } else if (keyword === "nvm" && statement.body.length >= 1) {
      this.executeBlock(statement.body[0]);
    } else if (keyword === "well" && statement.body.length >= 2) {
      const loopCondition = this.evaluateExpression(rest.slice(1, -1));

      while (loopCondition === true) {
        this.executeBlock(statement.body[1]);

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
    // console.log('Interpreting AST:', ast);
    try {
      for (const block of ast.body) {
        this.executeBlock(block.body);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

export default XinxongInterpreter;
