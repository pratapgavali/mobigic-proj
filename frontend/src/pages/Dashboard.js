import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { fileService } from '../apis';
import { BASE_URL } from '../apis/auth';
import FileList from '../components/FileList';

function Dashboard() {

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        id: ''
    });

    const [files, setFiles] = useState([]);
    const [fileCode, setFileCode] = useState();
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');

    const handleClick = data => e => {
        console.log(data)
        e.preventDefault();
        if (data.action === 'Download') {
            console.log('download');
            fileService.downloadFileByCode({ fileCode: fileCode }).then((response) => {
                if (response) {
                    setFileCode('');
                    console.log(`${BASE_URL}/${response.data.file[0].file}`)
                    fetch(`${BASE_URL}/${response.data.file[0].file}`)
                        .then(response => response.blob())
                        .then(blob => {
                            const link = document.createElement("a");
                            link.href = URL.createObjectURL(blob);
                            link.download = response.data.file[0].name;
                            link.click();
                            document.removeChild(link);
                        })
                        .catch(console.error);
                }
            })
        }
        if (data.action === 'Upload') {
            const formState = new FormData();
            formState.append('fileToUpload', file);
            formState.append('userId', user.id);
            fileService.uploadFile(formState).then((response) => {
                console.log(response)
                toast.success('File uploaded successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                fileService.getByUser({ userId: user.id }).then((res) => {
                    if (res.data) {
                        setFiles(res.data.files);
                        console.log(res.data);
                    }
                })
            })
        }
        if (data.action === 'Delete') {

            fileService.deleteFileByCode({ fileCode: fileCode }).then((response) => {
                toast.success('File deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                fileService.getByUser({ userId: user.id }).then((res) => {
                    if (res.data) {
                        setFiles(res.data.files);
                        console.log(res.data);
                    }
                })
            })
        }
    }

    function handleChange(e) {
        if (e.target.name === 'fileToUpload') {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            setFileName(e.target.value);
        } else {

            setFileCode(e.target.value);
        }
    }

    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem('user'));
        console.log(userObj);
        if (userObj) {
            setUser(userObj);
            fileService.getByUser({ userId: userObj.id }).then((res) => {
                if (res.data) {
                    setFiles(res.data.files);
                    console.log(res.data);
                }
            })
        }
    }, []);

    return (
        <div class="card text-center" >
            <div class="card-header">
                Hello {`${user.firstname} ${user.lastname}`}
            </div>
            <div class="card-body">
                <div className="row bg-light p-4">
                    <div className="col-6">
                        Click on upload to upload file
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success" data-toggle="modal" data-target="#uploadModal">Upload</button>
                    </div>

                    <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Upload File</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div className="form-group">
                                        <label>Select File to upload</label>
                                        <input type="file" name="fileToUpload" value={fileName} className="form-control" placeholder="Select file" onChange={handleChange} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleClick({ action: 'Upload' })} >upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row bg-light mt-2 p-3">
                        <div className="col-4">
                            <h3>File Name</h3>
                        </div>
                        <div className="col-4">
                            <h3>File Code</h3>
                        </div>
                        <div className="col-4">
                            <h3>Action</h3>
                        </div>
                    </div>
                    {files.map((file) => {
                        return (<FileList file={file} onClick={handleClick} onChange={handleChange} fileCode={fileCode} />)
                    })}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Dashboard