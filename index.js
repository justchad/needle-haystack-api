const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const items = []

app.get('/haystack', (req, res) => {

    console.log(req);

    const url = req.query.url;
    const needle = req.query.needle;

    axios.get(url)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            $(needle, html).each(function(){
                const found = $(this).text()
                items.push({
                    found
                })
            })

            res.json(items)

        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

//
// const url = "https://www.cars.com/vehicledetail/d12a279b-02ce-4a61-aee2-6f97e654733b/?aff=national";
//
// $.get( url, ( html ) => {
//   [ ...$( html ).find( "#vehicle-reviews .sds-rating--big .sds-rating__count" ) ].forEach(( el ) => {
//     const rating = $(el).text();
//     console.log(rating)
//   })
// })
