import React from 'react'

function FileList(props) {
    const { file, onClick, onChange, fileCode } = props;
    // onClick={onClick({ action: 'Download', id: file._id })}
    return (
        <div className="row bg-light mt-2 p-3">
            <div className="col-4">
                {file.name}
            </div>
            <div className="col-4">
                {file.productCode}
            </div>
            <div className="col-4">
                <button className="btn btn-success mr-2" data-toggle="modal" data-target="#downloadModal">Download</button>
                <button className="btn btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>
            </div>

            <div class="modal fade" id="downloadModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Download File</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="form-group">
                                <label>Enter file code to download</label>
                                <input type="fileCode" name="fileCode" value={fileCode} className="form-control" placeholder="Enter fileCode" onChange={onChange} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={onClick({ action: 'Download', id: file._id })} >Download</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete File</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="form-group">
                                <label>Enter file code to delete</label>
                                <input type="fileCode" name="fileCode" value={fileCode} className="form-control" placeholder="Enter fileCode" onChange={onChange} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" onClick={onClick({ action: 'Delete', id: file._id })} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FileList