import 'package:calcium_app/interpreter/exceptions.dart';
import 'package:calcium_app/interpreter/types.dart';

class Namespace {
  final _map = <String, Any>{};

  Any lookUp(String key) {
    final value = _map[key];
    if (value == null) {
      throw NameNotFoundException();
    }
    return value;
  }

  void register(String key, Any value) {
    _map[key] = value;
  }
}
