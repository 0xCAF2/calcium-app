import 'package:calcium_app/interpreter/exceptions.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';
import 'package:calcium_app/interpreter/statement.dart';

class RuntimeEngine {
  final RuntimeData data;

  RuntimeEngine(this.data);

  factory RuntimeEngine.fromJson(dynamic json) {
    final RuntimeData data;
    if (json is List<Statement>) {
      data = RuntimeData(json);
    } else {
      throw InvalidCodeException();
    }
    return RuntimeEngine(data);
  }
}
