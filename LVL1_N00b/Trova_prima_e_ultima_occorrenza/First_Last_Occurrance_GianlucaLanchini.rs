fn first_last_occ(arr: &[i32], num: i32){
    let mut i = 0;
    let mut check = true;
    while i < (arr.len()) && check {
        if num == arr[i] {
            println!("The first occurrance of the element is at index: {}", i);
            if i != (arr.len() - 1) {
                if num == arr[i+1] {
                    while num == arr[i] && i != (arr.len() - 1) {
                    i = i + 1;
                }
                if i == (arr.len() - 1) {
                    println!("The last occurrance of the element is at index: {}", i);
                }
                else {
                    println!("The last occurrance of the element is at index: {}", (i - 1));
                }
            }
            else {
                println!("The last occurrance of the element is at index: {}", (i));
            }
            }
            else {
                println!("The last occurrance of the element is at index: {}", (i));
            }
            check = false;
        }
        i = i + 1;
    }
    if check == true {
        println!("The element is absent from the array");
    }
}

fn main() {
    let num = 5;
    let arr = [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 5, 5, 5];
    first_last_occ(&arr, num);
}
