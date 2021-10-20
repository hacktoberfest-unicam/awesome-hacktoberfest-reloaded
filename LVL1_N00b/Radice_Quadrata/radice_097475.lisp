(format t "Enter a perfect square, then press Enter~%")
(defparameter *n* (read))

(defun root (n) (labels ((_root (candidate)
                           (if (<= candidate 0) (format t "Input is not a perfect square")
                               (if (equalp (* candidate candidate) n) (format t "The square root is: ~a" candidate) (_root (- candidate 1))))
                           ))
                  (_root (ceiling n 2))))
(root *n*)
