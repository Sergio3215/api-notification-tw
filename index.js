const express = require('express');
const app = express();
const fs = require('fs');

app.route("/api/notification")
    .get((req, res) => {

        const { id } = req.query;

        const response = id_recive(id);

        if(response.status) {
            res.status(200).json({
                status: true,
                audio: response.audio
            });
        }
        else {
            res.status(404).json({
                status: false,
                message: response.message
            });
        }
    });

const id_recive = (id) => {

    try {

        const audio = fs.readFileSync(`./sounds/${id}.mp3`).toString('base64');

        return {
            status: true,
            audio: audio
        };
    } catch (error) {
        return{
            status: false,
            message: "Audio file not found"
        }
    }
}

app.listen(3000, () => {
    console.log("API is running on port 3000");
});