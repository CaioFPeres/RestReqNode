FROM alpine
RUN apk update && apk add nodejs
COPY . /app
WORKDIR /app
CMD ["node", "app.js", ">", "~/program.log", "2>&1", "&"]