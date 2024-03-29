FROM archlinux:latest

# Update the repositories
RUN pacman -Sy

# Install nodejs
RUN pacman -S --noconfirm git nodejs npm

# Generate directories and set up project
RUN  mkdir /app && mkdir /app/dick && mkdir /app/ass
COPY . /app/dick
RUN  cd /app/dick

#RUN nvm install node
RUN npm install -g npm@latest
RUN npm --version
RUN node --version

WORKDIR /app/dick

RUN npm i

# Expose port
EXPOSE     3000
