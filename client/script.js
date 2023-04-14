const form = document.getElementById('form');
const chat_container = document.getElementById('chat_container');

function chat_rows(ai, value, id) {
    return (
        `
        <div class="chat-row ${ai? "ai" : "user"}">
            <div class="chat-row-content">
                <div class="role">
                    <span>${ai ? "AI" : "user"}</span>
                </div>
                <div class="message" id=${id}>${value}</div>
            </div>
        </div>
    `
    )
}

function generateId() {
    const timeStamp = Date.now();
    const randomNum = Math.random();
    const endNum = randomNum.toString(8);

    return `${timeStamp}-${endNum}`;
}

const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData(form);

    chat_container.innerHTML += chat_rows(false, data.get('inputMessage'));
    form.reset();

    const responseId = generateId();
    // chat_container.innerHTML += chat_rows(true, " ", responseId);

    chat_container.scrollTop = chat_container.scrollHeight;

    // const responseMessage = document.getElementById(responseId);


    const response = await fetch('https://mychatgpt-lnnu.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: data.get('inputMessage')
        })
    })

    if (!response.ok) {
        throw new Error("Something wrong!");
    } else {
        const data = await response.json();
        chat_container.innerHTML += chat_rows(true, data.bot, responseId);
    }
}   

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e);
    }
})
