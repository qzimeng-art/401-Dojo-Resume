# Product Behavior

Visitors can use marketing/legal pages, view approved testimonials, register, sign in, or open `/demo`. Demo mode loads local sample applications, warns that changes are not saved, and offers signup.

Authenticated users enter `/dashboard`, which fetches only their applications. They can search by company/position, switch board/list views, add or edit in a modal, upload application files, delete after confirmation, upload/view a master resume from dashboard/profile controls, log out, and submit a review for moderation.

Loading indicators cover authentication and application fetches. Form validation errors appear in the modal. API failures must not fabricate success. Logout clears local credentials even if server logout fails.

Mobile navigation depends on authentication. Signed-in users receive Dashboard and Application List; signed-out users receive Welcome, Login, Signup, and guest dashboard access. Tokens persist in AsyncStorage.
