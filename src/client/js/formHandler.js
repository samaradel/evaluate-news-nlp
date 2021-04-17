function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formURL = document.getElementById('url').value

    if (Client.checkForURL(formURL)) {
        console.log("::: Form Submitted :::")

        async function postData(url, data) {
            const requestOptions = {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: data }),
                redirect: 'follow'
            };
            const response = await fetch(url, requestOptions);
            try {
                const newData = response.json();
                return newData;
            } catch (error) {
                console.log('error', error);
            }
        };

        postData('http://localhost:3000/api', formURL)

            .then(function (res) {
                document.getElementById('polarity').innerHTML = `Polarity: ${res.score_tag}`;
                document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
                document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
                document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
                document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
            })
    } else {
        alert('Invalid URL, please try with a valid URL.');
    }
}


export { handleSubmit }
