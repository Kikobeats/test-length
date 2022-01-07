'use strict'

const { URLSearchParams } = require('url')
const { nanoid } = require('nanoid')
const fs = require('fs')

const template = fs.readFileSync('template.html', 'utf-8')

const query = input => Object.fromEntries(new URLSearchParams(input))

module.exports = (req, res) => {
  const url = req.url.substring(1)
  const { size } = query(url)

  if (size !== undefined) {
    const hash = nanoid(size)
    return res.redirect(`/${hash}`)
  } else {
    res.setHeader('Content-Type', 'text/html')
    return res.send(template.replaceAll('{{size}}', url.length))
  }
}
