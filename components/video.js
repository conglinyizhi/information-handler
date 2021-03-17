module.exports = {
    type: 'video',
    fetch({args}) {
        return {url:args.url}
    }
  }