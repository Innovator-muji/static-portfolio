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
<span class="info">Hi, I'm Parvesh Mushraf.</span>
I'm a DevOps Engineer with 2.5+ years of experience.
I specialize in building scalable, reliable, and automated cloud infrastructure.
My core focus is on AWS, CI/CD, and Infrastructure as Code.
`,
        skills: `
<span class="info">Technical Skills:</span>
  <span class="success">AWS:</span>       EC2, S3, RDS, IAM, VPC, Lambda, CloudFront
  <span class="success">CI/CD:</span>     Jenkins, GitHub Actions, GitLab CI
  <span class="success">Containers:</span> Docker, Kubernetes
  <span class="success">IaC:</span>       Terraform, CloudFormation
  <span class="success">Monitoring:</span> Prometheus, Grafana, CloudWatch
  <span class="success">OS:</span>        Linux (Ubuntu, CentOS), Bash Scripting
`,
        projects: `
<span class="info">Recent Projects:</span>
  1. <span class="success">CI/CD Pipeline:</span> Blue-Green deployment using Jenkins and ECS.
  2. <span class="success">Multi-Env Setup:</span> Infrastructure provisioning with Terraform workspaces.
  3. <span class="success">K8s Monitoring:</span> Setup Prometheus & Grafana stack on EKS.
<br>Type 'contact' if you want to know more!
`,
        contact: `
<span class="info">Contact Information:</span>
  <span class="success">Email:</span>    your-email@example.com
  <span class="success">LinkedIn:</span> linkedin.com/in/your-profile
  <span class="success">GitHub:</span>   github.com/your-username
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
