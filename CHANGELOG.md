# Crowdventure Changelog

# 1.0 - Giant overhaul

- Switched full stack to Typescript & added tons of eslint rules to make sure everything is clean and good
- Overhauled the structure of all the code to be a lot more streamlined, less repeaty, and overall cleaner
  - Made sure no dumb calls are being made
    - Loading a whole table into the frontend and then sorting rather than filtering and paginating on backend
      - I was doing this for likes / dislikes, searching for choices, and on the account page and it was slowing everything down
  - Accounts are called accounts, nodes are called nodes, and choices are called choices
  - Got rid of things I wasn't using or weren't fully fleshed out yet (I want to add these back in later but I didn't need them in rn)
    - Send message
    - Report nodes / accounts / choices
    - Fgcolor / bgcolor of nodes
    - Recently updated nodes on home page
    - Search for nodes in account page
    - Go to random page on home page
- Frontend
  - Switched frontend to NextJS so it's smoother
  - Got rid of bootstrap in favor of custom css so I have more control over making stuff consistent and looking nice
  - Made the node screen a little nicer
    - Image shows to the left in desktop mode instead of being stretched on top
    - Merged canon & noncanon choices
- Backend
  - Switched backend to Express Zod API so I can have more control over the db calls that are made and the data that is returned
  - Made sure passwords are actually being encrypted (lol)
  - Switched database to postgres so I can make the data more structured (Also dynamodb kinda sucked anyways)
  - Made datecreated and updated at into dates
  - Added ids to everything instead of using slugs to refer to everything

# 0.2 - Beta / Streamlining and bug fixing

## Version 0.2.0

> Release Date: 6/3/21

- I'm using a real domain now! (https://crowdventure.me/)
- Made frontend a bit less cluttered and more optimized for different screen sizes (Mobile users)
  - Stuff doesnt go off the screen quite as often
  - Profile pic is bigger and centered
  - Unsafe mode can be accessed any time (As long as you are logged in)
- Notification system
  - You get notified whenever someone adds to the story of your page, likes / dislikes your page, or edits something you own
  - You can also send messages to people (Right now they are literally just notifications)
- Front page has a section for newly updated pages as well as featured pages
  - Featured is still just a random selection of top-level nodes, while newly updated is literally every new / updated page that comes through
  - In the future i would like this to be:
    - Featured pages = algorithmically decided based on recent activity
    - Recently updated = in order of most recently added / updated of only top-level nodes
- A random page button
  - Again, right now this goes to any page but I want it to be able to only go to top-level nodes
    - The infrastructure is in at the moment, there just aren't enough top-level nodes for this to be interesting at the moment lol
- Image search
  - In unsafe mode, choosing pictures allows you to see blurred pictures by hovering over them, also they have a tool tip explaining why they are blurred
  - Can no longer choose an image that doesn't actually exist (Sometimes the thumbnails would show up but the actual image url didn't work)
- Pages with blurred images won't show up at all unless you are in unsafe mode
  - Before: a page could be considered safe but have an unsafe image
    - This probably can be reconciled a bit on the backend but it works
- Pages, choices, and accounts now track when they were created
- Pagination and corralling of some stray async functions that were slowing things down and causing a ruckus
- Ability to find parents of any node (on backend, will use this later)
  - Used for now to update pages
  - Will be used later to start from any point and track both up and down the tree
- Bug fixs
- Changed this changelog to be a bit more organized, lol

# 0.1 - Alpha / Proof of concept

## Version 0.1.7

> Release Date: 12/1/20

#### TLDR:

- Nodes, choices, and accounts can now be reported and hidden, to be visible only if you are in unsafe mode.
- You can get to unsafe mode if you have an account and you agree to the terms of service, simply stating we are not responsible for the hidden content.
- Unsafe mode has a cool dark color!
- A good amount of Aesthetic changes! I like how it looks even more now
- A good amount of quality of life changes for both the user and the programmer (me)!

