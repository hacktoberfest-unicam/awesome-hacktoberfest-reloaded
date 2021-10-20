/*
3. Trova Prima e Ultima Occorrenza
Usando un linguaggio a tua scelta della lista dei linguaggi in Whitelist,
 realizza un programma che trovi l'indirizzo della prima e dell'ultima occorrenza
 di un numero in un array ordinato contenente valori interi.
*/
package main

import "fmt"

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

	// test array
	var array = []int{3, 4, 5, 7, 7, 8, 7}

	// save length array
	var length int = len(array)

	var element_to_find int

	fmt.Printf("Write the element you want to search for: ")
	// save the el that the user wants
	fmt.Scanln(&element_to_find)

	// call function to order elements
	var ordered_array = order_el(array)

	first_occurrence, second_occurrence := -1, -1
	is_first := true

	for i := 0; i < length; i++ {
		// check if i el is the one we are searching
		if ordered_array[i] == element_to_find {
			if is_first {
				first_occurrence = i
				is_first = false
			} else {

				second_occurrence = i
			}
		}
	}
	if first_occurrence == -1 || second_occurrence == -1 {
		fmt.Println("The number doesn't happear 2 times")
	} else {
		fmt.Println("The first occurrence is in position ", first_occurrence)
		fmt.Println("The second occurrence is in position ", second_occurrence)

	}
}
