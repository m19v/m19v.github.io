---
title: OpenSSL
---

## Certificate and Key Formats

- DER
- PEM
- PKCS#7
- PKCS#8
- PKCS#12

## Commands

```shell
openssl version -a                          # Display version of OpenSSL


openssl ciphers -v 'ALL:eNULL'              # Verbose listing of all OpenSSL ciphers including NULL ciphers.
openssl ciphers -v 'ALL:!aNULL'             # List all ciphers except ones with no encryption (eNULL) or no authentication (aNULL):
```

## Tools
[Testing TLS/SSL encryption](https://testssl.sh/)  
[TLS Ciphersuite Search](https://ciphersuite.info/)  

## Resources
[OpenSSL Introduction.](https://www.keycdn.com/blog/openssl-tutorial)
