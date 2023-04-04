import 'package:calcium_app/provider/editing_command_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class AssignPage extends HookConsumerWidget {
  const AssignPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final nameController = useTextEditingController();
    // TODO: replace to expression editor
    final valueController = useTextEditingController();
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          actions: [
            IconButton(
              icon: const Icon(Icons.done),
              onPressed: () {
                ref.read(editingCommandProvider.notifier).state = [
                  1,
                  [],
                  '=',
                  ['var', nameController.text],
                  valueController.text
                ];
                Navigator.popUntil(context, (route) => route.isFirst);
              },
            ),
          ],
        ),
        body: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: nameController,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: valueController,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
