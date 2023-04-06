import 'package:calcium_app/interpreter/address.dart';
import 'package:calcium_app/interpreter/namespace.dart';
import 'package:calcium_app/interpreter/statement.dart';

class RuntimeData {
  var address = Address(1, 0);
  final List<Statement> code;
  final context = Namespace();

  RuntimeData(this.code);
}
