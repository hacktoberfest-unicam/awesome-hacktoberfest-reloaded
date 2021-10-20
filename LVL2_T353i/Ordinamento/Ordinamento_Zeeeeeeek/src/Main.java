import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] lista = new int[]{1,5,7,3,4,3};
        int temp;
        boolean flag = false;
        while(!flag) {
            flag = true;
            for(int i = 0; i < lista.length - 1; i++) {
                if(lista[i] > lista[i+1]) {
                    temp = lista[i];
                    lista[i] = lista[i+1];
                    lista[i+1] = temp;
                    flag = false;
                }
            }
        }
        System.out.println(Arrays.toString(lista));
    }

}
