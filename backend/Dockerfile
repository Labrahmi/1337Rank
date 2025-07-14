FROM debian:buster-slim

# Update sources.list to use archive.debian.org
RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list \
 && sed -i '/deb-src/d' /etc/apt/sources.list \
 && echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until

# Install curl and unzip
RUN apt-get update && apt-get install -y curl unzip

# Install Deno.
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV PATH="/root/.deno/bin:$PATH"

WORKDIR /app

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-write", "main.ts"]
