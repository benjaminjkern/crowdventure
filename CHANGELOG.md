# Crowdventure Changelog

### Version 0.1.5 (Current)

> Release Date: 7/31/20

##### TLDR:
- Pictures are done through Pixabay now, meaning you don't have to go find a URL for each image!
- Switching between pages is a lot faster and smoother now!
- Lots of aesthetic changes to be a little bit more intuitive and consistent!
- Bug fixes that should've been done long ago!
- This Changelog is now public!

##### Full list of changes:
- Added Changelog as well as link to changelog in the version text, also reads the version from the package.json instead of manually putting it in every time
- Adjusted Picture height for page links on home screen as well as on each page so that they feel more intuitive
- Added profile pic to navbar at top of screen if you are logged in
- Made pictures on cards and on node page have a small white border, looks nice
- Moved create new page on both home and account screens show up before featured pages
- Fixed bug where making a noncanon suggestion canon wouldnt reload page
- You can now only edit suggestions if you own the suggestion, or own the page AND the suggestion is canon. This is to prevent the owners of pages just changing every single suggestion that is thrown at it, it is so that the owner of the page can make small adjustments. In the future, this might be fixed with a "suggest suggestion" feature (lol) but it was a bug for now and I fixed it.
- Made the card have a padding on the top so it is centered in the card, also so the settings button doesnt interfere with it
- Fixed bug where un-featuring page on account screen does not actually do so hahaha (backend fix)
- Cleaned up backend so it doesnt flood the log files with second-order or redundant calls
- Pictures show up on account page featured nodes
- Fixed bug where images would error and still show in the header of cards
- Cleaned repo
- Logging out no longer forces you to go to home page
- Added feedback capabilities on backend
- Changed colors, text, and position of buttons and divs to be more consistent/to look a bit better
- Changed "Owner" to "Author" on the front end on all pages
- Made it show the profile pic of the author when you are searching for a node as well as at the bottom of the page
- A lot of small visual changes to be a bit cleaner
- Temporarily removed story sized on frontend, for now it just returns everything in random order which is kind of fun
- Made liking/disliking not have to reload the page
- Made link switching and going back not have to reload the page
- The required fields in forms prevent from submitting again
- Fixed bug where warning info is not reset for modals
- Made all data reset whenever you open a modal
- Fixed bug where old nodes would return null pictureURLs
- Updated serverless
- Deleting a page takes you back one page now, instead of just back to the home page
- You can now search for pictures through the pixabay API
- You can no longer directly insert URLs for images, although you still have to input URL for a profile pic
- I'm not sure how I feel about only being able to use pixabay pictures, but it is safe for now
- You can now upload images when creating a brand new node
- Cleaned out unneccessary comments
- Cleaned out (some) React warnings

> Note: All changelogs before version 0.1.5 are approximated, as the changelog was not actually implemented until version 0.1.5

### Version 0.1.4

> Release Date: 7/13/20

- Pages can have pictures
- Accounts can have pictures
- Account picture shows up next to the name of the owner of suggestions and nodes
- Can view the account picture in detail from the account screen
- Page pictures of featured nodes show up on the home screen
- Put a create new node at the bottom of the home screen
- Moved edit account button to be above all pages
- Added ability to count size of the story
- You can click on pictures and they will tell you they are either cool or neat!
- Better Favicon that actually makes sense lol

### Version 0.1.3

> Release Date: 6/30/20

- Added the ability to look up nodes rather than needing them to be input by node ID
- Added account bios
- Added ability to feature nodes so that the home screen doesn't just show all possible nodes and accounts
- Moved delete account button to be within an edit modal that also allows you to edit the account bio
- Added a back button - much easier to navigate between nodes now
- Escaping text and bug fixing
- Centered all text on cards
- A Favicon!

### Version 0.1.2

> Release Date: 6/25/20

- Added a blue background
- Added the "Version" text
- Added Copyright text at bottom of screen
- Made backend a bit more secure
- Home screen sorts featured nodes (which is just all nodes rn) by views

### Version 0.1.1

> Release Date: 6/24/20

- Security checks on frontend, which allow it to actually act as a real system with accounts
- Bug fixes
- Ability to edit nodes and choices so that you don't have to delete them
- Hook nodes up to other nodes with choices by using node IDs, I'll change this later so that you can just search for the nodes by title or author

### Version 0.1.0

> Release Date: 6/23/20

- Initial Alpha release
- Database and backend up and running
