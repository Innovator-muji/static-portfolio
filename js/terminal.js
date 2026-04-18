document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    const commands = {
        help: `
<span class="info">Available commands:</span>
  <span class="success">about</span>      - Display brief information about me
  <span class="success">skills</span>     - List my technical skills
  <span class="success">projects</span>   - Show my recent DevOps projects
  <span class="success">contact</span>    - How to reach me
  <span class="success">clear</span>      - Clear the terminal screen
  <span class="success">whoami</span>     - Display current user
`,
        about: `
<span class="info">Hi, I'm Parvesh Mushraf P.</span>
I'm an AWS DevOps Engineer with extensive experience in cloud infrastructure, CI/CD, and automation.
Currently working at Kaaylabs Private Limited.
`,
        skills: `
<span class="info">Technical Skills:</span>
  <span class="success">Cloud:</span>         AWS, On-premises
  <span class="success">Containers:</span>    Docker, Kubernetes, AWS ECS
  <span class="success">IaC:</span>           Terraform
  <span class="success">CI/CD:</span>         Jenkins, GitHub Actions
  <span class="success">Monitoring:</span>    Prometheus, Grafana, CloudWatch, Uptime Kuma
  <span class="success">OS & Scripting:</span>Linux, Ubuntu, Windows, Shell-scripting
`,
        projects: `
<span class="info">Recent Projects:</span>
  1. <span class="success">Serverless Image Processing:</span> Built with AWS Lambda, CloudFront, and Node.js.
  2. <span class="success">Blue/Green ECS Deployments:</span> Jenkins CI/CD to ECS Fargate via CodeDeploy.
  3. <span class="success">Multi-Env Terraform:</span> IaC consistency across dev, QA, UAT, and prod environments.
<br>Type 'contact' if you want to know more!
`,
        contact: `
<span class="info">Contact Information:</span>
  <span class="success">Email:</span>    parveshdevops19@gmail.com
  <span class="success">Phone:</span>    +91-9952513323
`,
        whoami: `
<span class="success">guest</span>
`
    };

    function processCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        
        // Print the command that was run
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line';
        promptLine.innerHTML = `<span class="terminal-prompt">guest@portfolio:~$</span> ${cleanCmd}`;
        terminalOutput.appendChild(promptLine);

        if (cleanCmd === '') {
            return;
        }

        if (cleanCmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-output';

        if (commands[cleanCmd]) {
            responseLine.innerHTML = commands[cleanCmd];
        } else {
            responseLine.innerHTML = `<span class="error">Command not found: ${cleanCmd}. Type 'help' for available commands.</span>`;
        }

        terminalOutput.appendChild(responseLine);
        
        // Scroll to bottom
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                processCommand(cmd);
                terminalInput.value = '';
            }
        });
        
        // Focus input when clicking anywhere in terminal body
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
});
