import Parser from "../../Parser";
import Lexer from "../../Lexer";
import Interpreter from "../../Intepreter";

describe("aExp expressions", () => {
   describe("plus" , () => {
      test("runs plus expression with positive integers", () => {
          let lexer = new Lexer("x := 1 + 1");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(2);
      });

      test("runs plus expression with negative integers", () => {
          let lexer = new Lexer("x := -1 + -1");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(0);
      });

      test("runs plus expression consisting of variables", () => {
          let lexer = new Lexer("x := first + second");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser, false, {first: 1, second: 1});
          let output = interpreter.interpret();

          expect(output.x).toBe(2);
      });

      test("runs plus expression without whitespace", () => {
          let lexer = new Lexer("x := 1+1");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(2);
      });
   });

   describe("minus", () => {
      test("runs minus expression for positive numbers", () => {
          let lexer = new Lexer("x := 1 - 1");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(0);
      });

      test("runs minus expression for negative numbers", () => {
          let lexer = new Lexer("x := -1 - -1");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(0);
      });

      test("runs minus expression consisting of variables", () => {
          let lexer = new Lexer("x := first - second");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser, false, {first: 1, second: 1});
          let output = interpreter.interpret();

          expect(output.x).toBe(0);
      });

      test("runs minus expression without whitespace", () => {
          let lexer = new Lexer("x := 1-1");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(0);
      });
   });

   describe("multiplication", () => {
      test("runs multiplication expression for positive numbers", () => {
          let lexer = new Lexer("x := 2 * 2");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(4);
      });

      test("runs multiplication expression for negative numbers", () => {
          let lexer = new Lexer("x := -2 * -2");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(4);
      });

      test("runs multiplication expression consisting of variables", () => {
          let lexer = new Lexer("x := first * second");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser, false, {first: 2, second: 2});
          let output = interpreter.interpret();

          expect(output.x).toBe(4);
      });

      test("runs multiplication expression without whitespace", () => {
          let lexer = new Lexer("x := 2*2");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser);
          let output = interpreter.interpret();

          expect(output.x).toBe(4);
      })
   });
});