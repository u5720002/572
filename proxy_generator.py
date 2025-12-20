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
        """Generate a realistic public IP address from major ISPs (Spectrum, T-Mobile, Verizon)"""
        # IP ranges for major ISPs
        # Format: (first_octet, second_octet_min, second_octet_max)
        
        # Spectrum (Charter Communications) IP ranges
        spectrum_ranges = [
            (24, 0, 255),           # 24.0.0.0/8
            (66, 56, 95),           # 66.56.0.0 - 66.95.255.255
            (76, 96, 127),          # 76.96.0.0 - 76.127.255.255
            (97, 64, 95),           # 97.64.0.0 - 97.95.255.255
            (174, 96, 127),         # 174.96.0.0 - 174.127.255.255
        ]
        
        # T-Mobile IP ranges
        tmobile_ranges = [
            (172, 56, 57),          # 172.56.0.0 - 172.57.255.255
            (172, 58, 59),          # 172.58.0.0 - 172.59.255.255
            (208, 54, 55),          # 208.54.0.0 - 208.55.255.255
        ]
        
        # Verizon IP ranges
        verizon_ranges = [
            (70, 0, 255),           # 70.0.0.0/8
            (71, 0, 255),           # 71.0.0.0/8
            (72, 0, 255),           # 72.0.0.0/8
            (73, 0, 255),           # 73.0.0.0/8
            (74, 0, 255),           # 74.0.0.0/8
            (75, 0, 255),           # 75.0.0.0/8
            (96, 224, 255),         # 96.224.0.0 - 96.255.255.255
            (98, 64, 127),          # 98.64.0.0 - 98.127.255.255
            (108, 0, 255),          # 108.0.0.0/8
        ]
        
        # Combine all ISP ranges
        all_ranges = spectrum_ranges + tmobile_ranges + verizon_ranges
        
        # Select a random IP range
        ip_range = random.choice(all_ranges)
        first_octet = ip_range[0]
        second_octet = random.randint(ip_range[1], ip_range[2])
        third_octet = random.randint(0, 255)
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
        
        # Shuffle using secrets for cryptographically secure shuffling
        # Create a new list with shuffled order using secrets.choice
        shuffled_password = []
        password_copy = password.copy()
        while password_copy:
            index = secrets.randbelow(len(password_copy))
            shuffled_password.append(password_copy.pop(index))
        
        return ''.join(shuffled_password)
    
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
