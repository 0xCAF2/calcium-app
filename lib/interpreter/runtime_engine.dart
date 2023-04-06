import 'package:calcium_app/interpreter/behavior.dart';
import 'package:calcium_app/interpreter/exceptions.dart';
import 'package:calcium_app/interpreter/parser.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';
import 'package:calcium_app/interpreter/runtime_status.dart';
import 'package:calcium_app/interpreter/statement.dart';

class RuntimeEngine {
  final RuntimeData data;
  final Parser parser;

  RuntimeEngine({required this.data, required this.parser});

  factory RuntimeEngine.fromJson(dynamic json, {required Parser parser}) {
    final RuntimeData data;
    if (json is List<Statement>) {
      data = RuntimeData(json);
    } else {
      throw InvalidCodeException();
    }
    return RuntimeEngine(data: data, parser: parser);
  }

  Future<RuntimeStatus> step() async {
    final cmd = parser.readStatement(currentLine);
    final result = cmd.execute(data);

    if (result == Behavior.forward) {
      data.address.step(1);
      return RuntimeStatus.running;
    }
    if (currentIndex == lastIndex) {
      return RuntimeStatus.terminated;
    }
    return RuntimeStatus.unhandledException;
  }

  int get currentIndent => data.address.indent;

  int get currentIndex => data.address.index;

  Statement get currentLine => data.code[data.address.index];

  int get lastIndex => data.code.length - 1;
}
