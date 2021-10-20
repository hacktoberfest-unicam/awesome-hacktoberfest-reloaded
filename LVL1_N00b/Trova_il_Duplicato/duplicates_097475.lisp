(format t "Enter the array integers separated by whitespaces, then press Enter")
(defparameter *arr* (read-from-string (concatenate 'string "(" (read-line) ")")))


(defun find-duplicate (arr1)
  (labels (( find-duplicate2 (arr1 n)
              (if (equalp (car arr1) (cadr arr1))
                  (if (equalp (cadr arr1) nil) (format t "No duplicates found") (format t "Duplicate at index: ~a" n))
                  (find-duplicate2 (cdr arr1) (+ n 1))
                  )))
  (find-duplicate2 arr1 1)))


(find-duplicate *arr*)
