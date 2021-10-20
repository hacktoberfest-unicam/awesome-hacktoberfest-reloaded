void main(List<String> args) {
  List<int> list = [1, 2, 2, 3, 3, 4, 5];
  print(
      "first duplicate at index: ${searchIndexDuplicate(list) ?? 'no duplicate found'}");
}

int? searchIndexDuplicate(List<int> list) {
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < (list.length - 1); j++) {
      if (list[i] == list[j] && i != j) {
        return i;
      }
    }
  }
  return null;
}
