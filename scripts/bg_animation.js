const canvas = document.getElementById('animated-background');
const main = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
const ctx = canvas.getContext('2d');
var casesWidth = aside.offsetWidth;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];

function createParticle(x, y) {
    return {
        x,
        y,
        size: Math.random() * 50 + 1,
        heading: Math.random() * Math.PI * 2,
        //speed: Math.random(),
        speed: 1,
        color: ['rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 255, 0.5)'][Math.floor(Math.random() * 2)],
    };
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const mod = (a, n) => a - Math.floor(a/n) * n
function updateParticles() {
    //move particles when currently selected cases are collapsed/expanded
    /*
    if (casesWidth != aside.offsetWidth) {
        particles.forEach((particle) => {
            particle.x += (aside.offsetWidth - casesWidth) / 2;
        });
        casesWidth = aside.offsetWidth;
    }
    */
    particles.forEach((particle) => {
        particle.x += Math.cos(particle.heading) * particle.speed;
        particle.y += Math.sin(particle.heading) * particle.speed;
        const a = Math.atan2(window.innerHeight/2 - particle.y, window.innerWidth/2 /*+ aside.offsetWidth*/ - particle.x) - particle.heading;
        const angle = mod(a + Math.PI, Math.PI*2) - Math.PI;
        //const angle = Math.atan2(window.innerHeight / 2 - particle.y, window.innerWidth / 2 - particle.x) - particle.heading;
        //console.log(mod(-10, 360), angle * 57.2958, particle.heading * 57.2958);
        particle.heading += angle * 0.0001 * Math.sqrt(Math.pow(window.innerWidth / 2 - particle.x /*+ aside.offsetWidth*/, 2) + Math.pow(window.innerHeight / 2 - particle.y, 2));
        particle.heading += Math.random() * 0.2 - 0.1;
        if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
            particle.x = canvas.width / 2;
            particle.y = canvas.height / 2;
        }
    });
}
/*
function updateParticles() {
    let index = 0;
    function updateSingleParticle() {
        if (index < particles.length) {
            const particle = particles[index];
            particle.x += Math.cos(particle.heading) * particle.speed;
            particle.y += Math.sin(particle.heading) * particle.speed;
            const a = Math.atan2(window.innerHeight / 2 - particle.y, window.innerWidth / 2 - particle.x) - particle.heading;
            const angle = mod(a + Math.PI, Math.PI * 2) - Math.PI;
            particle.heading += angle * 0.0001 * Math.sqrt(Math.pow(window.innerWidth / 2 - particle.x, 2) + Math.pow(window.innerHeight / 2 - particle.y, 2));
            particle.heading += Math.random() * 0.2 - 0.1;

            if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
                particle.x = canvas.width / 2;
                particle.y = canvas.height / 2;
            }
            index++;
            setTimeout(updateSingleParticle, 1000);
        }
    }

    // Start the update process
    updateSingleParticle();
}
*/
function animate() {
    createParticle(window.innerWidth / 2, window.innerHeight / 2);
    drawParticles();
    updateParticles();
    setTimeout(animate, 100);
}

window.addEventListener('resize', () => {
    pwidth = canvas.width;
    pheight = canvas.height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.forEach((particle) => {
        particle.x += (canvas.width - pwidth) / 2;
        particle.y += (canvas.height - pheight) / 2;
    });
});
for (let i = 0; i < 30; i++) {
    //particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    particles.push(createParticle(window.innerWidth / 2 /*+ aside.offsetWidth*/ + Math.random()*300 - 150, window.innerHeight / 2 + Math.random()*300 - 150));
}
animate();