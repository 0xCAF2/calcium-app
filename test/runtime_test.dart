import 'package:calcium_app/interpreter/exceptions.dart';
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
    // invalid statements
    expect(
      () => RuntimeEngine.fromJson(statement),
      throwsA(const TypeMatcher<InvalidCodeException>()),
    );
    // valid
    expect(
      () => RuntimeEngine.fromJson([statement]),
      returnsNormally,
    );
  });
}
