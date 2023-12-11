const lexer = (code) => {
  let tokens = [];
  let currentToken = "";
  let isString = false;

  for (let char of code) {
    if (char === " " && !isString) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
    } else if (char === '"') {
      if (isString) {
        currentToken += char;
        tokens.push(currentToken);
        currentToken = "";
      } else {
        currentToken += char;
      }
      isString = !isString;
    } else {
      currentToken += char;
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  // console.log("Inside Lexer:", tokens);
  return tokens;
};

export default lexer;
