# Feature ideas

- Decide on a mature content filter and how to go about that
- A chart feature to view all connected nodes, this could blend well into the local history idea, since a massive chart displaying all potential nodes would be really bad
- Ability to Sort choices to be in order of best or worst
- Static header and Footer with contact information / patreon as well as advertisements
- Ability to Set/delete variables, either save them per user or save pass them from node to node, I feel like passing from node to node is cooler and easier to deal with but will be weird if a back tracking system is set up. This is a really cool idea in general and I definitely want to implement it eventually since this will give a shit ton of power to creators.
- Ability to hide Nodes instead of deleting them, i.e. make them private
- Notifications when someone adds a suggestion on your nodes
- Subscriptions
  - Maybe only subscribers can see certain content and they get notified whenever you make new content
- A better tutorial
  - Also consider forcing people to at least skim the tutorial to begin with
- I still don't love how the choices look
- Page colors are implemented but its not possible to edit them on the front end, I dont even know if I want them to be a thing anyways
- Owner catch phrases / Taglines?? Could be fun hahaha
- Ability Favorite pages and your favorites can show up on your account
- A general Search bar for pages
- A random page function
- Tests (lol) (but also honestly might be useful in the future)
- Ability to upload photos
- Hilight the text you're searching for in the searchpage tab

# Importante Things to fix

- On iPhone the go to page search bar goes off the side and you can’t scroll to read it **TEST**
- Pressing enter when a modal is open submits the form (which doesnt do anything at the moment but I need to either make it submit for real or figure out a way so that submitting doesnt reload the page)
- Figure out how to get it to show something if they have a script blocker
- Should go through and set all nodes pictureURLs to empty string so it doesnt crash at some point **TEST**
- Sometimes typing new things on the image search does not reload the image search
- If possible find a way to standardize the code base, because theres a lot of repeated code as is for each of them
  - for example you should never be able to escape in the shitty way lol
  - all buttons should use my overwritten palette
    - I can probably do this using css
  - THe modals are kinda a mess and resuse a lot of the same code

# Less Importante bugs / THings I should do but dont wanna rn

- Search for family friendly option when you are in unsafe mode
- The edit account things autofills username and password with google chrome, it shold probably be a separate modal
- It should be made clear that screen names and passwords are case sensitive
- Featuring a page shouldnt have to reload the whole window
- SHould be able to feature a page from the page itself, instead of having to do so from the account menu
- Consider database limitations
  - The search bar shouldn’t load everything at once
  - I’m not sure if total node views on accounts even matters, and the more nodes a person has the slower this will be
  - Story size doesnt work at the moment because it is too slow
  - They should probably be a limit on the size of the content and titles and account names
- Pictures should show what part of them will show or have some sort of indication that it is going to be a banner
  - Actually I wish there was a way to relayout all of it so that the pictures aren't so janky
- The picture is sometimes a little bit too tall on the creating new page screen
- Grayed out actions should have a tooltip that say why they're greyed out
- Image alt texts should be something significant
- Should put the API stuff in a env file instead of a private js file
- Make stuff not have to reload pages all the time in general
- Find out how to get it so titles show up properly when sending a link
- Fix the eslint stuff on both frontend and backend, its a bit of a hassle to not have it check for trivial things
- Dont let things get edited unless the contents have changed
- I dont love the flickering of the actions but it works for now

- Reporting a page only hides it if it is featured
- Can create non-reportative feedback
- Reporting should be done through a modal
- Hide API behind a key or osmething
- Easily remove hidden nodes and choices and whatnot - Admin panel/admin permissions maybe
- Cap the number of reports to like 5 per day per ip address
  - Or Figure out how to verify they're a human or something when reporting
  - I just feel like it will be too easy to report things and screw them up if reporting once gets them hidden into unsafe mode
