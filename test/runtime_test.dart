import 'package:calcium_app/interpreter/exceptions.dart';
import 'package:calcium_app/interpreter/pseudo/parser_impl.dart';
import 'package:calcium_app/interpreter/runtime_engine.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('RuntimeEngine constructors', () {
    final statement = [
      1,
      [],
      '=',
      ['var', 'message'],
      'Hello, World.'
    ];
    expect(
      () => RuntimeEngine.fromJson(
        statement, // invalid statements
        parser: ParserImpl(),
      ),
      throwsA(const TypeMatcher<InvalidCodeException>()),
    );
    expect(
      () => RuntimeEngine.fromJson(
        [statement], // valid
        parser: ParserImpl(),
      ),
      returnsNormally,
    );
  });
  test('Assign and Print', () async {
    final statements = [
      [
        1,
        [],
        '=',
        ['var', 'message'],
        'Hello, World.'
      ],
      [
        1,
        [],
        'print',
        ['var', 'message']
      ],
    ];
    final runtime = RuntimeEngine.fromJson(
      statements,
      parser: ParserImpl(),
    );
    await runtime.step();
    await runtime.step();
  });
}
