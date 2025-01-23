# Variables
IMAGE_NAME := jetacademie-frontend
DOCKER_USER := codergo7
VERSION := latest

# Default target
all: deploy

# Build the Docker image
build:
	docker build -t $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION) .

# Push the Docker image to Docker Hub
push:
	docker push $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)

# Build and push the Docker image
deploy: build push

# Remove the Docker image locally
clean:
	docker rmi -f $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)

# Run the Docker container locally
run:
	docker run -d -p 8080:80 --name $(IMAGE_NAME) $(DOCKER_USER)/$(IMAGE_NAME):$(VERSION)

# Stop and remove the running Docker container
stop:
	docker stop $(IMAGE_NAME) || true
	docker rm $(IMAGE_NAME) || true

# Help command
help:
	@echo "Usage:"
	@echo "  make build      - Build the Docker image"
	@echo "  make push       - Push the Docker image to Docker Hub"
	@echo "  make deploy     - Build and push the Docker image"
	@echo "  make clean      - Remove the Docker image locally"
	@echo "  make run        - Run the Docker container locally"
	@echo "  make stop       - Stop and remove the running container"
