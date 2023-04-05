import 'package:calcium_app/interpreter/command.dart';
import 'package:calcium_app/interpreter/expression.dart';
import 'package:calcium_app/interpreter/statement.dart';

abstract class Parser {
  Expression readExpression(dynamic expr);
  Reference readReference(dynamic ref);
  Command readStatement(Statement stmt);
}
