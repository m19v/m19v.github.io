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


## Abbreviations

- **PEM**: Privacy Enhanced Mail
- **PKCS**: Public-Key Cryptography Standards
- **SHA**: Secure Hash Algorithm
- **SSL**: Secure Socket Layer
- **TLS**: Transport Layer Security
- **CSR**: Certificate Signing Request
- **DER**: Distinguished Encoding Rules


## Resources
[OpenSSL Introduction.](https://www.keycdn.com/blog/openssl-tutorial)
