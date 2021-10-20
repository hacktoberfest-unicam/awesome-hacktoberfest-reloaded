fn main() {
    let array = [1,2,2,3,4,5,6];
    find_duplicate(&array);
}

fn find_duplicate(slice: &[i32]){
    for n in 0..slice.len() {
        if n!=slice.len() && slice[n] == slice[n+1]{
            println!("{}",n+1);
        }
    }
}
