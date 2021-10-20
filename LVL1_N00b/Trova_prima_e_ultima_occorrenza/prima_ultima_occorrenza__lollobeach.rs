fn main() {
    let arr = [1,1,1,1,2,3,3,4,5];
    let mut elem = 0;
    let mut ultimo = 0;
    for mut n in 0..arr.len() {
        if arr[n]==arr[n+1] {
            elem = n;
            while arr[n+2]==arr[n+1] {
                ultimo = n+2;
                n += 1;
            }
            break;
        }
    }
    println!("{}",elem);
    println!("{}",ultimo);
}