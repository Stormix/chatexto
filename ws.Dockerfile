FROM oven/bun:latest
WORKDIR /usr/src/app

ARG NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ARG TWITCH_CLIENT_ID=${TWITCH_CLIENT_ID}
ENV TWITCH_CLIENT_ID=${TWITCH_CLIENT_ID}
ARG TWITCH_CLIENT_SECRET=${TWITCH_CLIENT_SECRET}
ENV TWITCH_CLIENT_SECRET=${TWITCH_CLIENT_SECRET}
ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}
ARG NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ARG NEXT_PUBLIC_NEXTAUTH_URL=${NEXT_PUBLIC_NEXTAUTH_URL}
ENV NEXT_PUBLIC_NEXTAUTH_URL=${NEXT_PUBLIC_NEXTAUTH_URL}
ARG NEXT_PUBLIC_WEBSOCKET_ENDPOINT=${NEXT_PUBLIC_WEBSOCKET_ENDPOINT}
ENV NEXT_PUBLIC_WEBSOCKET_ENDPOINT=${NEXT_PUBLIC_WEBSOCKET_ENDPOINT}

# Install nodejs using n
RUN apt-get -y update; apt-get -y install curl
ARG NODE_VERSION=20.9.0
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

COPY bun.lockb package.json prisma ./
RUN bun install

COPY . .
RUN bunx prisma generate

EXPOSE 3001
ENTRYPOINT [ "bun", "server" ]