const axios = require('axios')
const fs = require('fs')

async function load() {
  const response = require('./mapFile/中华人民共和国.json')
  // fs.writeFileSync('220000_full.json', JSON.stringify(response.data))
  response.features.forEach(async element => {
    let { name, adcode } = element.properties
    console.log(name, adcode)
    await loop(adcode, name)
  })
}

async function loop(value, name) {
  const response = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${value}_full.json`)
  fs.writeFileSync(`./testFile/${name}.json`, JSON.stringify(response.data))

  response.data.features.forEach(async element => {
    let { name, adcode } = element.properties
    const response2 = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`)
    fs.writeFileSync(`./testFile/${name}.json`, JSON.stringify(response2.data))
  })
}

load()
