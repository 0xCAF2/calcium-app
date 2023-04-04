import 'dart:convert';

import 'package:calcium_app/page/select_command_page.dart';
import 'package:calcium_app/provider/editing_command_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class EditorPage extends StatefulHookConsumerWidget {
  const EditorPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _EditorPageState();
}

class _EditorPageState extends ConsumerState<EditorPage> {
  final _keys = <int, GlobalKey>{};
  var _heightList = <double>[];
  var _highlightIndex = -1;
  final _statements = <String>[];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _updateHeightList();
    });
  }

  void _updateHeightList() {
    final list = <double>[];
    for (var i in _keys.keys) {
      final box = _keys[i]!.currentContext!.findRenderObject() as RenderBox;
      final height = box.size.height;
      list.add(height);
    }
    setState(() {
      _heightList = list;
    });
  }

  @override
  Widget build(BuildContext context) {
    final scrollController = useScrollController();
    final didAddListener = useState(false);
    if (!didAddListener.value) {
      scrollController.addListener(() {
        final offset = scrollController.offset;
        if (offset < 0) {
          setState(() {
            _highlightIndex = -1;
          });
          return;
        }
        var currentHeight = 0.0;
        var i = -1;
        for (var height in _heightList) {
          if (offset >= currentHeight && offset < currentHeight + height) {
            break;
          }
          ++i;
          currentHeight += height;
        }
        setState(() {
          _highlightIndex = i;
        });
      });
      didAddListener.value = true;
    }
    _keys.clear();
    return SafeArea(
      child: Scaffold(
        body: LayoutBuilder(
          builder: (context, constraints) {
            final offsetHeight = constraints.maxHeight / 2;
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.max,
              children: [
                Flexible(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const Icon(Icons.arrow_right),
                      Expanded(
                        child: SingleChildScrollView(
                          controller: scrollController,
                          child: Column(
                            children: [
                              SizedBox(height: offsetHeight),
                              LayoutBuilder(
                                builder: (context, constraints) {
                                  final key = GlobalKey();
                                  _keys[-1] = key;
                                  return Container(
                                    key: key,
                                    width: constraints.maxWidth,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                        color: _highlightIndex == -1
                                            ? Colors.red
                                            : Colors.transparent,
                                      ),
                                    ),
                                    child: const Text('＜プログラムの始まり＞'),
                                  );
                                },
                              ),
                              for (var i = 0; i < _statements.length; ++i)
                                LayoutBuilder(builder: (context, constraints) {
                                  final key = GlobalKey();
                                  final widget = Container(
                                    key: key,
                                    width: constraints.maxWidth,
                                    height: 160.0 + i,
                                    decoration: BoxDecoration(
                                      color: i % 2 == 0
                                          ? Colors.blue
                                          : Colors.green,
                                      border: Border.all(
                                        color: _highlightIndex == i
                                            ? Colors.red
                                            : Colors.transparent,
                                      ),
                                    ),
                                    child: Text(_statements[i]),
                                  );
                                  _keys[i] = key;
                                  return widget;
                                }),
                              LayoutBuilder(
                                builder: (context, constraints) {
                                  final key = GlobalKey();
                                  _keys[_statements.length] = key;
                                  return Container(
                                    key: key,
                                    width: constraints.maxWidth,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                        color: _highlightIndex >=
                                                _statements.length
                                            ? Colors.red
                                            : Colors.transparent,
                                      ),
                                    ),
                                    child: const Text('＜プログラムの終わり＞'),
                                  );
                                },
                              ),
                              SizedBox(height: offsetHeight),
                            ],
                          ),
                        ),
                      ),
                      const Icon(Icons.arrow_left),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
        appBar: AppBar(
          actions: [
            const Spacer(),
            IconButton(
              onPressed: () async {
                await showModalBottomSheet(
                  context: context,
                  isScrollControlled: true,
                  useSafeArea: true,
                  builder: (context) => const SelectCommandPage(),
                );

                ref.read(editingCommandProvider.notifier).update((state) {
                  if (state != null) {
                    final statement = jsonEncode(state);
                    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
                      _updateHeightList();
                    });
                    if (_highlightIndex == -1) {
                      setState(() {
                        _statements.insert(0, statement);
                      });
                      return;
                    } else if (_highlightIndex >= _statements.length ||
                        _highlightIndex == _statements.length - 1) {
                      setState(() {
                        _statements.add(statement);
                        ++_highlightIndex;
                      });
                      return;
                    } else if (_highlightIndex < _statements.length) {
                      setState(() {
                        _statements.insert(_highlightIndex + 1, statement);
                      });
                    }
                    return null;
                  }
                  return null;
                });
              },
              icon: const Icon(Icons.add),
            ),
            const Spacer(),
            IconButton(
              onPressed:
                  _highlightIndex == -1 || _highlightIndex >= _statements.length
                      ? null
                      : () {
                          setState(() {
                            _statements.removeAt(_highlightIndex);
                          });
                        },
              icon: const Icon(Icons.delete),
            ),
            const Spacer(),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: const Icon(Icons.play_arrow),
        ),
      ),
    );
  }
}
