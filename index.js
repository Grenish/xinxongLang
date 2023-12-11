import fs from 'fs';
import lexer from './src/lexer.js';
import parse from './src/parser.js';
import XinxongInterpreter from './src/interpreter.js';

const filename = 'example-code.xinxong';
const code = fs.readFileSync(filename, 'utf-8');
const tokens = lexer(code);
// console.log('Tokens before parsing:', tokens);
const ast = parse(tokens);

const interpreter = new XinxongInterpreter();
interpreter.interpret(ast);


// console.log('Tokens:', tokens);
// console.log('AST:', ast);
// console.log(interpreter);