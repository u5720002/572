#!/usr/bin/env python3
"""
Proxy Generator - Generates realistic proxy details
Generates: server, port, username, and password
"""

import random
import string
import secrets


class ProxyGenerator:
    """Generate realistic proxy server details"""
    
    # Realistic server hostnames from various providers
    SERVER_PREFIXES = [
        'proxy', 'node', 'server', 'gateway', 'relay', 
        'tunnel', 'vpn', 'secure', 'private', 'shield'
    ]
    
    SERVER_LOCATIONS = [
        'us', 'uk', 'ca', 'de', 'fr', 'nl', 'sg', 'jp', 
        'au', 'br', 'in', 'kr', 'it', 'es', 'se', 'ch'
    ]
    
    SERVER_DOMAINS = [
        'proxynet.com', 'securevpn.io', 'privateproxy.net',
        'fastproxy.org', 'eliteproxy.com', 'proxyhub.io',
        'vpngateway.net', 'shieldproxy.com', 'globalproxy.io'
    ]
    
    # Common proxy ports
    COMMON_PORTS = [
        8080, 3128, 1080, 8888, 8000, 9090, 3129, 8081,
        8118, 8123, 8181, 9999, 8008, 80, 443, 8443
    ]
    
    def __init__(self):
        """Initialize the proxy generator"""
        random.seed()
    
    def generate_server(self):
        """Generate a realistic server hostname or IP"""
        choice = random.choice(['hostname', 'ip'])
        
        if choice == 'hostname':
            prefix = random.choice(self.SERVER_PREFIXES)
            location = random.choice(self.SERVER_LOCATIONS)
            number = random.randint(1, 999)
            domain = random.choice(self.SERVER_DOMAINS)
            return f"{prefix}-{location}{number}.{domain}"
        else:
            # Generate a realistic public IP address
            return self._generate_public_ip()
    
    def _generate_public_ip(self):
        """Generate a realistic public IP address"""
        # Avoid private IP ranges
        valid_ranges = [
            (1, 126),    # Class A (excluding 10.0.0.0/8)
            (128, 191),  # Class B (excluding 172.16.0.0/12)
            (192, 223)   # Class C (excluding 192.168.0.0/16)
        ]
        
        range_choice = random.choice(valid_ranges)
        first_octet = random.randint(range_choice[0], range_choice[1])
        
        # Avoid reserved ranges
        if first_octet == 10:
            first_octet = 11
        elif first_octet == 127:
            first_octet = 128
        elif first_octet == 172:
            second_octet = random.choice([i for i in range(256) if i < 16 or i > 31])
        elif first_octet == 192:
            second_octet = random.choice([i for i in range(256) if i != 168])
        else:
            second_octet = random.randint(1, 254)
        
        if first_octet not in [172, 192]:
            second_octet = random.randint(1, 254)
            
        third_octet = random.randint(1, 254)
        fourth_octet = random.randint(1, 254)
        
        return f"{first_octet}.{second_octet}.{third_octet}.{fourth_octet}"
    
    def generate_port(self):
        """Generate a realistic proxy port number"""
        # 70% common ports, 30% random high ports
        if random.random() < 0.7:
            return random.choice(self.COMMON_PORTS)
        else:
            return random.randint(1024, 65535)
    
    def generate_username(self):
        """Generate a realistic username"""
        patterns = [
            lambda: f"user{random.randint(1000, 99999)}",
            lambda: f"proxy_{random.randint(100, 9999)}",
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(5, 10)))}",
            lambda: f"{''.join(random.choices(string.ascii_lowercase, k=random.randint(4, 8)))}{random.randint(10, 999)}",
            lambda: f"client_{random.randint(1000, 9999)}",
        ]
        
        return random.choice(patterns)()
    
    def generate_password(self, length=16):
        """Generate a secure, realistic password"""
        # Use secrets module for cryptographically strong random password
        characters = string.ascii_letters + string.digits + "!@#$%^&*()-_=+[]{}|;:,.<>?"
        
        # Ensure password has at least one of each type
        password = [
            secrets.choice(string.ascii_uppercase),
            secrets.choice(string.ascii_lowercase),
            secrets.choice(string.digits),
            secrets.choice("!@#$%^&*()-_=+")
        ]
        
        # Fill the rest with random characters
        password += [secrets.choice(characters) for _ in range(length - 4)]
        
        # Shuffle to avoid predictable patterns
        random.shuffle(password)
        
        return ''.join(password)
    
    def generate_proxy(self):
        """Generate a complete proxy with all details"""
        return {
            'server': self.generate_server(),
            'port': self.generate_port(),
            'username': self.generate_username(),
            'password': self.generate_password()
        }
    
    def generate_multiple(self, count=1):
        """Generate multiple proxies"""
        return [self.generate_proxy() for _ in range(count)]


def format_proxy(proxy):
    """Format proxy details for display"""
    return (
        f"Server:   {proxy['server']}\n"
        f"Port:     {proxy['port']}\n"
        f"Username: {proxy['username']}\n"
        f"Password: {proxy['password']}\n"
    )


def format_proxy_url(proxy):
    """Format proxy as URL"""
    return f"http://{proxy['username']}:{proxy['password']}@{proxy['server']}:{proxy['port']}"


def main():
    """Main function to demonstrate proxy generation"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Generate realistic proxy server details')
    parser.add_argument('-n', '--number', type=int, default=1,
                        help='Number of proxies to generate (default: 1)')
    parser.add_argument('-f', '--format', choices=['detailed', 'url', 'compact'], 
                        default='detailed',
                        help='Output format (default: detailed)')
    
    args = parser.parse_args()
    
    generator = ProxyGenerator()
    proxies = generator.generate_multiple(args.number)
    
    for i, proxy in enumerate(proxies, 1):
        if args.format == 'detailed':
            if args.number > 1:
                print(f"=== Proxy #{i} ===")
            print(format_proxy(proxy))
        elif args.format == 'url':
            print(format_proxy_url(proxy))
        elif args.format == 'compact':
            print(f"{proxy['server']}:{proxy['port']}:{proxy['username']}:{proxy['password']}")


if __name__ == '__main__':
    main()
