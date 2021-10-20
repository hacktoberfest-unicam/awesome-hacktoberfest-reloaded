public class Main {
    public static void main(String[] args) {
        int[] lista = new int[]{1,2,7,8,9,8,12,7};
        int posizioneUltimaRicorrenza = -1;
        for(int i = 0; i < lista.length; i++) {
            for(int j = 0; j < lista.length; j++) {
                if(j != i && lista[i] == lista[j]) {
                    posizioneUltimaRicorrenza = i;
                }
            }
        }
        if(posizioneUltimaRicorrenza > -1) System.out.println("L'ultima ripetizione si trova nella casella :" +
                posizioneUltimaRicorrenza);
        else {
            System.out.println("Non ci sono ripetizioni!");
        }
    }
}
