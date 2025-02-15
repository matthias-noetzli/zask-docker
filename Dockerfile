FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install

COPY . .

RUN npm run build-only

FROM nginx:stable-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]