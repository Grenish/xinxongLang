const parser = (tokens) => {
  const ast = { type: "Program", body: [] };

  while (tokens.length > 0) {
    const token = tokens.shift();

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

const parseStatement = (tokens) => {
  const statement = { type: "Statement", body: [] };

  while (tokens[0] !== "xong.stop" && tokens.length > 0) {
    const token = tokens.shift();
    statement.body.push(token);
  }

  return statement;
};

export default parser;
