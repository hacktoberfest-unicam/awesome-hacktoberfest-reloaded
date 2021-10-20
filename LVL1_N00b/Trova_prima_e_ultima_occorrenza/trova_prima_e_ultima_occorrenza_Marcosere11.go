package main
import "fmt"
func main() {
	var a = [5]int{1, 2, 2, 3, 5}
	var primaOccorrenza int
	var ultimaOccorrenza int
	for i := 0; i < len(a); i++ {
		if(i != len(a)-1){
			if(a[i] == a[i+1]){
				primaOccorrenza = i
				ultimaOccorrenza = i+1
			}
		}
	}
	fmt.Println(primaOccorrenza,ultimaOccorrenza)
}