#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>
#include <string.h>

int main() {
    // Memory sizes in bytes
    size_t total_size = 4 * 1024 * 1024;  // 4MB
    size_t unmap_size = 1 * 1024 * 1024;  // 1MB

    // Get the system page size
    long page_size = sysconf(_SC_PAGESIZE);
    if (page_size == -1) {
        perror("sysconf");
        exit(EXIT_FAILURE);
    }

    // Check if unmap_size is a multiple of the page size
    if (unmap_size % page_size != 0) {
        fprintf(stderr, "Unmap size must be a multiple of the page size.\n");
        exit(EXIT_FAILURE);
    }

    // Use mmap to map the memory region
    void *mapped_region = mmap(NULL, total_size, PROT_READ | PROT_WRITE, MAP_ANONYMOUS | MAP_PRIVATE, -1, 0);
    if (mapped_region == MAP_FAILED) {
        perror("mmap");
        exit(EXIT_FAILURE);
    }

    printf("Memory region mapped at address %p\n", mapped_region);

    // Write some data to the mapped region
    // memset(mapped_region, 'A', total_size);
    printf("Initial data written to the first 10 bytes: %.*s\n", 10, (char *)mapped_region);

    // Unmap the first megabyte
    if (munmap(mapped_region, unmap_size) == -1) {
        perror("munmap");
        exit(EXIT_FAILURE);
    }

    printf("Unmapped the first megabyte\n");

    // Attempt to access the unmapped memory region (will likely cause a segmentation fault)
    // Uncommenting the following line will likely cause the program to crash
    // printf("Data in first megabyte: %.*s\n", 10, (char *)mapped_region);

    // Clean up: unmap the remaining memory
    void *remaining_region = (char *)mapped_region + unmap_size;
    if (munmap(remaining_region, total_size - unmap_size) == -1) {
        perror("munmap");
        exit(EXIT_FAILURE);
    }

    printf("Unmapped the remaining memory\n");

    return 0;
}
