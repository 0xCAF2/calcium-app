import 'package:calcium_app/interpreter/expression.dart';
import 'package:calcium_app/interpreter/types.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';

class Variable extends Reference {
  final String name;

  Variable(this.name);

  @override
  void assign(Any value, RuntimeData data) {
    data.context.register(name, value);
  }

  @override
  Any evaluate(RuntimeData data) {
    return data.context.lookUp(name);
  }
}
