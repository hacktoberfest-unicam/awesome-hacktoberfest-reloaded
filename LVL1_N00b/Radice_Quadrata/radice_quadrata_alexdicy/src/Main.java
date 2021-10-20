import java.util.Scanner;

/**
 * <a href="https://www.youmath.it/domande-a-risposte/view/6168-quadrato-perfetto.html">YouMath: Quadrato perfetto</a>
 *
 * @author Lorenzo Lapucci
 */
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Inserisci un quadrato perfetto: ");
        long number = sc.nextLong();
        double sqrt = Math.sqrt(number);
        int root = (int) sqrt;
        if (root != sqrt) {
            System.out.println("Il quadrato che hai inserito non è perfetto");
        }
        System.out.println("Risultato intero: " + root);
    }
}
