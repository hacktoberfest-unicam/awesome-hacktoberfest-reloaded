void main() {
  List<int> list = [10, 1, 2, 9, 3, 4, 7, 8, 3, 2, 6, 5];
  selectionSort(list);
  print(list);
}

void selectionSort(List<int> list) {
  var length = list.length;
  for (var i = 0; i < length - 1; i++) {
    var min_index = i;
    for (var j = i + 1; j < length; j++) {
      if (list[j] < list[min_index]) {
        min_index = j;
      }
    }
    if (min_index != i) {
      var temp = list[i];
      list[i] = list[min_index];
      list[min_index] = temp;
    }
  }
}
