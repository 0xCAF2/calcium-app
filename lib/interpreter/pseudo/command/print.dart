import 'package:calcium_app/interpreter/behavior.dart';
import 'package:calcium_app/interpreter/command.dart';
import 'package:calcium_app/interpreter/expression.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';

class Print implements Command {
  final List<Expression> args;

  Print(this.args);

  @override
  Behavior execute(RuntimeData data) {
    print(args.map((a) => a.evaluate(data).value).join(' '));
    return Behavior.forward;
  }
}
