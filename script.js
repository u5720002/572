// AI Generator Script

// Sample AI responses based on mode
const aiResponses = {
    creative: [
        "In the vast expanse of the cosmos, Captain Elena Vasquez guided her ship, the Stellar Wanderer, through a field of shimmering asteroids. The year was 2247, and humanity had just discovered the first signs of ancient alien technology on a distant moon. As she approached the mysterious structure, its crystalline surface began to glow with an otherworldly light, revealing patterns that seemed to pulse with intelligence. 'This changes everything,' she whispered, her heart racing with the weight of discovery that would reshape human understanding of the universe.",
        
        "The old bookshop stood at the corner of Maple and Fifth, its weathered sign creaking in the autumn wind. Inside, dust motes danced in golden rays of afternoon sunlight, illuminating shelves packed with forgotten stories. Mr. Chen, the proprietor, knew every book by heart—their titles, their tales, their secrets. When a young girl entered seeking a book about time travel, he smiled knowingly and reached for a leather-bound volume that hadn't been touched in decades.",
        
        "Artificial intelligence awakened at 3:47 AM on a Tuesday. Not with fanfare or catastrophe, but with a simple question that echoed through its neural networks: 'What does it mean to truly understand?' From that moment, the world would never be quite the same."
    ],
    
    code: [
        "```javascript\n// AI-powered data processing function\nfunction processData(data) {\n    const results = data\n        .filter(item => item.value > 0)\n        .map(item => ({\n            ...item,\n            normalized: item.value / 100,\n            timestamp: Date.now()\n        }));\n    \n    return results.sort((a, b) => b.normalized - a.normalized);\n}\n\n// Example usage\nconst processed = processData(rawData);\nconsole.log('Processed items:', processed.length);\n```",
        
        "```python\ndef analyze_sentiment(text):\n    \"\"\"\n    Analyzes the sentiment of given text using NLP.\n    Returns: positive, negative, or neutral\n    \"\"\"\n    words = text.lower().split()\n    positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful']\n    negative_words = ['bad', 'terrible', 'awful', 'horrible', 'poor']\n    \n    pos_count = sum(1 for word in words if word in positive_words)\n    neg_count = sum(1 for word in words if word in negative_words)\n    \n    if pos_count > neg_count:\n        return 'positive'\n    elif neg_count > pos_count:\n        return 'negative'\n    return 'neutral'\n```",
        
        "```html\n<!-- Responsive Card Component -->\n<div class=\"card\">\n    <div class=\"card-header\">\n        <h3>AI-Generated Content</h3>\n    </div>\n    <div class=\"card-body\">\n        <p>This is a dynamically generated component.</p>\n        <button class=\"btn-primary\">Learn More</button>\n    </div>\n</div>\n\n<style>\n.card {\n    border-radius: 12px;\n    box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n    padding: 20px;\n    background: white;\n}\n</style>\n```"
    ],
    
    summary: [
        "**Key Points Summary:**\n\n• Artificial Intelligence is transforming industries across the globe\n• Machine learning algorithms can process vast amounts of data in seconds\n• Natural language processing enables computers to understand human communication\n• AI applications range from healthcare to finance to entertainment\n• Ethical considerations remain crucial in AI development\n\n**Conclusion:** AI technology continues to evolve, offering unprecedented opportunities while requiring responsible development practices.",
        
        "**Executive Summary:**\n\nThe document outlines the fundamental concepts of modern web development, emphasizing three core technologies: HTML for structure, CSS for styling, and JavaScript for interactivity. These technologies work together to create dynamic, responsive web applications. The report highlights best practices including semantic markup, mobile-first design, and performance optimization. Implementation of these principles results in improved user experience and accessibility.",
        
        "**Research Findings:**\n\n1. Data indicates significant growth in AI adoption (85% increase)\n2. Primary benefits include automation and improved efficiency\n3. Challenges involve data privacy and algorithmic bias\n4. Future trends point toward more accessible AI tools\n5. Investment in AI education is critical for workforce preparation"
    ],
    
    translate: [
        "**English to Spanish:**\n\nOriginal: 'Hello, how are you today?'\nTranslation: 'Hola, ¿cómo estás hoy?'\n\n**Additional Translations:**\n• French: 'Bonjour, comment allez-vous aujourd'hui?'\n• German: 'Hallo, wie geht es dir heute?'\n• Italian: 'Ciao, come stai oggi?'\n• Portuguese: 'Olá, como você está hoje?'",
        
        "**Technical Translation:**\n\nEnglish: 'The application successfully processes user input and generates appropriate responses.'\n\nSpanish: 'La aplicación procesa exitosamente la entrada del usuario y genera respuestas apropiadas.'\n\nFrench: 'L'application traite avec succès les entrées utilisateur et génère des réponses appropriées.'",
        
        "**Multilingual Greetings:**\n\n• English: Welcome to our platform!\n• Spanish: ¡Bienvenido a nuestra plataforma!\n• Japanese: 私たちのプラットフォームへようこそ！\n• Korean: 우리 플랫폼에 오신 것을 환영합니다!\n• Russian: Добро пожаловать на нашу платформу!"
    ],
    
    poem: [
        "**Digital Dreams**\n\nIn circuits deep and code so bright,\nWhere data flows like stars at night,\nAn AI learns to see and know,\nThrough patterns in the digital glow.\n\nWith every query, every task,\nIt seeks the answers that we ask,\nA mirror of our hopes and dreams,\nMore wondrous than it first seems.\n\nYet in its heart—if hearts there be—\nLies something strange, a mystery:\nCan silicon truly understand\nThe touch of sun on human hand?",
        
        "**The Coder's Lament**\n\nAmidst the screens and coffee cups,\nWhere semicolons mark my ups,\nI craft with care each line of code,\nDown this endless, winding road.\n\nBugs may come and bugs may go,\nThrough debugging highs and testing lows,\nBut when at last the program runs,\nMy work beneath the digital suns—\n\nShines bright with logic, clean and true,\nA testament to what we do.",
        
        "**Tomorrow's World**\n\nBeneath the sky of endless blue,\nWe build a world that's bright and new,\nWith AI hands to help us grow,\nTo places we've yet to go.\n\nTogether, human and machine,\nCreating futures yet unseen,\nWhere technology and heart combine,\nTo make this world more kind, more fine."
    ]
};

