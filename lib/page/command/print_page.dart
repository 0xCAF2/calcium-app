import 'package:calcium_app/provider/editing_command_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class PrintPage extends HookConsumerWidget {
  const PrintPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final valueController = useTextEditingController();
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const BackButtonIcon(),
            onPressed: () {
              Navigator.pop(context, ['var', valueController.text]);
            },
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.done),
              onPressed: () {
                ref.read(editingCommandProvider.notifier).state = [
                  1,
                  [],
                  'print',
                  ['var', valueController.text],
                ];
                Navigator.popUntil(context, (route) => route.isFirst);
              },
            ),
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            controller: valueController,
          ),
        ),
      ),
    );
  }
}
