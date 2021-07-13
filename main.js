const API = 'https://kinder-kids-server.herokuapp.com'

window.onload = () => {
  const spinner = document.querySelector('.spinner')
  const button = document.querySelector('.button')
  const emptyItems = document.querySelector('.emptyItems')
  const downloadRef = document.querySelector('.downloadRef')
  const firstStep = document.querySelector('.firstStep')
  const secondStep = document.querySelector('.secondStep')

  fetch(`${API}/item/unpublished`)
    .then((response) => response.json())
    .then((items) => {
      spinner.classList.add('hiddenSpinner')

      if (items.length === 0) {
        button.classList.add('hide')
      } else {
        emptyItems.classList.add('hide')
      }

      button.innerHTML = `Descargar ${items.length} productos`
    })

  button.onclick = () => {
    fetch(`${API}/item/download`)
      .then((response) => response.text())
      .then((fileContent) => {
        downloadRef.href = `data:text/csv;charset=utf-8,${fileContent}`
        downloadRef.download = `${Date.now()}.csv`
        downloadRef.click()

        button.classList.add('disabledButton')
        // button.innerHTML = `¡Descargado!`

        firstStep.classList.add('toLeftStep')
        secondStep.classList.remove('toRightStep')
      })
      .catch((error) => console.warn(error))
  }
}
