// parser.js
import {
  ProgramNode,
  PrintStatementNode,
  VariableDeclarationNode,
  VariableAssignmentNode,
} from "./ast.js";

const parseStatement = (tokens) => {
  // Skip newline characters
  while (tokens[0] === '\r\n') {
    tokens.shift();
  }

  // If there are no more tokens, return null
  if (tokens.length === 0) {
    return null;
  }

  console.log('Tokens before parsing statement:', tokens);
  const statementType = tokens.shift();
  console.log('Statement Type:', statementType);

  switch (statementType) {
    case "say":
      return parsePrintStatement(tokens);
    case "this":
      return parseVariableDeclaration(tokens);
    case "so":
      return parseVariableAssignment(tokens);
    default:
      console.log(`Ignoring unrecognized statement type: ${statementType}`);
      return null;
  }
};



const parsePrintStatement = (tokens) => {
  const expression = tokens.join(" ");
  tokens.length = 0;
  // console.log('Tokens after parsePrintStatement:', tokens);
  return new PrintStatementNode(expression);
};

const parseVariableDeclaration = (tokens) => {
  const variableName = tokens.shift();
  tokens.shift(); // Skip '='
  const value = tokens.shift();
  tokens.shift(); // Skip ';'
  console.log('Tokens after parseVariableDeclaration:', tokens);
  return new VariableDeclarationNode(variableName, value);
};

const parseVariableAssignment = (tokens) => {
  const variableName = tokens.shift();
  tokens.shift(); // Skip '='
  const value = tokens.shift();
  tokens.shift(); // Skip ';'
  console.log('Tokens after parseVariableAssignment:', tokens);
  return new VariableAssignmentNode(variableName, value);
};


const parser = (tokens) => {
  const ast = new ProgramNode([]);

  while (tokens.length > 0) {
    const token = tokens.shift();

    console.log('Current Token:', token);
    
    if (token === "xing.start") {
      const block = { type: "Block", body: [] };
      while (tokens[0] !== "xong.stop") {
        block.body.push(parseStatement(tokens));
      }
      tokens.shift(); // Consume 'xong.stop'
      ast.body.push(block);
    }
  }

  return ast;
};


export default parser;
