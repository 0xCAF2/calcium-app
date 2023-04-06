import 'package:calcium_app/interpreter/behavior.dart';
import 'package:calcium_app/interpreter/command.dart';
import 'package:calcium_app/interpreter/expression.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';

class Assign implements Command {
  final Reference lhs;
  final Expression rhs;

  Assign({required this.lhs, required this.rhs});

  @override
  Behavior execute(RuntimeData data) {
    lhs.assign(rhs.evaluate(data), data);
    return Behavior.forward;
  }
}
