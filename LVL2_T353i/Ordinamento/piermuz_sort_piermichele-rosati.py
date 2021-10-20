'''
Semplice algoritmo che preso un array, lo ordina in loco secondo il piermuz sort.
Il piermuz sort è un banale algoritmo di ordinamento basato su confronti,
avente pessima complessità computazionale e pessimo come il sottoscritto.
'''

import numpy as np

def piermuz_sort(arr):
    tmp = []
    for i in arr:
        tmp.append(i)
    sorted_arr = []
    while len(arr) != len(sorted_arr):
        minimum = min(tmp)
        for n in tmp:
            if n == minimum:
                sorted_arr.append(n)
                tmp.remove(n)
    return sorted_arr

# various test examples
#a = [3,6,9,2,4,7,1,10,0]
a = np.random.rand(10000)
print('------Array to sort: ')
for i in a:
    print(i)
print('------Sorted array len = '+str(len(a))+' : ')
sorted_a = piermuz_sort(a)
for i in sorted_a:
    print(i)
