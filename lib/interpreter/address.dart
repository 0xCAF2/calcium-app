class Address {
  int indent;
  int index;
  int calls;
  String fileName;

  Address(
    this.indent,
    this.index, {
    this.calls = 0,
    this.fileName = 'main',
  });

  void step(int delta) => index += delta;
}
