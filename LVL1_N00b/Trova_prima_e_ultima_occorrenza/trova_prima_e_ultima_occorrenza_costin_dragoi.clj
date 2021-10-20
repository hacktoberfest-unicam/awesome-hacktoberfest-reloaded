;; Compilatore Online: https://www.jdoodle.com/execute-clojure-online/
;; Incolla il codie
;; Inserisci un numero in `Stdin Inputs`, ad esempio 2.
;; Premi `Execute`

(ns main)

(defn trova-indice [arr n]
  (map first
       (filter #(= (second %) n)
               (map-indexed vector arr))))

(defn prima-posizione [arr n]
  (first (trova-indice arr n)))

(defn ultima-posizione [arr n]
  (last (trova-indice arr n)))

(def arr [1 2 2 2 3])
(println "Array: " arr)
(print "Inserisci un numero: ")
(flush)
(def n (read))
(println)
(if (> (count (trova-indice arr n)) 1)
  (do
    (println "Posizione prima occorrenza:" (prima-posizione arr n))
    (println "Posizione ultima occorrenza:" (ultima-posizione arr n)))
  (println "Nessuna occorenza" ))
