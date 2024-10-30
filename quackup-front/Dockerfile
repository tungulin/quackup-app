FROM node:18-alpine AS builder

COPY package.json ./
COPY package-lock.json ./

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.19-alpine AS server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/  /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
