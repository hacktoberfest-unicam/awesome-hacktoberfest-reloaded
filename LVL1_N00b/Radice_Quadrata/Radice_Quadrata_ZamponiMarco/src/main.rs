fn main() {
    println!("{}", sqrt(16));
    println!("{}", sqrt(5));
}

// Given an integer number return the square root if it is a perfect square
// otherwise it returns -1
fn sqrt(x: i32) -> i32 {
    for num in 1..x {
        if num * num == x {
            return num
        }
    }
    return -1
}