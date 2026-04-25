// ✅ Correct initialization
(function () {
    emailjs.init("RkR6zcwhSwusqmgKG"); // 🔴 replace this
})(); // Replace with your EmailJS public key

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

    emailjs.send("service_gql9a0m", "template_5ywrkpd", {
        to_email: "adhilek1@gmail.com",
        from_name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        message: `New service inquiry from ${data.name}. Phone: ${data.phone}, Email: ${data.email}, Service: ${data.service}.`
    })
    .then(function () {
        setQ("✅ Thank you! We will contact you soon at " + data.phone);
        hideServices();
        document.getElementById("input-section").style.display = "none";
    })
    .catch(function (error) {
        console.error(error);
        setQ("❌ Error sending message.");
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