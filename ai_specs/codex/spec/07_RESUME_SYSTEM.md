# Master Resume and Supporting Files

The project supports uploaded resume documents, not resume authoring or parsing.

Users may attach PDF, DOC/DOCX, TXT, or other files to an application. The web client labels common extensions and uploads each file as multipart data after saving its parent. The backend stores the original filename, type label, and file path.

Users may also upload a profile-level master resume in PDF, DOC, or DOCX format. The backend records owner, type, original name, size, and timestamps at `/api/master-resume/`; the dashboard/profile displays the newest row. The UI does not currently replace or delete earlier rows automatically.

Authenticated rows belong to the signed-in user. Unauthenticated requests are allowed by the current viewset and map to a shared `demo_user`; demo uploads also use localStorage as a fallback. This behavior is an as-built compatibility detail and should receive security/product review before production reliance.

There is no structured editor, PDF generator, tailored copy, parsing, or matching.
