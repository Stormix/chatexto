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

RUN bun run build
ENV NODE_ENV production

WORKDIR /usr/src/app/.next/standalone
EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]