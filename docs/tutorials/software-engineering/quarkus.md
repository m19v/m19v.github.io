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

By default, Quarkus reads configuration properties from multiple sources (by descending ordinal), see [config Sources](https://quarkus.io/guides/config-reference):

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


### Configuration Profiles

- Multiple configurations in same file
- Possibility to select profiles via profile name
- Syntax `%<profile_name>` in `application.properties`
- Quarkus has built-in three profiles 
  - `%dev`: `mvn quarkus:dev`
  - `%test`: `mvn test`
  - `%prod`: `java -jar`
  - `%staging`: `mvn quarkus:dev -Dquarkus.profile=staging`

  ```bash
  %dev.quarkus.log.console.level=DEBUG
  %test.quarkus.log.console.level=TRACE
  %prod.quarkus.log.console.level=SEVERE

  %staging.quarkus.log.console.level=INFO
  ```

## Packaging Application


### Types of Executable JARs

- JAR (a.k.a Fast-JAR) bundles code, dependencies, quarkus runtime and index to speed up classpath scanning
- Legacy JAR (a.k.a JAR) packages the application code and the quarkus runtime
- Uber-JAR (a.k.a. Fat-JAR) contains all the classes of all dependencies

JARs created by maven packages the code. JARs created by Quarkus packages code, dependencies and quarkus runtime

### Building Native Executables

- Executable JARs container bytecode and need JVM to run
- Native images contain binary and the needed JVM is bundled inside (not the whole JVM but what quarkus application uses with the help of GraalVM)
  - Compilation is resource intensive


## Containerizing Quarkus Application

Quarkus provides extensions for building (and pushing) [container images](https://quarkus.io/guides/container-image). Currently, it supports:

- Jib
- Docker
- OpenShift
- Buildpack

### Containerize Executable JARs with Docker

```bash
mvn quarkus:add-extension -Dextensions="container-image-docker"
mvn package -Dquarkus.container-image.build=true -Dquarkus.package.type=jar -Dquarkus.container-image.tag=jvm
mvn package -Dquarkus.container-image.build=true -Dquarkus.package.type=legacy-jar

docker run -i --rm -p 8080:8080 m19v/rest-book:jvm
```

### Containerizing Linux Native Executables

```bash
mvn package -Dquarkus.container-image.build=true \
            -Dquarkus.package.type=native \
            -Dquarkus.native.remote-container-build=true \
            -Dquarkus.container-image.tag=native

docker run -i --rm -p 8080:8080 m19v/rest-book:native
```


## Commands

```bash
# Run application
mvn quarkus:dev                                  # Run application in development mode
mvn quarkus:dev -Dsuspend                        # Run application in development mode and suspend until a debugger is connected


# Override configuration
mvn quarkus:dev -Dkey.of.conf="Value-of-conf"    # Override configuration in dev mode
mvn test -Dkey.of.conf="Value-of-conf"           # Override configuration in test mode


# Packaging JARs
mvn package                                      # package application in Fast-JAR file
mvn package -Dquarkus.package.type=jar           # package application in Fast-JAR file
mvn package -Dquarkus.package.type=legacy-jar    # package application in Legacy-JAR file
mvn package -Dquarkus.package.type=uber-jar      # package application in Fat-JAR file

mvn package -Dquarkus.package.type=native        # package application in native image format
mvn package -Pnative                             # package application in native image format


# Executing JARs
java -jar target/quarkus-app/quarkus-run.jar     # Execute JAR application (with %prod profile)
./target/rest-book-runner                        # Execute Native Executable

# Run test
mvn test                                         # Run application test
mvn verify -Pnative                              # Execute native tests
```

## References
- [Get Started with Quarkus](https://quarkus.io/get-started/)
- [Starting with Quarkus by Antonio Goncalves](https://www.udemy.com/course/quarkus-starting-with-quarkus/)
- [Quarkus Guides](https://quarkus.io/guides/)
- [Quarkus Quickstarts](https://github.com/quarkusio/quarkus-quickstarts)
- [Configuration Reference Guide](https://quarkus.io/guides/config-reference)
- [All configuration options](https://quarkus.io/guides/all-config)
- [Quarkiverse Hub](https://github.com/quarkiverse)
