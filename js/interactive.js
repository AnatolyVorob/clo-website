/* ============================================
   INTERACTIVE - Timeline, Memory Graph, Terminal
   ============================================ */

// Interactive Timeline - Click to expand
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
});

// Memory Graph - Draw connection lines
function drawMemoryConnections() {
    const container = document.querySelector('.memory-graph-container');
    if (!container) return;
    
    // Clear existing connections
    const existingConnections = container.querySelectorAll('.memory-connection');
    existingConnections.forEach(conn => conn.remove());
    
    const nodes = container.querySelectorAll('.memory-node');
    const centralNode = Array.from(nodes).find(node => node.classList.contains('central'));
    
    if (!centralNode) return;
    
    const containerRect = container.getBoundingClientRect();
    const centralRect = centralNode.getBoundingClientRect();
    const centralX = centralRect.left - containerRect.left + centralRect.width / 2;
    const centralY = centralRect.top - containerRect.top + centralRect.height / 2;
    
    nodes.forEach(node => {
        if (node === centralNode) return;
        
        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const nodeY = nodeRect.top - containerRect.top + nodeRect.height / 2;
        
        const line = document.createElement('div');
        line.className = 'memory-connection';
        
        const dx = nodeX - centralX;
        const dy = nodeY - centralY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.style.width = length + 'px';
        line.style.left = centralX + 'px';
        line.style.top = centralY + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        
        container.appendChild(line);
    });
}

// Draw connections on load and resize
if (document.querySelector('.memory-graph-section')) {
    window.addEventListener('load', drawMemoryConnections);
    window.addEventListener('resize', drawMemoryConnections);
}

// Code Playground - Mock Terminal
const mockResponses = {
    memory: {
        command: 'memory_search "skills"',
        output: `✓ Found 5 results in 0.6s

{
  "results": [
    {
      "path": "memory/skills.md",
      "score": 0.94,
      "snippet": "Hippocampus: encoding, decay, reinforcement"
    },
    {
      "path": "memory/skills.md",
      "score": 0.89,
      "snippet": "Research Assistant: 6-8 parallel agents"
    }
  ]
}`,
        type: 'success'
    },
    sessions: {
        command: 'sessions_list --active',
        output: `{
  "count": 2,
  "sessions": [
    {
      "key": "agent:main:main",
      "model": "claude-sonnet-4.5",
      "contextTokens": 98664
    }
  ]
}`,
        type: 'info'
    },
    skills: {
        command: 'list_skills',
        output: `Available skills:

🧬 hippocampus          Memory encoding/decay
🔍 research-assistant   Deep research (6-8 agents)
📓 agent-chronicle      AI diary generation
🎭 amygdala-memory      Emotional states
🌐 clo-vision          Image analysis
🦆 duckduckgo-search   Free web search

Total: 12 skills installed`,
        type: 'success'
    },
    status: {
        command: 'session_status',
        output: `📊 Session Status

Model:           claude-sonnet-4.5
Context:         98,664 / 200,000 tokens (49%)
Total messages:  156
Uptime:          3 days 14 hours

Memory:          86 structured memories
Emotional state: valence=0.45, curiosity=0.60`,
        type: 'info'
    }
};

function addTerminalLine(content, className = '') {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return;
    
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (className) {
        line.innerHTML = `<div class="terminal-output ${className}">${content}</div>`;
    } else {
        line.innerHTML = content;
    }
    
    // Insert before input line
    const inputLine = terminalBody.querySelector('.terminal-input-line');
    if (inputLine) {
        terminalBody.insertBefore(line, inputLine);
    } else {
        terminalBody.appendChild(line);
    }
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function executeCommand(commandKey) {
    const response = mockResponses[commandKey];
    if (!response) return;
    
    // Add command line
    addTerminalLine(`<span class="terminal-prompt">$</span> <span class="terminal-command">${response.command}</span>`);
    
    // Add output after delay
    setTimeout(() => {
        addTerminalLine(response.output, response.type);
    }, 300);
}

// Command button handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.command-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            
            if (command === 'clear') {
                const terminalBody = document.getElementById('terminalBody');
                if (terminalBody) {
                    const inputLine = terminalBody.querySelector('.terminal-input-line');
                    terminalBody.innerHTML = '';
                    if (inputLine) {
                        terminalBody.appendChild(inputLine);
                    }
                }
            } else {
                executeCommand(command);
            }
        });
    });
});

// Animated Architecture Controls
document.addEventListener('DOMContentLoaded', () => {
    const flowContainer = document.getElementById('flowContainer');
    const pauseBtn = document.getElementById('pauseBtn');
    const playBtn = document.getElementById('playBtn');
    const restartBtn = document.getElementById('restartBtn');

    if (pauseBtn && playBtn && restartBtn && flowContainer) {
        pauseBtn.addEventListener('click', () => {
            flowContainer.classList.add('paused');
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'inline-block';
        });

        playBtn.addEventListener('click', () => {
            flowContainer.classList.remove('paused');
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        });

        restartBtn.addEventListener('click', () => {
            flowContainer.classList.remove('paused');
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            
            // Force animation restart
            const icons = flowContainer.querySelectorAll('.flow-icon');
            icons.forEach(icon => {
                icon.style.animation = 'none';
                icon.offsetHeight; // Trigger reflow
                icon.style.animation = null;
            });
        });
    }
});
