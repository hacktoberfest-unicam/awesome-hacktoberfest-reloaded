package main

import "fmt"

func main() {
	var array_to_order = []int{1, 3, 2, 5, 10, 10, 7}

	for i := 0; i < len(array_to_order); i++ {
		var j = i
		for j >= 1 && array_to_order[j] < array_to_order[j-1] {
			array_to_order[j], array_to_order[j-1] = array_to_order[j-1], array_to_order[j]

			j--
		}

		i++
	}

	fmt.Println("The  ordered array is: ", array_to_order)

}
