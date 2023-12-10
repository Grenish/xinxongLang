const lexer = (input) => {
  return input
    .split(/\s+/) // Split on whitespace
    .filter((token) => token.length > 0);
};

export default lexer;
