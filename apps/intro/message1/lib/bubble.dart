import 'package:flutter/material.dart';
import 'package:message1/triangle.dart';

class Bubble extends StatelessWidget {
  const Bubble({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Row(
        children: [
          SizedBox(
            width: 8,
            height: 12,
            child: CustomPaint(painter: Triangle()),
          ),
          Container(
            padding: const EdgeInsets.all(8),
            margin: const EdgeInsets.only(top: 12),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Colors.green,
            ),
            child: Text(
              text,
              style: const TextStyle(
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
