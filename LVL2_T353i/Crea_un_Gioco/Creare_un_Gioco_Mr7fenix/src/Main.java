import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Random;
import java.util.Scanner;

public class Main {
    public static Scanner scanner = new Scanner(System.in);
    public static String[] gesti = new String[]{"Sasso", "Carta", "Forbici", "Lizard", "Spock"};

    public static void main(String[] args) throws IOException, URISyntaxException {


        System.out.print("Benvenuto in Sasso Carta Forbici Lizard Spock");
        System.out.println(" Cosa vuoi fare \n 1. Giocatore Singolo \n 2. Giocatore Multiplo \n 3. Tutorial (P.S. Questo tutorial non funziona su Linux)");

        int scelta = scanner.nextInt();
        switch (scelta) {
            case 1 -> singleplayer();
            case 2 -> multiplayer();
            case 3 -> Desktop.getDesktop().browse(new URI("https://www.youtube.com/watch?v=zCMpjMNpxBA"));
        }
    }

    public static void singleplayer() {
        Random random = new Random();

        System.out.println("1. Sasso\n 2. Carta\n 3. Forbici\n 4. Lizard\n 5. Spock\n Cosa Scegli: ");
        int scelta = scanner.nextInt();

        int com = random.nextInt(1, 5) + 1;

        switch (scelta) {
            case 1:
                if (com == 4 || com == 3) {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai vinto");
                } else if (com == scelta) {
                    System.out.println("Sei cosi triste che hai scelto uguale al famcomputer, mi fai schifo :)");
                } else {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai perso");
                }
                break;
            case 2:
                if (com == 1 || com == 5) {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai vinto");
                } else if (com == scelta) {
                    System.out.println("Sei cosi triste che hai scelto uguale al famcomputer, mi fai schifo :)");
                } else {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai perso");
                }
                break;
            case 3:
                if (com == 2 || com == 4) {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai vinto");
                } else if (com == scelta) {
                    System.out.println("Sei cosi triste che hai scelto uguale al famcomputer, mi fai schifo :)");
                } else {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai perso");
                }
                break;
            case 4:
                if (com == 3 || com == 5) {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai vinto");
                } else if (com == scelta) {
                    System.out.println("Sei cosi triste che hai scelto uguale al famcomputer, mi fai schifo :)");
                } else {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai perso");
                }
                break;

            case 5:
                if (com == 1 || com == 3) {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai vinto");
                } else if (com == scelta) {
                    System.out.println("Sei cosi triste che hai scelto uguale al famcomputer, mi fai schifo :)");
                } else {
                    System.out.println("Io scelgo " + gesti[com - 1]);
                    System.out.println("Complimenti hai perso");
                }
                break;
        }
    }

    public static void multiplayer(){
        System.out.println("1. Sasso\n 2. Carta\n 3. Forbici\n 4. Lizard\n 5. Spock\n Cosa Scegli Giocatore 1: ");
        int scelta1 = scanner.nextInt();

        System.out.println("1. Sasso\n 2. Carta\n 3. Forbici\n 4. Lizard\n 5. Spock\n Cosa Scegli Giocatore 1: ");
        int scelta2 = scanner.nextInt();

        switch (scelta1) {
            case 1:
                if (scelta2 == 4 || scelta2 == 3) {
                    System.out.println("Complimenti hai vinto giocatore 1");
                } else if (scelta2 == scelta1) {
                    System.out.println("Siete tristi");
                } else {
                    System.out.println("Complimenti hai vinto giocatore 2");
                }
                break;
            case 2:
                if (scelta2 == 1 || scelta2 == 5) {
                    System.out.println("Complimenti hai vinto giocatore 1");
                } else if (scelta2 == scelta1) {
                    System.out.println("Siete tristi");
                } else {
                    System.out.println("Complimenti hai vinto giocatore 2");
                }
                break;
            case 3:
                if (scelta2 == 2 || scelta2 == 4) {
                    System.out.println("Complimenti hai vinto giocatore 1");
                } else if (scelta2 == scelta1) {
                    System.out.println("Siete tristi");
                } else {
                    System.out.println("Complimenti hai vinto giocatore 2");
                }
                break;
            case 4:
                if (scelta2 == 3 || scelta2 == 5) {
                    System.out.println("Complimenti hai vinto giocatore 1");
                } else if (scelta2 == scelta1) {
                    System.out.println("Siete tristi");
                } else {
                    System.out.println("Complimenti hai vinto giocatore 2");
                }
                break;

            case 5:
                if (scelta2 == 1 || scelta2 == 3) {
                    System.out.println("Complimenti hai vinto giocatore 1");
                } else if (scelta2 == scelta1) {
                    System.out.println("Siete tristi");
                } else {
                    System.out.println("Complimenti hai vinto giocatore 2");
                }
                break;
        }
    }
}

