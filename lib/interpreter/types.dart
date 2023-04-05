import 'package:calcium_app/interpreter/expression.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';

abstract class Any<T> implements Expression {
  T get value;
}

class Str extends Any<String> {
  @override
  final String value;

  Str(this.value);

  @override
  Str evaluate(RuntimeData data) => this;
}

class Int extends Any<int> {
  @override
  final int value;

  Int(this.value);

  @override
  Int evaluate(RuntimeData data) => this;
}
