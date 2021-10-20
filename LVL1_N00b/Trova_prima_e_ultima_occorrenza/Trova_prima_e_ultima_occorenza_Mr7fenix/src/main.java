import java.util.Scanner;

public class main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] numeri = new int[]{1,2,2,3,5,6,78,80,80,80,900};
        System.out.print("Dimmi cdi quale numero vuoi sapere la prima e l'ultima occorrenza: ");
        int n = scanner.nextInt();

        int i;
        for (i = 0; i < numeri.length; i++){
            if(numeri[i] == n){
                System.out.println("La prima occorenza è alla posizione: " + i);
                break;
            }
        }
        int ultimoNumeroTrovato = 0;
        for (int k = i; k < numeri.length; k++){
            if(numeri[k] == numeri[i]){
                ultimoNumeroTrovato = k;
            }
        }

        if(ultimoNumeroTrovato == 0){
            System.out.print("Il tuo numero non è duplicato");

        }else System.out.print("l'ultima ricorrenza del numero è alla posizione: " + ultimoNumeroTrovato);


    }
}
