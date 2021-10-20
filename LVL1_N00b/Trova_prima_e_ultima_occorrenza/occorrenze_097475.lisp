(format t "Enter the array integers separated by whitespaces, then press Enter")
(defparameter *arr* (read-from-string (concatenate 'string "(" (read-line) ")")))
(format t "Enter the integer to find, then press Enter")
(defparameter *n* (read))

(defun occurrences (arr n)
  (labels ((_occurrences (arr first last curr)
             (if (equalp (car arr) nil) (format t "First occurrence: ~a, Last occurrence: ~a" first last)
                 (if (equalp (car arr) n)
                     (if (or (equalp first nil) (< curr first)) (_occurrences (cdr arr) curr curr (+ curr 1))
                         (if (or (equalp last nil) (> curr last)) (_occurrences (cdr arr) first curr (+ curr 1))
                             (_occurrences (cdr arr) first last (+ curr 1)) )) 
                     (_occurrences (cdr arr) first last (+ curr 1))
                     ))))
      
     (_occurrences arr nil nil 0) ))


(occurrences *arr* *n*)
