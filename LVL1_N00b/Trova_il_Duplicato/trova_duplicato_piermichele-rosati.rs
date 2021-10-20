fn main(){

        let arr:[i32;10] = [1,2,3,3,4,5,6,7,8,8];
        let mut num = 0;
        let mut found = false;
        let mut i = 0;

        while i < 10 && !found {
                if i != 9 && arr[i]==arr[i+1]{
                        num = arr[i];
                        found = true;
                }
                i+=1;
        }

        if num == 0{
                println!("Duplicate Not found!");
        }
        else{
                println!("Found duplicate number: {}", num);
        }

}
