import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:message1/bubble.dart';
// ignore: avoid_web_libraries_in_flutter
import 'dart:js' as js;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Intro',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('ja', ''),
      ],
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('メッセージ'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Bubble(
            text: '明日オリエンテーションあるよね？\n自己紹介アプリ作ってるんだけど、\nうまく動かなくて...ちょっと見てくれる？',
          ),
          const SizedBox(height: 32),
          Center(
            child: ElevatedButton(
              onPressed: () {
                js.context.callMethod('viewCode');
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
              ),
              child: const Text(
                'コードを見る',
              ),
            ),
          )
        ],
      ),
    );
  }
}
