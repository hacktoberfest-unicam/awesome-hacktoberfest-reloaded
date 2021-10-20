
public class Hacktoberfest2021 {

        public static int firstOccurence(int arr[], int min, int max, int x, int n) {
            if (max >= min) {
                int mid = min + (max - min) / 2;
                if ((mid == 0 || x > arr[mid - 1]) && arr[mid] == x)
                    return mid;
                else if (x > arr[mid])
                    return firstOccurence(arr, (mid + 1), max, x, n);
                else
                    return firstOccurence(arr, min, (mid - 1), x, n);
            }
            return -1;
        }
        
        public static int lastOccurrence(int arr[], int min, int max, int x, int n) {
            if (max >= min) {
                int mid = min + (max - min) / 2;
                if ((mid == n - 1 || x < arr[mid + 1]) && arr[mid] == x)
                    return mid;
                else if (x < arr[mid])
                    return lastOccurrence(arr, min, (mid - 1), x, n);
                else
                    return lastOccurrence(arr, (mid + 1), max, x, n);
            }
            return -1;
        }
        
        public static void main(String[] args) {
            int arr[] = { 2, 4, 5, 6, 6, 6, 9, 10};
            int n = arr.length;
            int x = 6;
            System.out.println("First= " + firstOccurence(arr, 0, n - 1, x, n));
            System.out.println("Last= " + lastOccurrence(arr, 0, n - 1, x, n));
        }
}
