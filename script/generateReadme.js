const fs = require('fs')
const services = JSON.parse(fs.readFileSync('./services.json').toString())
const applications = JSON.parse(fs.readFileSync('./applications.json').toString())
const template = fs.readFileSync('./script/template.md').toString()

const toMarkdown = items => items
  .map(x => x.category)
  .filter((x, i, a) => a.indexOf(x) == i)
  .sort()
  .map(category => ({
    category,
    items: items
      .filter(x => x.category === category)
      .map(x => `- [${x.name}](${x.url}) - ${x.description}`)
      .join('\n')
  }))
  .map(({ category, items }) => category ? `## ${category}\n\n${items}` : items)
  .join('\n\n')

fs.writeFileSync('README.md', template
  .replace("{{ applications }}", toMarkdown(applications))
  .replace("{{ services }}", toMarkdown(services))
)