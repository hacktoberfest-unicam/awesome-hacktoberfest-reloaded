public class App {

    public static void main(String[] args) {
        int[] array = new int[]{5,4,3,2,1};
        int[] ordered = insertionSort(array);
        for (int i: ordered) {
            System.out.println(i);
        }
    }

    public static int[] insertionSort(int[] array) {
        if(array.length == 0 || array.length == 1)
            return array;
        for(int i=1; i < array.length; ++i){
            int j = i;
            boolean flag = true;
            while(j > 0 && flag){
                if(array[j-1] > (array[j]) ) {
                    int appoggio = array[j];
                    array[j] = array[j-1];
                    array[j-1] = appoggio;
                }
                else
                    flag = false;
                j = j-1;
            }
        }
        return array;
    }
}
