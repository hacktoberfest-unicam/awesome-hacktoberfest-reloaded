
public class Hacktoberfest2021 {

        private static int partition(int arr[], int min, int max)
        {
            int pivot = arr[max];
            int index = (min-1);
            for (int j=min; j<max; j++)
            {
                if (arr[j] < pivot)
                {
                    index++;
                    int temp = arr[index];
                    arr[index] = arr[j];
                    arr[j] = temp;
                }
            }
            int temp = arr[index+1];
            arr[index+1] = arr[max];
            arr[max] = temp;
            return index+1;
        }
        public static void sort(int arr[], int low, int high)
        {
            if (low < high)
            {
                int pivot = partition(arr, low, high);
                sort(arr, low, pivot-1);
                sort(arr, pivot+1, high);
            }
        }

        public static void main(String args[])
        {
            int arr[] = {10, 7, 8, 9, 1, 5};
            int n = arr.length;
            Hacktoberfest2021.sort(arr, 0, n-1);
            for(int i=0; i<arr.length; i++){
                System.out.println(arr[i]);
            }
        }
}
