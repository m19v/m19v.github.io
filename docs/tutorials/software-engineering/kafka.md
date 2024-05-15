
---
title: Apache Kafka
---

## Introduction

### Why Apache Kafka

- Decoupling of data streams and systems
  - N Source Systems ---> Kafka ---> N Target Systems
- Distributed, resilient architecture, fault tolerant
- Horizontal scalability:
  - Can scale to 100s of brokes
  - Can scale to millions of messages per second
- High performance (latency of less than 10ms) - real life

### Apache Kafka Use Cases

- Messaging System
- Activity Tracking
- Gather metrics from many different locations
- Application Logs gathering
- Stream processing (with the Kafka Streams API for example)
- De-coupling of system dependencies
- Integration with Spark, Flink, Storm, Hadoop and many other Big Data Technologies
- Micro-services pub/sub 


Real use cases examples:

- **Netflix** - uses Kafka to apply recommendations in real-time while you're watching TV shows
- **Uber** - uses Kafka to gather user, taxi and trip data in real-time to compute and forecast demand, and compute surge pricing in real-time
- **LinkedIn** - uses Kafka to prevent spam, collect user interactions to make better connection recommendations in real time.

---
⚡ Kafka is only used as a transportation mechanism
---

## References

- [Apache Kafka for Beginners v3](https://www.udemy.com/course/apache-kafka)
