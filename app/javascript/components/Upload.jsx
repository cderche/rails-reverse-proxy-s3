import React, { Suspense, useState } from 'react'
import axios from 'axios'

function Upload() {

  const [selectedFile, setSelectedFile] = useState()
  const [isSelected, setIsSelected] = useState(false)
  const [progress, setProgress] = useState(0.0)

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0])
    setIsSelected(true)
  }

  const onUploadProgress = (e) => {
    const percent = Math.round((e.loaded * 100) / e.total)
    console.log(percent)
    setProgress(percent)
  }

  const handleSubmission = async () => {

    const payload = await fetch('/storage/presigned_post')
    const jsonPayload = await payload.json()
    const url = jsonPayload.url
    console.log(url)
    const formData = new FormData()

    Object.keys(jsonPayload.fields).forEach(key => formData.append(key, jsonPayload.fields[key]))
    formData.append("file", selectedFile)

    try {
      const { data } = await axios.post(url, formData, {onUploadProgress} )
      const uploadURL = new DOMParser().parseFromString(data, 'application/xml').getElementsByTagName('Location')[0].textContent
      console.log(uploadURL)
    } catch {
      console.error(error)
    }

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