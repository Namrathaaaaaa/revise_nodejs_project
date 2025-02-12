import { useState } from "react"
import axios from 'axios'


const Multer = ()=>{
    const[file,setFile] = useState(null)
    const[message,setMessage] = useState('')


    const handleFileChange = (e)=>{
        setFile(e.target.files[0])
    }

    const handleUpload = async()=>{
        if(!file){
            setMessage('Please select a File!')
            return
        }

        const formData = new FormData()
        formData.append("file",file)


        try {
            const res = await axios.post("http://localhost:3000/upload",formData,{
                headers: { "Content-Type": "multipart/form-data" },
            })
            setMessage(`File Uploaded : ${res.data.filePath}`)
        } catch (error) {
            setMessage('file not uploaded')
        }

        
    }


    return (
        <form onSubmit={handleUpload}> 
            <h1>File Transfer using Multer</h1>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
                <p>{message}</p>
            </div>
        </form>
    );


}

export default Multer