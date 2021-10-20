package main
import "fmt"
func main() {
	var a = [5]int{1, 2, 2, 3, 5}
	var numero int
	for i := 0; i < len(a); i++ {
		if(i != len(a)-1){
			if(a[i] == a[i+1]){
				numero = i
			}
		}
	}
	fmt.Println(numero)
}
