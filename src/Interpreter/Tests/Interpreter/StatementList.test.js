import Interpreter from "../../Intepreter";
import Lexer from "../../Lexer";
import Parser from "../../Parser";

describe("statement list", () => {
   describe("small step", () => {
      test("runs statement when recieving non-empty state", () => {
         let lexer = new Lexer("z := x + y");
         let parser = new Parser(lexer);
         let interpreter = new Interpreter(parser, true, {x : 10, y: 1});
         let output = interpreter.interpret();

         expect(output[0].scope).toEqual({x: 10, y: 1, z: 11});
      });

      test('runs multiple statements', () => {
          let lexer = new Lexer("x := 5; y := 2 * x; z := 3 * y");
          let parser = new Parser(lexer);
          let interpreter = new Interpreter(parser, true, {});
          let output = interpreter.interpret();

          expect(output[output.length - 1].scope).toEqual({x : 5, y: 10, z : 30});
      });

      test("runs statement consisting of new line characters", () => {
         let lexer = new Lexer("x := 1;\ny := 2;\nz := 3");
         let parser = new Parser(lexer);
         let interpreter = new Interpreter(parser, true, {});
         let output = interpreter.interpret();

         expect(output[output.length - 1].scope).toEqual({x: 1, y: 2, z: 3});
      });
   });

   describe("big step", () => {
       test("runs statement when recieving non-empty state", () => {
           let lexer = new Lexer("z := x + y");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, false, {x : 10, y: 1});
           let output = interpreter.interpret();

           expect(output).toEqual({x: 10, y: 1, z: 11});
       });

       test('runs multiple statements', () => {
           let lexer = new Lexer("x := 5; y := 2 * x; z := 3 * y");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, false, {});
           let output = interpreter.interpret();

           expect(output).toEqual({x : 5, y: 10, z : 30});
       });

       test("runs statement consisting of new line characters", () => {
           let lexer = new Lexer("x := 1;\ny := 2;\nz := 3");
           let parser = new Parser(lexer);
           let interpreter = new Interpreter(parser, false, {});
           let output = interpreter.interpret();

           expect(output).toEqual({x: 1, y: 2, z: 3});
       });
   });

   describe("equality", () => {
        test("returns the same answers for division program", () => {
            let smallStepLexer = new Lexer("r := x; d := 0; while (y <= r) do (d := d + 1; r := r - y)");
            let bigStepLexer = new Lexer("r := x; d := 0; while (y <= r) do (d := d + 1; r := r - y)");

            let smallStepParser = new Parser(smallStepLexer);
            let bigStepParser = new Parser(bigStepLexer);

            let smallStepInterpreter = new Interpreter(smallStepParser, true, {x : 10, y: 3});
            let smallStepOutput = smallStepInterpreter.interpret();

            let bigStepInterpreter = new Interpreter(bigStepParser, false, {x : 10, y: 3});
            let bigStepOutput = bigStepInterpreter.interpret();

            expect(smallStepOutput[smallStepOutput.length - 1].scope).toEqual(bigStepOutput);
        });

        test("returns the same answers for the fibonacci program", () => {
            let smallStepLexer = new Lexer("y := 1; x := 0; while (x > 0) do (t := z; z := y; y := t + y; x := x - 1)");
            let bigStepLexer = new Lexer("y := 1; x := 0; while (x > 0) do (t := z; z := y; y := t + y; x := x - 1)");

            let smallStepParser = new Parser(smallStepLexer);
            let bigStepParser = new Parser(bigStepLexer);

            let smallStepInterpreter = new Interpreter(smallStepParser, true, {x : 5});
            let smallStepOutput = smallStepInterpreter.interpret();

            let bigStepInterpreter = new Interpreter(bigStepParser, false, {x : 5});
            let bigStepOutput = bigStepInterpreter.interpret();

            expect(smallStepOutput[smallStepOutput.length - 1].scope).toEqual(bigStepOutput);
        });
   });
});