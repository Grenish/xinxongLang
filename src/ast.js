// ast.js
class ProgramNode {
  constructor(body) {
    this.body = body;
  }
}

class StatementNode {}

class PrintStatementNode extends StatementNode {
  constructor(expression) {
    super();
    this.expression = expression;
  }
}

class VariableDeclarationNode extends StatementNode {
  constructor(variableName, value) {
    super();
    this.variableName = variableName;
    this.value = value;
  }
}

class VariableAssignmentNode extends StatementNode {
  constructor(variableName, value) {
    super();
    this.variableName = variableName;
    this.value = value;
  }
}

export {
  ProgramNode,
  StatementNode,
  PrintStatementNode,
  VariableDeclarationNode,
  VariableAssignmentNode,
};
