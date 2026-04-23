emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

let step = 0;
let data = {};

function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.classList.toggle('show');
}

function nextStep() {
    let input = document.getElementById("input").value.trim();

    if (!input) return; // Don't proceed if input is empty

    if (step === 0) {
        data.name = input;
        setQ("Great! What's your phone number?");
    }
    else if (step === 1) {
        data.phone = input;
        setQ("Thanks! What's your email address? (or type 'skip' to skip)");
    }
    else if (step === 2) {
        if (input.toLowerCase() === 'skip') {
            data.email = 'Not provided';
        } else {
            data.email = input;
        }
        showServices();
    }

    step++;
    document.getElementById("input").value = "";
}

function selectService(service) {
    data.service = service;

    // Send email with collected data to info.typingcenter4123@gmail.com
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: "info.typingcenter4123@gmail.com",
        from_name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        message: `New service inquiry from ${data.name}. Phone: ${data.phone}, Email: ${data.email}, Service: ${data.service}. We will call you soon!`
    })
    .then(() => {
        setQ("✅ Thank you! We will contact you soon at " + data.phone + ". Have a great day!");
        hideServices();
        document.getElementById("input-section").style.display = "none";
    })
    .catch(() => {
        setQ("❌ Sorry, there was an error. Please try again or contact us directly.");
    });
}

function showServices() {
    document.getElementById("input-section").style.display = "none";
    document.getElementById("services-section").style.display = "block";
    setQ("Please select the service you're interested in:");
}

function hideServices() {
    document.getElementById("services-section").style.display = "none";
}

function setQ(text) {
    document.getElementById("question").innerText = text;
}