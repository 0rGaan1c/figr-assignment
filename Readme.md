# Figr Assignment

## Initial Process

- I started the assignment by thoroughly understanding the problem statement, because I think a good understanding of the problem is necessary before we even try to solve it.
- After reading the problem statement, I had some doubts, which I clarified before proceeding.
- I then spent some time thinking about the overall approach, including how the entire app would function, the database design, possible pages, and the client-side components. This helps me to create a mental model in my mind, a sort of rough walkthrough of the whole web app, this is a step I always follow while working on something and it helps me a lot.
- After that, I decided to create a simple UI in Excalidraw so that I could have a layout of the whole web app and not spend time deciding how the pages would look while coding.

## Tech Stack

MERN (with JavaScript)

- Due to time constraints, I decided to proceed with JavaScript instead of TypeScript, since the main focus was on the implementation and functionality of the web app. Otherwise, I would have used TypeScript.

## Some Design Choices & Possible Future Improvements

- **Authentication:** I implemented a JWT-based authentication system. The current implementation performs the bare minimum required for user authentication, which I think is sufficient for this assignment. Currently, the API sends back an access token to the user, which is stored in a cookie. This approach can be improved and made much more robust.
- **Web App Access:** For simplicity's sake, the web app is only accessed after the user logs in. I recently found a great blog post by Kent C. Dodds, which discusses authentication strategies in React applications ([Authentication in React Applications](https://kentcdodds.com/blog/authentication-in-react-applications)). Here are some key takeaways:

  - We simply do this: `return user ? <AuthenticatedApp /> : <UnauthenticatedApp />`.
  - I will quote the blog here: "Rather than trying to do something fancy to redirect the user when they happen to land on a page that they're not supposed to, instead, you don't render that stuff at all." :D
  - While this model secures the app content, I think an ideal implementation would also allow users to explore and interact with project creation and color/component customization without creating an account.

- **For Radius and Spacing:** I stored only the base size values for these attributes in the database and wrote a custom function on the client side to generate variables (like xs, s, m, etc.) using the base size values. The variables are not stored or updated; only the values of the base size (and multiplier, in the case of the radius) are persisted.
- **Autosave:** I implemented a basic autosave feature that saves the data in the database at 10-second intervals. The implementation of this feature can be improved. One thing we can do to enhance it is to check the previous state and only update if there have been changes in the last 10 seconds.
- **Manual Save:** There is also a button which users can use to manually save the project data, the web app also stops users from accidentally closing the tab or the web browser by showing a dialog.
- **Components:** The components, such as buttons, are generated using a custom function I wrote, which loops through the colors array and uses the base size as spacing and border-radius to generate styles for the components. There is also a feature to change various styles of these components in the UI, although these changes are not stored in the database.
- **Storybook:** I explored Storybook; it’s intriguing, but due to time constraints and unfamiliarity, I decided not to integrate it into the web app. But it’s something that I will be diving into and learning more about and will implement in the assignment itself after it’s evaluated.
