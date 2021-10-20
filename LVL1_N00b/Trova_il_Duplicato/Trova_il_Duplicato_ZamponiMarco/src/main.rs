fn main() {
    let array: Vec<i32> = vec![1, 2, 2, 3, 4, 5];
    println!("{}", duplicate(array))
}

fn duplicate(vec: Vec<i32>) -> i32 {
    let mut sum: i32 = 0;
    let n: i32 = vec.capacity() as i32 - 1;
    for (_pos, e) in vec.iter().enumerate() {
        sum += e;
    }
    return sum - ((n * (n + 1)) / 2)
}