# Validation and Error Handling

Company and position are required. Status must be a model choice. Job URL may be blank/null but must otherwise be valid. Applied date may be blank/null and must otherwise be a valid date. File uploads require a parent application owned by the caller.

Keep API errors field-addressable. The web form combines returned field messages inline; mobile uses inline text or alerts. Failures must not fabricate success, and input should remain available where practical.

Unauthenticated requests return auth errors. Another user's records must never be disclosed. Client deletes require confirmation. Never log credentials, OAuth tokens, or uploaded document contents.
