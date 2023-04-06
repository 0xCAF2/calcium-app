import 'package:calcium_app/interpreter/expression.dart';
import 'package:calcium_app/interpreter/pseudo/command/assign.dart';
import 'package:calcium_app/interpreter/pseudo/command/print.dart';
import 'package:calcium_app/interpreter/pseudo/expression/variable.dart';
import 'package:calcium_app/interpreter/types.dart';

import 'indexes.dart' as idx;
import 'keywords.dart' as kwd;
import 'package:calcium_app/interpreter/command.dart';
import 'package:calcium_app/interpreter/parser.dart' as cal;
import 'package:calcium_app/interpreter/statement.dart';

class ParserImpl extends cal.Parser {
  @override
  Expression readExpression(expr) {
    if (expr is List) {
      if (expr.isNotEmpty) {
        if (expr[0] is List) {
          // array literals
          throw UnimplementedError();
        } else if (expr[0] is String) {
          final keyword = expr[0];
          if (keyword == kwd.Reference.variable) {
            return readReference(expr);
          }
        }
      }
    } else if (expr is String) {
      return Str(expr);
    }
    throw UnimplementedError();
  }

  @override
  Reference readReference(ref) {
    if (ref is List) {
      if (ref.isNotEmpty && ref[0] == kwd.Reference.variable) {
        return Variable(ref[1]);
      }
    }
    throw UnimplementedError();
  }

  @override
  Command readStatement(Statement stmt) {
    final keyword = stmt[idx.Statement.command];
    if (keyword == kwd.Command.assign) {
      return Assign(
        lhs: readReference(stmt[idx.Assign.lhs]),
        rhs: readExpression(stmt[idx.Assign.rhs]),
      );
    } else if (keyword == kwd.Command.print) {
      final args = stmt
          .sublist(idx.Print.argsStart)
          .map((a) => readExpression(a))
          .toList();
      return Print(args);
    }
    throw UnimplementedError();
  }
}
