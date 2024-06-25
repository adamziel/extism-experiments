#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define SERVER "198.143.164.252"  // IP address of wordpress.org
#define PORT 80
#define REQUEST "GET / HTTP/1.1\r\nHost: wordpress.org\r\nConnection: close\r\n\r\n"
#define BUFFER_SIZE 10000

int main() {
    int sockfd;
    struct sockaddr_in server_addr;
    char buffer[BUFFER_SIZE];
    ssize_t bytes_received;

    // Create socket
    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Configure server address
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    if (inet_pton(AF_INET, SERVER, &server_addr.sin_addr) <= 0) {
        perror("Invalid address/ Address not supported");
        close(sockfd);
        exit(EXIT_FAILURE);
    }

    // Connect to server
    if (connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("Connection Failed");
        close(sockfd);
        exit(EXIT_FAILURE);
    }

    // Send HTTP request
    send(sockfd, REQUEST, strlen(REQUEST), 0);

    // Receive HTTP response
    while ((bytes_received = read(sockfd, buffer, BUFFER_SIZE - 1)) > 0) {
        buffer[bytes_received] = '\0';
        printf("%s", buffer);
    }

    // Close the socket
    close(sockfd);
    return 0;
}