#### Full List of changes:

- Nodes and choices can be hidden
- If a node or choice is unchecked, anyone reporting a node automatically hides it, otherwise it just sends a feedback for review
- I can remove all feedback, with optional filters
- Cleanup backend into different files for each type of resolver
- Moved log out button to not be in the edit account page
- Changed buttons within modals to match the light blue of crowdventure
- Cleanup frontend into different folders and files based on screens and frequently reused elements such as modals and node views
- Can delete nodes from account page
- Fixed a backend bug with editing suggested choices
- Can no longer edit a suggestion that has been made canon by the owner
- A featured page now says "This page has been starred by (Account name)" as a tooltip
- If you own a page that is hidden, it shows, and says that it was marked as unsafe
- Unsafe mode acts as kind of a dark mode and I like how it looks
- Unless you are logged in on the frontend and set to "Unsafe mode", you cannot view hidden nodes, choices, and accounts
- Going from node to node scrolls you back to top of page
- Can report nodes and choices
- When a page throws an error, it shows in the title of the page
- Accounts can be reported and hidden, which hides all nodes and choices they created, it does not hide the choices they have liked and nodes they have viewed though.
- Can report accounts
- Ability to Report a page that you are on
- Change your password or screen name from account page
- Fixed a bug where you could log in sometimes with the wrong password lol
- Changed default font to be arial rounded cuz its neat and feels a bit more adventure/childlike
- Added a neat glow around each card
- Shows a modal and a license agreement when switching to unsafe mode
- On the account page, it now shows only featured nodes and then it allows you to search for nodes authored by a particular user
- Lewd images are blurred, unless you really wanna see them
- Choices and other options texts are smaller and greyed a little
- Accounts can be admins
- Admins can edit all nodes and choices and accounts, as well as hide and unhide nodes, accounts, and choices, and make other accounts admins
- Nodes and choices will be automatically flagged if they contain certain bad words
- Changed the background color of normal mode very slightly

## Version 0.1.6

> Release date: 9/16/20

- I can disable the backend whenever I want
- Switched from Pixabay to Bing images because Pixabay is lame and the images only stay alive for 24 hours (I hope bing does the same), also Pixabay images are lame anyways
- Images in search bar display as blurry if bing tagged them as "not family friendly", right now it still just lets you select them though
- Added date created for nodes, choices, and accounts. If created before September 16, 2020, then they just get put as "Before September 16, 2020"

## Version 0.1.5

> Release Date: 7/31/20

#### TLDR:

- Pictures are done through Pixabay now, meaning you don't have to go find a URL for each image!
- Switching between pages is a lot faster and smoother now!
- Lots of aesthetic changes to be a little bit more intuitive and consistent!
- Bug fixes that should've been done long ago!
- This Changelog is now public!

#### Full list of changes:

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

## Version 0.1.4

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
- Titles are done per page now

## Version 0.1.3

> Release Date: 6/30/20

- Added the ability to look up nodes rather than needing them to be input by node ID
- Added account bios
- Added ability to feature nodes so that the home screen doesn't just show all possible nodes and accounts
- Moved delete account button to be within an edit modal that also allows you to edit the account bio
- Added a back button - much easier to navigate between nodes now
- Escaping text and bug fixing
- Centered all text on cards
- A Favicon!

## Version 0.1.2

> Release Date: 6/25/20

- Added a blue background
- Added the "Version" text
- Added Copyright text at bottom of screen
- Made backend a bit more secure
- Home screen sorts featured nodes (which is just all nodes rn) by views

## Version 0.1.1

> Release Date: 6/24/20

- Security checks on frontend, which allow it to actually act as a real system with accounts
- Bug fixes
- Ability to edit nodes and choices so that you don't have to delete them
- Hook nodes up to other nodes with choices by using node IDs, I'll change this later so that you can just search for the nodes by title or author

## Version 0.1.0

> Release Date: 6/23/20

- Initial Alpha release
- Database and backend up and running
