import java.util.ArrayList;

public class Hacktoberfest2021 {

    public static void main(String[] args) {
        Integer [] array ={1,2,3,4,7,4,8};
        System.out.println(calculateIndex(array));
    }

    public static <T> int calculateIndex(T[] array){
        ArrayList<T> alreadyRead = new ArrayList<>();
        int index = -1;
        for(int i=0; i<array.length; i++) {
            if (alreadyRead.contains(array[i])){
                index = i;
                break;
            }
            alreadyRead.add(array[i]);
        }
            return index;
    }
}
