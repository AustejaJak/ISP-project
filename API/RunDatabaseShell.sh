#!/bin/bash

# Define MySQL container name and password
containerName="isp-mysql-container"
mysqlRootPassword="password"
mysqlUser="user"
mysqlPassword="password"
mysqlDatabase="ecommerce"

# Check if the container with the specified name exists
existingContainers=$(docker ps -a --format '{{.Names}}')
if [[ $existingContainers =~ $containerName ]]; then
    containerStatus=$(docker inspect -f '{{.State.Status}}' "$containerName")
    if [ "$containerStatus" = "exited" ]; then
        # The container exists but is stopped, so let's start it
        docker start "$containerName"
        echo "MySQL container is already created and has been started."
    else
        echo "MySQL container with the same name is already running."
    fi
else
    # Pull the MySQL Docker image from Docker Hub
    docker pull mysql:latest
    
    # Run MySQL container in detached mode with specified root password
    docker run -d --name "$containerName" -e MYSQL_ROOT_PASSWORD="$mysqlRootPassword" -e MYSQL_USER="$mysqlUser" -e MYSQL_PASSWORD="$mysqlPassword" -e MYSQL_DATABASE="$mysqlDatabase" -p 3306:3306 mysql:latest

    # Check if the container is running
    if docker ps -f "name=$containerName" --format '{{.Names}}' | grep -q "$containerName"; then
        echo "MySQL container is running. Container Name: $containerName"
    else
        echo "Failed to start MySQL container."
    fi
fi