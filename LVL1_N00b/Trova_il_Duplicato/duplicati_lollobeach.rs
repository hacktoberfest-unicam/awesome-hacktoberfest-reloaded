fn main() {
    let arr = [1,1,2,3,3,4,5];
    let mut elem = 0;
    for n in 0..arr.len() {
        let i = n+1;
        if arr[n]==arr[i] {
            elem = i;
            break;
        }
    }
    println!("{}",elem);
}