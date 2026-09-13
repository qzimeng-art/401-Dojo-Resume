# Data Model

## Application

Required owner foreign key, company name, and position title; optional notes, validated job URL, job requirements, and applied date; status limited to `Applied`, `Interview`, `Offer`, or `Rejected`; server-managed timestamps. Owner is assigned by the API, never the client.

## ApplicationFile

Parent application, uploaded file under `application_files/`, client-provided type label, original filename, and timestamp. Upload is allowed only when the current user owns the parent application.

## Review

Owner, integer rating (default 5), comment, server-controlled `is_public` moderation flag, and timestamps. Public listing returns approved reviews; other access is owner-scoped.

Authentication uses Django's user model and allauth email records. There are no master-resume, tailored-resume, communication, follow-up, or activity-event tables.
