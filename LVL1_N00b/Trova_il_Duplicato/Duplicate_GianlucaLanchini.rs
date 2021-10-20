fn FindDuplicate(arr: &[i32]){
    let mut i = 0;
    let mut sost = 0;
    while i < (arr.len()) {
        if sost == arr[i] {
            println!("The First duplicated element is: {}", arr[i]);
            println!("It is found at the index: {}", i);
        }
        sost = arr[i];
        i = i + 1;
    }
}

fn main() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 7];
    FindDuplicate(&arr);
}
