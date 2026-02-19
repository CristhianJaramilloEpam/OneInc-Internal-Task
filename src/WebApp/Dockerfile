FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

ARG API_URL
RUN echo "API_URL=${API_URL}" > .env

COPY . .
RUN npm run build

FROM nginx:alpine AS final
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
