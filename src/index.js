'use strict'

const { URLSearchParams } = require('url')
const { readFileSync } = require('fs')
const { nanoid } = require('nanoid')
const { join } = require('path')

const template = readFileSync(join(__dirname, 'template.html'), 'utf8')

const query = input => Object.fromEntries(new URLSearchParams(input))

module.exports = (req, res) => {
  const url = req.url.substring(1)
  const { size } = query(url)

  if (size !== undefined) {
    const hash = nanoid(size)
    return res.redirect(`/${hash}`)
  } else {
    res.setHeader('Content-Type', 'text/html')
    const size = url.length || 8000
    const body = template
      .replace(/{{size}}/g, size)
      .replace(/{{humanSize}}/g, Number(size).toLocaleString('en'))
    return res.send(body)
  }
}
