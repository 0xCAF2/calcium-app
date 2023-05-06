import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
// ignore: avoid_web_libraries_in_flutter
import 'dart:js' as js;
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ja', ''),
      ],
      home: const MyHomePage(title: '自己紹介アプリ'),
    );
  }
}

class MyHomePage extends HookWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.orange,
          ),
          onPressed: () async {
            js.context.callMethod('launchApp');
            await Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const IntroApp()));
            js.context.callMethod('editCode');
          },
          child: const Text('アプリを起動する'),
        ),
      ),
    );
  }
}

class IntroApp extends HookWidget {
  const IntroApp({super.key});

  @override
  Widget build(BuildContext context) {
    final nameController = useTextEditingController();
    final favoriteController = useTextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: const Text('自己紹介アプリ'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Row(
              children: [
                const Text('　　　名前： '),
                Expanded(
                  child: TextField(
                    controller: nameController,
                  ),
                ),
              ],
            ),
            Row(
              children: [
                const Text('好きなもの： '),
                Expanded(
                  child: TextField(
                    controller: favoriteController,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 80),
            ElevatedButton(
              onPressed: () {
                js.context.callMethod(
                  'send',
                  [nameController.text, favoriteController.text],
                );
              },
              child: const Text('送信する'),
            ),
          ],
        ),
      ),
    );
  }
}
