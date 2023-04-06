import 'package:calcium_app/interpreter/runtime_data.dart';
import 'package:calcium_app/interpreter/types.dart';

abstract class Expression {
  Any evaluate(RuntimeData data);
}

abstract class Reference extends Expression {
  void assign(Any value, RuntimeData data);
}
