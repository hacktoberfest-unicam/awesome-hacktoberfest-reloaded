package main

import (
	"fmt"
)

// order elements array
func order_el(array_to_order []int) []int {
	for i := 0; i < len(array_to_order); i++ {
		var j = i
		for j >= 1 && array_to_order[j] < array_to_order[j-1] {
			array_to_order[j], array_to_order[j-1] = array_to_order[j-1], array_to_order[j]

			j--
		}

		i++
	}

	return array_to_order
}

func main() {
	var array_to_parse = []int{1, 3, 2, 5, 7, 7}

	var ordered_array = order_el(array_to_parse)

	fmt.Println("The ordered array is ", ordered_array)
	var is_duplicate bool = false
	i := 0
	// check duplicate
	for i < len(ordered_array)-1 && !is_duplicate {

		if ordered_array[i] == ordered_array[i+1] {
			fmt.Println("A duplicate occour in the element with address: ", i+1)
			is_duplicate = true
		}
		i++
	}
}
