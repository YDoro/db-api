FROM node:20.18.0

WORKDIR /app

# Install Bun and other dependencies
RUN apt-get update -qq && apt-get install -y -qq \
    python3 \
    python-is-python3 \
    make \
    g++ \
    bash \
    curl \
    build-essential \
    node-gyp \
    python3-pip && \
    curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

COPY . .

RUN npm i
RUN rm package-lock.json

# Expose the port the application will run on
EXPOSE ${PORT}

# Run the command to start the development server
CMD ["bun", "dev"]