;; Compilatore Online: https://www.jdoodle.com/execute-clojure-online/
;; Incolla il codie
;; Premi `Execute`

(ns main)

(defn trova-duplicati [arr]
  (keys
   (filter (fn [[k v]] (> v 1))
           (frequencies arr))))

(defn trova-indice [arr]
  (map first
       (filter #(= (second %)
                   (first (trova-duplicati arr)))
               (map-indexed vector arr))))

(defn primo-duplicato [arr]
  (second (trova-indice arr)))

(def arr [1 2 2 2 3 3])

(println "Array: " arr)
(println "Posizione primo duplicato: " (primo-duplicato arr))
