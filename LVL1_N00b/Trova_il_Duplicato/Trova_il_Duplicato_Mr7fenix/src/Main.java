public class Main {
    public static void main(String[] args) {
        int[] numeri = new int[]{1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10};

        for (int i = 0; i < numeri.length; i++) {
            for (int k = 0; k < numeri.length; k++) {
                    if (numeri[i] == numeri[k] && i != k) {
                        System.out.println("Alla posizione " + k + " è presente un numero duplicato");
                        return;
                }
            }
        }
        System.out.println("Non ci sono numeri duplicati");
    }
}