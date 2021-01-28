import React, { Fragment, Suspense, useState } from 'react'

function Upload() {

  const [selectedFile, setSelectedFile] = useState()
  const [isSelected, setIsSelected] = useState(false)

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0])
    setIsSelected(true)
  }

  const handleSubmission = async () => {

    const payload = await fetch('/storage/presigned_post')
    const jsonPayload = await payload.json()
    const url = jsonPayload.url
    const formData = new FormData()

    Object.keys(jsonPayload.fields).forEach(key => formData.append(key, jsonPayload.fields[key]))
    formData.append("file", selectedFile)

    const xml = await fetch(url, { method: 'POST', body: formData })
    const xmlPayload = await xml.text()

    const uploadURL = new DOMParser().parseFromString(xmlPayload, 'application/xml').getElementsByTagName('Location')[0].textContent

    console.log(uploadURL)



  }

  const FileDescription = ({ file }) => {
    if (file !== undefined) {
      return (
        <p>
          Name: {file.name}<br />
          Type: {file.type}<br />
          Size: {file.size}
        </p>
      )
    } else {
      return <p></p>
    }
  }

  return (
    <Suspense fallback={<h1>Fetching URL...</h1>}>
      <input type="file" onChange={changeHandler} />
      <FileDescription file={selectedFile} />
      <button onClick={handleSubmission} disabled={!isSelected}>Upload</button>
    </Suspense>
  )
}

export default Upload