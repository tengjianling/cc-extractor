# Use an official Python runtime as a base image
FROM python:3.10-slim

# Set environment variables to reduce issues and unnecessary package installs
ENV DEBIAN_FRONTEND=noninteractive

# Update apt and install dependencies for adding repositories
RUN apt-get update && \
    apt-get install -y --no-install-recommends apt-utils gnupg software-properties-common

# Install OpenJDK 11 from Debian's repository
RUN echo "deb http://deb.debian.org/debian/ bullseye main" > /etc/apt/sources.list.d/debian.list && \
    apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Verify Java installation
RUN java -version

# Set the working directory in the container
WORKDIR /app

# Copy the local directory contents into the container
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
# CMD ["python", "app.py"]
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "--timeout", "120", "app:app"]
