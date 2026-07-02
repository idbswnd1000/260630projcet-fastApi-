FROM jenkins/jenkins:lts-jdk17

USER root

RUN apt-get update && \
    apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    ca-certificates \
    gnupg \
    docker.io \
    docker-compose

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

RUN git --version && \
    node -v && \
    npm -v && \
    docker --version && \
    docker-compose --version

USER jenkins

EXPOSE 8080
EXPOSE 50000