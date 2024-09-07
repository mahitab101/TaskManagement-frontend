import CreateTaskForm from "./CreateTaskForm";

export default function CreateTask() {
  
  return (
    <div className="d-flex justify-content-end align-items-end mb-4">
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Task
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        // tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                New Task
              </h1>
              
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
          <CreateTaskForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
