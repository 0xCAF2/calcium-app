import 'package:calcium_app/page/command/assign_page.dart';
import 'package:calcium_app/page/command/print_page.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class SelectCommandPage extends HookConsumerWidget {
  const SelectCommandPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.close),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        body: ListView(
          children: [
            ExpansionTile(
              title: const Text('基本'),
              children: [
                ListTile(
                  title: const Text('変数へ代入'),
                  subtitle: const Text('data = 7'),
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const AssignPage(),
                      ),
                    );
                  },
                ),
              ],
            ),
            ExpansionTile(
              title: const Text('関数'),
              children: [
                ListTile(
                  title: const Text('表示する'),
                  onTap: () async {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const PrintPage(),
                      ),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
