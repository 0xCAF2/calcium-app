import 'dart:convert';

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

class IntroApp extends StatelessWidget {
  const IntroApp({super.key});

  @override
  Widget build(BuildContext context) {
    final List<List<dynamic>> code =
        jsonDecode(js.context.callMethod('generateCode'));
    var nameCount = 0;
    var favoriteCount = 0;
    final names = <int, String>{};
    final favorites = <int, String>{};

    return Scaffold(
      appBar: AppBar(
        title: const Text('自己紹介アプリ'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: code.map((command) {
              final keyword = command[2] as String;
              switch (keyword) {
                case 'input':
                  final variable = command[3];
                  if (variable != null) {
                    if (variable[1] == 'name') {
                      final index = nameCount++;
                      return _NameInput(
                        onChanged: (value) => names[index] = value,
                      );
                    } else if (variable[1] == 'favorite') {
                      final index = favoriteCount++;
                      return _FavoriteInput(
                        onChanged: (value) => favorites[index] = value,
                      );
                    } else {
                      return const Row(
                        children: [
                          Text('　　　　　： '),
                          Expanded(
                            child: TextField(),
                          ),
                        ],
                      );
                    }
                  } else {
                    return const SizedBox();
                  }
                case 'send':
                  final nameIndex = nameCount - 1;
                  final favoriteIndex = favoriteCount - 1;
                  return Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: ElevatedButton(
                      onPressed: () {
                        final name = names[nameIndex];
                        final favorite = favorites[favoriteIndex];
                        final arg1Variable = command[3]?[1];
                        final arg2Variable = command[4]?[1];
                        final arg1 = arg1Variable == 'name'
                            ? name
                            : arg1Variable == 'favorite'
                                ? favorite
                                : null;
                        final arg2 = arg2Variable == 'name'
                            ? name
                            : arg2Variable == 'favorite'
                                ? favorite
                                : null;
                        js.context.callMethod(
                          'send',
                          [arg1, arg2],
                        );
                      },
                      child: const Text('送信する'),
                    ),
                  );
                default:
                  return const SizedBox();
              }
            }).toList(),
          ),
        ),
      ),
    );
  }
}

class _FavoriteInput extends HookWidget {
  const _FavoriteInput({Key? key, required this.onChanged}) : super(key: key);

  final void Function(String value) onChanged;

  @override
  Widget build(BuildContext context) {
    final favoriteController = useTextEditingController();
    return Row(
      children: [
        const Text('好きなもの： '),
        Expanded(
          child: TextField(
            controller: favoriteController,
            onChanged: onChanged,
          ),
        ),
      ],
    );
  }
}

class _NameInput extends HookWidget {
  const _NameInput({Key? key, required this.onChanged}) : super(key: key);

  final void Function(String value) onChanged;

  @override
  Widget build(BuildContext context) {
    final nameController = useTextEditingController();
    return Row(
      children: [
        const Text('　　　名前： '),
        Expanded(
          child: TextField(
            controller: nameController,
            onChanged: onChanged,
          ),
        ),
      ],
    );
  }
}
