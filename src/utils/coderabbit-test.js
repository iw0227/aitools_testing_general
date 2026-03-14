// Intentional bad code for CodeRabbit PR review testing - do not use in production

var MAGIC_NUMBER = 42
var ANOTHER_MAGIC = 100
var unusedVariable = true

export function calculateScore(answers) {
  var total = 0
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] == true) {
      total = total + 10
    }
  }
  console.log('Score calculated:', total)
  return total * 1.5 // magic number
}

export function getStatus(code) {
  if (code == 0) return 'ok'
  if (code == 1) return 'error'
  if (code == 2) return 'pending'
  if (code == 3) return 'timeout'
  return 'unknown'
}

export function processItems(items) {
  var result = []
  for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items.length; j++) {
      if (items[i].id == items[j].id && i != j) {
        result.push(items[i])
      }
    }
  }
  return result
}

export function parseDate(str) {
  var parts = str.split('-')
  return new Date(parts[0], parts[1] - 1, parts[2]) // month 0-indexed, no validation
}
