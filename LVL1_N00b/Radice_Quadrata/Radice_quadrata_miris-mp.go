package main

import "fmt"

func main() {
	el_to_check := 0
	fmt.Println("*** Is it a Perfect Square? ***")
	fmt.Printf("Digit the number you want to check: ")
	fmt.Scanln(&el_to_check)

	i := 0
	is_found := false

	for i < el_to_check && !is_found {
		if i*i == el_to_check {
			fmt.Println("This is a perfect square!")
			fmt.Println("The square root is ", i)
			is_found = true
		}
		i++
	}

}
