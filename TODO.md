# Non-essential cool future features

1. Report choices and nodes that are inappropriate / mature content filter4. A chart feature to view all connected nodes, this could blend well into the local history idea, since a massive chart displaying all potential nodes would be really bad
2. Ability to Sort choices to be in order of best or worst
3. Static header and Footer with contact information / patreon as well as advertisements
4. Ability to Set/delete variables, either save them per user or save pass them from node to node, I feel like passing from node to node is cooler and easier to deal with but will be weird if a back tracking system is set up. This is a really cool idea in general and I definitely want to implement it eventually since this will give a shit ton of power to creators.
5. Ability to hide Nodes instead of deleting them, i.e. make them private
6. Notifications when someone adds a suggestion on your nodes
7. Subscriptions - not sure how this will work at all or If I wanna do it
8. A better tutorial
9. The actions taken should really not have to reload the page every single time, it would be better if they just edited the page only reloaded when they need to
10. I still don't love how the choices look
11. I wish the button colors were slightly brighter or like more appealing
12. Page colors are implemented but its not possible to edit them on the front end, I dont even know if I want them to be a thing anyways
13. You should be able to upload photos or maybe search giphy library
    - Maybe if you dont put a picture in it does an auto search of the giphy library based on the title of the node

# Bugs / Unwanted features

1. Report button doesnt work
2. API isnt even blocked by an API Key or anything, that should be fixed before it gets too big but its fine for now
3. It should be made clear that screen names and passwords are case sensitive
4. The required validations dont work anymore since the forms arent submitting
5. Something I did while editing node deleted it - not sure what
6. When creating a new node that stems from a node that was created before pictures were implemented, the picture returns as null instead of empty - backend fix
7. Editing the picture field doesn’t get rid of the “picture not found” field
8. On iPhone the go to page search bar goes off the side and you can’t scroll
9. They should probably be a limit on the size of the content and titles
10. The search bar shouldn’t load everything at once
11. I’m not sure if total node views on accounts even matters
12. You can't edit your account screenname or password
13. It's a little slow to load home page because its doing a database filter every time
14. There are tons of react warnings, and a few github security warnings that should probably be fixed
15. There aren't really tests
