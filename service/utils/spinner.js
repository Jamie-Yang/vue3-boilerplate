import ora from 'ora'
import chalk from 'chalk'

const spinner = ora()
let lastMsg = null
let isPaused = false

export const logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    })
  }
  spinner.text = ' ' + msg
  lastMsg = {
    symbol: symbol + ' ',
    text: msg,
  }
  spinner.start()
}

export const stopSpinner = (persist) => {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    })
  } else {
    spinner.stop()
  }
  lastMsg = null
}

export const pauseSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop()
    isPaused = true
  }
}

export const resumeSpinner = () => {
  if (isPaused) {
    spinner.start()
    isPaused = false
  }
}

export const failSpinner = (text) => {
  spinner.fail(text)
}