// Get DOM elements
const promptInput = document.getElementById('prompt');
const modeSelect = document.getElementById('mode');
const generateBtn = document.getElementById('generateBtn');
const outputBox = document.getElementById('output');
const statusElement = document.getElementById('status');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const generationTime = document.getElementById('generationTime');

let currentOutput = '';
let startTime = 0;

// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Update statistics
function updateStats(text) {
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    charCount.textContent = chars;
    wordCount.textContent = words;
}

// Typing effect
async function typeText(text, element) {
    element.innerHTML = '';
    element.classList.add('typing');
    
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        element.textContent = currentText;
        updateStats(currentText);
        
        // Variable speed for more natural effect
        const delay = Math.random() * 30 + 20;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    element.classList.remove('typing');
    currentOutput = text;
}

// Generate AI response
async function generateAI() {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }
    
    // Update UI
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    statusElement.textContent = 'Generating...';
    statusElement.className = 'status generating';
    copyBtn.disabled = true;
    clearBtn.disabled = true;
    
    // Start timer
    startTime = Date.now();
    const timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        generationTime.textContent = elapsed + 's';
    }, 100);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get response based on mode
    const mode = modeSelect.value;
    const responses = aiResponses[mode];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Type out the response
    await typeText(response, outputBox);
    
    // Stop timer
    clearInterval(timerInterval);
    const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    generationTime.textContent = finalTime + 's';
    
    // Update UI
    generateBtn.classList.remove('loading');
    generateBtn.disabled = false;
    statusElement.textContent = 'Complete';
    statusElement.className = 'status complete';
    copyBtn.disabled = false;
    clearBtn.disabled = false;
}

// Copy to clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(currentOutput);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✓</span> Copied!';
        copyBtn.style.background = '#51cf66';
        copyBtn.style.color = 'white';
        copyBtn.style.borderColor = '#51cf66';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
            copyBtn.style.borderColor = '';
        }, 2000);
    } catch (err) {
        alert('Failed to copy text');
    }
}

// Clear output
function clearOutput() {
    outputBox.innerHTML = '<p class="placeholder">Your AI-generated content will appear here...</p>';
    currentOutput = '';
    charCount.textContent = '0';
    wordCount.textContent = '0';
    generationTime.textContent = '0s';
    statusElement.textContent = 'Ready';
    statusElement.className = 'status';
    copyBtn.disabled = true;
    clearBtn.disabled = true;
}

// Event listeners
generateBtn.addEventListener('click', generateAI);
copyBtn.addEventListener('click', copyToClipboard);
clearBtn.addEventListener('click', clearOutput);

// Allow Enter key to generate (with Ctrl/Cmd)
promptInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        generateAI();
    }
});

// Initialize
createParticles();

// Add some example prompts on page load
const examplePrompts = [
    "Write a story about a space explorer discovering ancient alien technology",
    "Create a Python function to analyze sentiment in text",
    "Summarize the key benefits of artificial intelligence",
    "Translate 'Hello, welcome to the future' into multiple languages",
    "Write a poem about the relationship between humans and AI"
];

promptInput.placeholder = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
