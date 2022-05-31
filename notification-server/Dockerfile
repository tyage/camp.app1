FROM maven:3.8-jdk-11 AS builder

WORKDIR /tmp
COPY ./src ./src
COPY ./pom.xml .
RUN mvn package

FROM adoptopenjdk/openjdk11:debianslim-jre

COPY --from=builder /tmp/target/app.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
