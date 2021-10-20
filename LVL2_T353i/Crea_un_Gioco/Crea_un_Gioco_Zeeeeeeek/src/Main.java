import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Inserire parola per l'impiccato:");
        String parola = sc.nextLine().toLowerCase().replaceAll("\\s","");
        if(!checkparola(parola)) System.exit(0);
        int vite = 4;
        StringBuffer parolaDaVisualizzare = new StringBuffer("");
        for (int i = 0; i < parola.length(); i++) parolaDaVisualizzare.append('_');
        while (vite > 0) {
            System.out.println("Parola aggiornata: " + parolaDaVisualizzare + "\nInserisci carattere della parola: \n");
            String input = sc.nextLine();
            if (input.length() != 1) {
                System.out.println("Devi inserire un solo carattere");
                continue;
            }
            char carattere = input.charAt(0);
            if (!(Character.isLetter(input.charAt(0)))) {
                System.out.println("Devi inserire una lettera");
                continue;
            }
            if (parola.contains(input.substring(0,1))) {
                char[] temp = parola.toCharArray();
                //Controllo dove contiene il carattere
                for (int i = 0; i < parola.length(); i++) {
                    if(temp[i] == input.charAt(0)) {
                        parolaDaVisualizzare.replace(i,i+1, input.substring(0,1));
                    }
                }
            } else {
                vite--;
            }
            System.out.println("Vite: " + vite);
            if(parola.equals(parolaDaVisualizzare.toString())) {
                System.out.println("Hai vinto!");
                break;
            }
        }

    }

    public static boolean checkparola(String a) {
        char[] temp = a.toCharArray();
        for(int i = 0; i < a.length(); i++) {
            if(!(Character.isLetter(temp[i]))) return false;
        }
        return true;
    }
}
