import 'dart:io';

void main() {
  stdout.writeln('Insert num');
  final input = stdin.readLineSync();
  stdout.writeln('You typed: $input');
  int? num = int.tryParse(input!);
  if (num != null) {
    for (var i = 0;; i++) {
      if ((i * i) > num) {
        print('Non é un quadrato perfetto');
        break;
      }
      if (i * i == num) {
        print('quadrato prefetto\n$i');
        break;
      }
    }
  }
}
