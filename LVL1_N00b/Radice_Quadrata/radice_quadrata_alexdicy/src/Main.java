import java.util.Scanner;

/**
 * <a href="https://www.youmath.it/domande-a-risposte/view/6168-quadrato-perfetto.html">YouMath: Quadrato perfetto</a>
 *
 * @author Lorenzo Lapucci
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.print("Inserisci un quadrato perfetto: ");
            int number = sc.nextInt();

            int[] factors = new int[number];
            int factorsIndex = 0;

            // quante volte è presente il fattore
            int counter = 0;
            int prime = nextPrime(1);
            // finché è possibile dividere
            while (prime <= number) {
                // se il numero primo divide il numero
                if ((double) number / prime % 1 == 0) {
                    counter++;
                    // dividi il numero per il fattore primo
                    number = number / prime;
                    if (counter % 2 == 0) {
                        // aggiungi il fattore all'array
                        factors[factorsIndex++] = prime;
                    }
                } else {
                    // se il fattore è presente un numero dispari di volte il numero non è un quadrato perfetto
                    if (counter % 2 != 0) {
                        break;
                    }
                    prime = nextPrime(prime);
                    counter = 0;
                }
            }

            if (counter % 2 == 0) {
                System.out.println("Il quadrato che hai inserito è perfetto");
                int root = 1;
                // moltiplica i fattori della radice
                for (int f : factors) {
                    if (f == 0) break;
                    root *= f;
                }
                System.out.println("La radice è " + root);
            } else {
                System.out.println("Il quadrato non è perfetto");
            }
        }
    }

    private static boolean isPrime(int number) {
        if (number <= 3) {
            return true;
        }
        for (int i = number / 2 + 1; i > 1; i--) {
            if (number % i == 0) return false;
        }
        return true;
    }

    public static int nextPrime(int value) {
        while (!isPrime(++value));
        return value;
    }
}
