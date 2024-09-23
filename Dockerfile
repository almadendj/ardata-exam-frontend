# Use a base image with Bun installed
FROM oven/bun:latest

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and lock file first to optimize caching
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the frontend source code to the working directory
COPY . .

# Set environment variable to let Next.js know the custom app directory (if needed)
# This depends on how your next.config.js is set up
# ENV NEXT_PUBLIC_APP_DIR=src/app

# Build the Next.js application
RUN bun run build

# Expose the port Next.js will run on (default is 3000)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["bun", "run", "start"]

