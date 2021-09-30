FROM alpine
RUN apk update && apk add nodejs
COPY . /app
WORKDIR /app
CMD ["nohup", "node", "app.js", "&"]