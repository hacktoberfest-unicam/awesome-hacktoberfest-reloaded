import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Dimmi il tuo quadrato perfetto: ");
        int radPer = scanner.nextInt();

        boolean flag = false;
        for (int i = 1; ; i++){
            if ((i*i) == radPer){
                System.out.println("La radice è: " + radPer/i);
                return;
            }else if ((i*i) > radPer){
                System.out.println("Il tuo numero non è un quadrato perfetto");
                return;
            }
        }
    }
}
