import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import File from './file.png'
import Warning from './warning.png'
import {storage} from './firebase'
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage'
import Axios from 'axios'

const CourseUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const [courseState, setCourseState] = useState({})
    const [fileLink, setFileLink] = useState('')
    const [ytLink, setYtLink] = useState('')
    const [courseData, setCourseData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (location.pathname === "/upload-course" && location.state) {
        const { id, upl, name, sub_id, sub_name } = location.state
        setCourseState({ id, upl, name, sub_id, sub_name })
        Axios.get('http://localhost:3001/api/getCourseInfo', {params: {id:id}})
        .then((response)=>{
            setCourseData(response.data[0]) 
            setIsLoading(false)
        })

      }
    }, [location.pathname])

    useEffect(() => {
        console.log(courseData.curs_name);
      }, [courseData]);

    const formHandler = (e) => {
        e.preventDefault()
        uploadFiles(selectedFile)       
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setIsFileUploaded(true)
      }

    const handleGoBack = () => {
        navigate('/courses-list', {state:{sub_id:courseState.sub_id, upl:courseState.upl, name:courseState.sub_name}})
    }

    const uploadFiles = (file) => {
        if(!file) return (alert("Please select a file to upload"))
    
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        
            setProgress(prog)
        }, (err)=> console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url => 
                Axios.post('http://localhost:3001/api/addCourse', {id:courseState.id, link_yt:ytLink, link_file:url })
                .then(()=>{
                console.log("Course Updated !")
            })
            )
        }
        )
    }
    if (isLoading) {
        return <div>Loading...</div>;
      }

    return(
        <form className="courseUpload" onSubmit={formHandler}>
            <h2>
      Complete the form to upload the{" "}
      <div className="denumiremtf">{courseState.name}</div> course
    </h2>
    {(courseData.curs_yt?.length > 1 || courseData.curs_file?.length > 1) && (
      <div className="attention-div">
        <img src={Warning} />
        <h6>
          Attention you already have uploaded the
          {courseData.curs_yt?.length > 1 && " Youtube Link"}
          {courseData.curs_yt?.length > 1 && courseData.curs_file?.length > 1 && " and the"}
          {courseData.curs_file?.length > 1 && " File "}!
          <br />
          <br /> If you upload something new, the old data will be lost!
        </h6>
      </div>
    )}
            
            <label>
                Youtube Link :
                <input className="ytlink-upl" type="text" value={ytLink} onChange={(e) => setYtLink(e.target.value)}/>
            </label>
            <label className={isFileUploaded ? `upl-file-uploaded` :`upl-file`}>
                {isFileUploaded ? `File: ${selectedFile.name}`:"Upload the courses file"}
                <input className="file-upl" type="file" onChange={handleFileChange}/>
                <img src={File} />
            </label>
            <div className="upload-btns">
                <button className="bck-btn" onClick={handleGoBack}>Go Back</button>
                <button className="upl-btn" type="submit">Upload</button>
            </div>
            {progress!==0 && <h5>Uploaded {progress}%</h5>}
        </form>
    )
}

export default CourseUpload