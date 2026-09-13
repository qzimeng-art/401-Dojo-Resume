# Data Model

## Application

Required owner foreign key, company name, and position title; optional notes, validated job URL, job requirements, and applied date; status limited to `Applied`, `Interview`, `Offer`, or `Rejected`; server-managed timestamps. Owner is assigned by the API, never the client.

## ApplicationFile

Parent application, uploaded file under `application_files/`, client-provided type label, original filename, and timestamp. Upload is allowed only when the current user owns the parent application.

## Review

Owner, integer rating (default 5), comment, server-controlled `is_public` moderation flag, and timestamps. Public listing returns approved reviews; other access is owner-scoped.

## MasterResume

Owner foreign key, uploaded file under `master_resumes/`, server-derived type (`PDF`, `DOC`, or `DOCX`), original filename, byte size, and created/updated timestamps. Multiple rows are allowed and newest is displayed first.

Authentication uses Django's user model and allauth email records. There are no tailored-resume, communication, follow-up, or activity-event tables.
