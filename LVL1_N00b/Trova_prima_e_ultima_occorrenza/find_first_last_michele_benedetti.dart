import 'dart:io';

void main(List<String> args) {
  stdout.writeln('Type Number to search');
  final input = stdin.readLineSync();
  stdout.writeln('You typed the number: $input');
  List<int> list = [1, 2, 3, 4, 5, 6, 1];
  int? numToFind = int.tryParse(input!);
  if (numToFind != null) {
    final first = list.indexOf(numToFind);
    final last = list.lastIndexOf(numToFind);
    print('First occurrence index: $first');
    print('Last occurrence index: $last');
  }
}
