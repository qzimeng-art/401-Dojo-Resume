# Applications Feature

Applications live inside the dashboard rather than on a separate route.

- Board: four fixed columns for Applied, Interview, Offer, and Rejected.
- List: compact presentation of the same filtered collection.
- Search: case-insensitive company/position match.
- Stats: total and per-status counts from the current search result.

Add/edit share a responsive modal. Company and position are required; status defaults to Applied and date defaults to today. URL, requirements, notes, and files are optional. Editing uses `PUT`. Deletion asks for confirmation and refreshes data. Status changes occur through editing; the board is not draggable.
