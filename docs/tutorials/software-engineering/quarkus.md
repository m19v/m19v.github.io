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


## CDI

## Quarkus Test

- Tests in JVM mand Native mode
  - Integrates with JUnit
  - `@QuarkusTest` annotation
- Starts Quarkus (on port 8081)
- Executes the test suit

### Unit Test

- Test on class in isolation
- No container services
- Mock container services if needed

### Integration Test

- Test one or several classes interacting together
- Container services are up and running
- No need to mock container services

### Testing frameworks

- JUnit
  - Quarkus supports JUnit 5 (JUnit 4 is deprecated)
  - No TestNG support
- RESTAssured
  - Open-source Java library
  - Domain Specific Language (DSL)
  - Write tests for RESTful API
  - Invokes APIs and validates the response

## Quarkus configuration

### Config Sources

- System properties
- Environment variables
- `.env` file in the current working directory
- Quarkus Application configuration file in `$PWD/config/application.properties`
- Quarkus Application configuration file `application.properties` in classpath
- MicroProfile Config configuration file `META-INF/microprofile-config.properties` in classpath

### MicroProfile configuration

- [MicroProfile specification](https://microprofile.io/)
- Configuration from multiple sources
  - application.properties
  - command line parameters
- Possibility to use dependency injection or lookup to get configuration

### MicroProfile configuration APIs

|    API              |                                 Description                                    |
|---------------------|--------------------------------------------------------------------------------|
| @ConfigProperty     | Binds the injection point with a configured value                              |
| ConfigProvider      | Central class to access a Config                                               |
| Config              | Resolves the property value by searching through all the configuration sources |
| ConfigSource        | Provides configuration values from a specific place                            |
| Converter           | Converts a configured values from a String to a Java type                      |


## Commands

```bash
mvn quarkus:dev                                  # Run application in development mode
mvn quarkus:dev -Dsuspend                        # Run application in development mode and suspend until a debugger is connected


mvn quarkus:dev -Dkey.of.conf="Value-of-conf"    # Override configuration in dev mode
mvn test -Dkey.of.conf="Value-of-conf"           # Override configuration in test mode

mvn test                                         # Run application test
```

## References
- [Get Started with Quarkus](https://quarkus.io/get-started/)
- [Starting with Quarkus by Antonio Goncalves](https://www.udemy.com/course/quarkus-starting-with-quarkus/)
- [Configuration Reference Guide](https://quarkus.io/guides/config-reference)
- [All configuration options](https://quarkus.io/guides/all-config)
