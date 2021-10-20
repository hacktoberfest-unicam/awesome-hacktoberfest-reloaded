import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Inserisci un intero:");
        Scanner sc = new Scanner(System.in);
        int input = sc.nextInt();
        int i;
        boolean flag = false;
        for (i = 1; i < input; i++) {
            if ((i * i) == input) {
                flag = true;
                break;
            }
        }
        if (flag) {
            System.out.println("L'intero inserito è un quadrato perfetto dato dal prodotto : " + i + "*" + i);
        } else {
            System.out.println("L'intero inserito NON è un quadrato perfetto");
        }
    }
}
