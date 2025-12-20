# Proxy Generator

A realistic proxy server details generator that creates authentic-looking proxy configurations with server addresses, ports, usernames, and passwords.

## Features

- **Realistic Server Addresses**: Generates both hostnames and IP addresses that look authentic
- **Realistic Port Numbers**: Uses common proxy ports and valid port ranges
- **Realistic Usernames**: Creates believable username patterns
- **Strong Passwords**: Generates cryptographically secure passwords with mixed character types

## Usage

### Basic Usage

Generate a single proxy with detailed output:

```bash
python3 proxy_generator.py
```

### Generate Multiple Proxies

```bash
python3 proxy_generator.py -n 5
```

### Output Formats

#### Detailed Format (default)
```bash
python3 proxy_generator.py
```
Output:
```
Server:   proxy-us123.proxynet.com
Port:     8080
Username: user12345
Password: aB3$xYz9!mNpQrSt
```

#### URL Format
```bash
python3 proxy_generator.py -f url
```
Output:
```
http://user12345:aB3$xYz9!mNpQrSt@proxy-us123.proxynet.com:8080
```

#### Compact Format
```bash
python3 proxy_generator.py -f compact
```
Output:
```
proxy-us123.proxynet.com:8080:user12345:aB3$xYz9!mNpQrSt
```

## Options

- `-n, --number`: Number of proxies to generate (default: 1)
- `-f, --format`: Output format - `detailed`, `url`, or `compact` (default: detailed)

## Examples

Generate 10 proxies in URL format:
```bash
python3 proxy_generator.py -n 10 -f url
```

Generate 3 proxies in compact format:
```bash
python3 proxy_generator.py -n 3 -f compact
```

## Use as a Module

```python
from proxy_generator import ProxyGenerator

generator = ProxyGenerator()

# Generate a single proxy
proxy = generator.generate_proxy()
print(f"Server: {proxy['server']}")
print(f"Port: {proxy['port']}")
print(f"Username: {proxy['username']}")
print(f"Password: {proxy['password']}")

# Generate multiple proxies
proxies = generator.generate_multiple(5)
```

## Requirements

- Python 3.6 or higher
- No external dependencies (uses only Python standard library)

## Details Generated

All proxy details are randomly generated to appear realistic:

- **Servers**: Realistic hostnames (e.g., proxy-us456.proxynet.com) or public IP addresses
- **Ports**: Common proxy ports (8080, 3128, 1080, etc.) or valid high ports (1024-65535)
- **Usernames**: Various patterns like user12345, proxy_456, client_7890, etc.
- **Passwords**: 16-character secure passwords with uppercase, lowercase, digits, and special characters
