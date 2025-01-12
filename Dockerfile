FROM oven/bun:1.1.38
WORKDIR /app

# Copy the application code to the working directory
COPY . .

# Install the dependencies
RUN bun install

# Expose the port the application will run on
EXPOSE ${PORT}

# Run the command to start the development server
CMD ["bun", "run", "start"]