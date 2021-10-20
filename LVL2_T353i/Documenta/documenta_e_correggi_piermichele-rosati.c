#include <stdio.h>

int main(){
    /*int arr[] = {1, 2, 3, 4, 5, 6 ,};	// Errore nell' inizializzazione dell' array dichiarato: , di troppo
    printf("Inserisci un indice: \n");
    int numero;
    scanf("%d");						// Input di un intero senza specificare l' indirizzo della variabile da stampare
    printf(&arr[numero]);*/				// Stampa del puntatore della cella dell' array all' indice numero senza specificare la formattazione dell' intero
    
    // Codice corretto
    int arr[] = {1,2,3,4,5,6};
    printf("Inserisci un indice: \n");
    int numero;
    do{
    	scanf("%d",&numero);
	}while(numero < 0 || numero > 5);
    printf("0x%x",&arr[numero]);
}
