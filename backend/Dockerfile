# Start from a Debian image.
FROM debian:buster-slim

# Install curl and unzip (needed to install Deno).
RUN apt-get update && apt-get install -y curl unzip

# Install Deno.
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

# Add Deno to PATH.
ENV PATH="/root/.deno/bin:$PATH"

# Set the working directory in the container to /app.
WORKDIR /app

# Run the Deno application.
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-write", "main.ts"]