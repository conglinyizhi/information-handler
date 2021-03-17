module.exports = {
    type: 'article',
    fetch({args}) {
        return {
            content: {
                markdown:require('fs').readFileSync(`assets/${args.mod}.md`,'utf-8')
            }
        }
    }
}
  