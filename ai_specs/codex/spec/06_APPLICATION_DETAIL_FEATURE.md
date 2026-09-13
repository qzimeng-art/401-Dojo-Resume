# Application Detail and Editing

There is no standalone application-detail URL. Selected application context is shown within dashboard UI, and editing occurs in `ApplicationFormModal`.

Editable fields: company, position, job URL, status, applied date, requirements, and notes. New files may be queued by picker or drag-and-drop, deduplicated by filename, and uploaded after the application save succeeds.

Existing files are nested under `files` by the serializer and separately addressable at `/api/files/`. The current edit form adds attachments but is not a full attachment manager. No tailored resume or communication timeline exists.
