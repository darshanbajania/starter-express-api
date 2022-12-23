const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.all('/', async (req, resp) => {

    let gToken = req.body.gToken
    let formData = new FormData;
    // formData.append('secret', '6LfvcJ8jAAAAAGIDiRhcdKo5d3hGDmJ_s7RfhwVZ')
    formData.append('secret', process.env.gCaptchaKey)
    formData.append('response', gToken)
    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: formData
    }).then((response) => response.json())
        .then((data) => {
            console.log(data)
            resp.send(data)
        });



})
app.listen(process.env.PORT || 3001)