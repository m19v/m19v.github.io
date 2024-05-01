---
title: Quarkus
---

## What is Quarkus?
- Quarkus is a Java framework tailored for deployment on Kubernetes.

## Getting started

### Development environment

- Install OpenJDKa
  - At least Java 11 (Quarkus is compatable with Java 8)
- Install GraalVM
  - Extension of JVM
  - Comes as separated bundle
  - Creates native banaries
- IDE
  - IntelliJ IDEA
  - VS Code
- Build Tools
  - Gradle
  - Maven
    - Quarkus maven plugin
    - Quarkus BOM
    - pom.xml
      - Configures Quarkus BOM
      - Describes Quarkus extension
      - Defines Quarkus plugin
      - Native profile
- Docker
  - Package application as an image
  - Execute image inside container
  - Docker extension for Quarkus
  - Bootstrap application has set of Dockerfiles


### Bootstraping Quarkus Application

Options:
- [Configure Quarkus Application](https://code.quarkus.io/)
- Quarkus Maven plugin: 
  ```bash
  mvn -U io.quarkus:quarkus-maven-plugin:create \
  -DprojectGroupId=de.m19v.quarkus.starting \
  -DprojectArtifactId=rest-book \
  -DclassName="de.m19v.quarkus.Starting.BookResource" \
  -Dpath="/api/books" \
  -Dextensions="resteasy-jsonb"
  ```
### Developer Joy

- Hot reload
- Update a java file or resource
- Quarkus is reloaded
- No need to stop and restart
- Development vs production mode
- Unified configuration (e.g. application.properties)
- Integration with IDE
- Debugging

## Commands

```bash
mvn quarkus:dev                   # Run application in development mode
mvn test                          # Run application test
```

## References
- [Get Started with Quarkus](https://quarkus.io/get-started/)
- [Starting with Quarkus by Antonio Goncalves](https://www.udemy.com/course/quarkus-starting-with-quarkus/)
