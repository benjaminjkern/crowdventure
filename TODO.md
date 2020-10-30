# Non-essential cool future features

1. Report choices and nodes that are inappropriate / mature content filter. A chart feature to view all connected nodes, this could blend well into the local history idea, since a massive chart displaying all potential nodes would be really bad
2. Ability to Sort choices to be in order of best or worst
3. Static header and Footer with contact information / patreon as well as advertisements
4. Ability to Set/delete variables, either save them per user or save pass them from node to node, I feel like passing from node to node is cooler and easier to deal with but will be weird if a back tracking system is set up. This is a really cool idea in general and I definitely want to implement it eventually since this will give a shit ton of power to creators.
5. Ability to hide Nodes instead of deleting them, i.e. make them private
6. Notifications when someone adds a suggestion on your nodes
7. Subscriptions - not sure how this will work at all or If I wanna do it
8. A better tutorial
9. I still don't love how the choices look
10. Page colors are implemented but its not possible to edit them on the front end, I dont even know if I want them to be a thing anyways
11. You should be able to upload photos or maybe search giphy library
    - Maybe if you dont put a picture in it does an auto search of the giphy library based on the title of the node
12. Maybe owner catch phrases / Taglines?? Could be fun hahaha

# Bugs / Unwanted features

1. Report button doesnt work
2. API isnt even blocked by an API Key or anything, that should be fixed before it gets too big but its fine for now
3. It should be made clear that screen names and passwords are case sensitive
4. Something I did while editing node deleted it - not sure what
5. On iPhone the go to page search bar goes off the side and you can’t scroll to read it
6. They should probably be a limit on the size of the content and titles
7. The search bar shouldn’t load everything at once
8. I’m not sure if total node views on accounts even matters, and the more nodes a person has the slower this will be
9. You can't edit your account screenname or password
10. There are tons of react warnings that should be fixed
11. There aren't tests
12. Story size doesnt work at the moment because it is too slow
13. Featuring a page shouldnt have to reload it
14. Pictures should show what part of them will show or have some sort of indication that it is going to be a banner
15. There should probably be a limit on the amount of photos people can upload so that it doesnt get overrun, not a huge deal for now though -- doesnt matter rn because you cant upload hehe
16. Oh my god there is a fucking react apollo I am so dumb I should switch to that
17. Pressing enter when a modal is open submits the form (which doesnt do anything at the moment but I need to either make it submit for real or figure out a way so that submitting doesnt reload the page)
18. The picture is a little bit too tall on the creating new page screen
19. Figure out how to get it to show something if they have a script blocker
20. Grayed out actions should have a tooltip that say why they're greyed out
21. Cannot upload photos
22. Should go through and set all nodes pictureURLs to empty string so it doesnt crash at some point
23. I should absolutely reconcile a lot of the code so its not being repeated
24. I think sometimes deleting nodes takes you to the account screen when it hsould take you to home... not sure whats up with it
25. There should be a little image loading thing but I didnt wanna deal with it
26. Image alt texts should be something significant
27. Should put the API stuff in a env file instead of a private js file
28. The titles being done per page was so that I could send a link and it would show up, not so that I cold send a link and have it not show up
29. When going to an account that doesnt exist it should say that it doesnt exist
30. Going forward or back should scroll to top of page or something, it looks weird at the moment
31. Still some bugs with picking the images
32. Deleting from database didnt delete from database
33. Figure out how to make the image api safer
