public class Main {
    public static void main(String[] args) {
        int[] lista = new int[]{1,2,3,4,5,6,7,8,9,10,4};
        for(int i = 0; i < lista.length; i++) {
            for(int j = 0; j < lista.length; j++) {
                if(j != i && lista[i] == lista[j]) {
                    System.out.println("Indice array del numero ripetuto: "+j);
                    return;
                }
            }
        }
        System.out.println("Non ci sono ripetizioni!");
    }
}
