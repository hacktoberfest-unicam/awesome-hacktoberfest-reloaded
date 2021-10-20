fn main() {
    let num = 4;
    let mut i = 1;
    let mut root = 0;
    let mut check = false;
    while i < num {
     if (i*i) == num {
         check = true;
         root = i;
     }
     i = i+1;
    }
    if check == true {
        println!("il numero è un quadrato perfetto di {}" , root);
    }
    else {
      println!("il numero non è un quadrato perfetto");
   }
}
