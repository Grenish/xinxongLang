import fs from 'fs';
import lexer from './src/lexer.js';
import parser from './src/parser.js';
import XinxongInterpreter from './src/interpreter.js';

const filename = 'example-code.xinxong';
const code = fs.readFileSync(filename, 'utf-8');
const tokens = lexer(code);
const ast = parser(tokens);

const interpreter = new XinxongInterpreter();
interpreter.interpret(ast);