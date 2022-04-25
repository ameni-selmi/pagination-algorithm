# web site for Paging Algorithms

## The problem with Paging 
Paging causes the internal fragmentation which occurs because not every memory region is an exact multiple of the page size.
Imagine a program of size 101 in the above example: It would still need three pages of size 50, so it would occupy 49 bytes more than needed.
There are 3 algorithms of paging

### First In First Out (FIFO) 
This is the simplest page replacement algorithm. In this algorithm, the operating system keeps track of all pages in the memory in a queue, the oldest page is in the front of the queue. When a page needs to be replaced, the page in the front of the queue is selected for removal.

### Least Recently Used (LRU) :
In this algorithm, the pages which will be replaced are those which are the least recently used.

### Optimal Page replacement :
In this algorithm, the pages which will be replaced are those which will not be used for the longest duration of time in the future.
## Index page
![index](https://user-images.githubusercontent.com/53795935/165115979-cb624a41-c6d1-4274-b31a-346c6baa8081.PNG)
## Algorithms of paging
![pafing algorithm1](https://user-images.githubusercontent.com/53795935/165117154-76bfcfe6-a9e3-4836-8337-66eed52cc786.PNG)
![pafing algorithm2](https://user-images.githubusercontent.com/53795935/165117147-6d683f35-1596-4a04-88f8-4398d3a62baf.PNG)
