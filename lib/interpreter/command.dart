import 'package:calcium_app/interpreter/behavior.dart';
import 'package:calcium_app/interpreter/runtime_data.dart';

abstract class Command {
  Behavior execute(RuntimeData data);
}
