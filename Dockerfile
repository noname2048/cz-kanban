FROM node:20
RUN corepack enable && corepack prepare pnpm@latest
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY . .
RUN pnpm install --frozen-lockfile

# do not replace node_modules
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev"]
