#include <stdio.h>

extern char* get_string(int fd);
// extern void get_string();

int main() {
    // get_string();
    printf("%s\n", get_string(15));
    return 0;
}
