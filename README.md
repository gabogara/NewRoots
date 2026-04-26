# Web Development Final Project - *NewRoots*

Submitted by: **Gabriel Restrepo**

This web app: **NewRoots is a community forum designed for immigrants to ask questions, share experiences, and support each other while adapting to life in a new country. Users can create posts, interact through comments and upvotes, and explore discussions organized by tags such as Question, Advice, Experience, Resource, and Warning.**

Time spent: **19** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms allow users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Home feed displays all created posts
  - Each post shows:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post navigates to its detail page
- [x] **Users can view posts in different ways**
  - Users can sort posts by:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - Each post has a dedicated detail page showing:
    - content
    - image
    - comments
  - Users can leave comments
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:


- [x] Web app implements pseudo-authentication
  - Users must enter a secret key to edit or delete posts
  - Only the original creator (via secret key) can modify or delete content
- [x] Repost / Thread feature
  - Users can reference another post when creating a new one
  - Referenced post is displayed and linked in the detail page
- [x] Users can customize the interface
  - Users can switch between multiple themes (Warm, Green, Dark)
- [x] Users can add more characterics to their posts
  - Users can add video links
  - Users can assign tags (Question, Advice, Experience, Resource, Warning)
  - Users can filter posts by tag on the home feed

The following **additional** features are implemented:

- [x] Search, sort, and filter combined for better UX
- [x] Responsive layout using Flexbox
- [x] Dynamic referenced post selector instead of manual ID input

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/oyKlung.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/)

## Notes

Some challenges encountered while building the app:

- One of the main challenges was implementing pseudo-authentication using a secret key instead of a traditional authentication system. This required careful validation logic to ensure only the original creator could edit or delete posts and comments.

Another challenge was handling relational data with Supabase, especially when working with foreign key constraints for referenced posts. This led to improving the user experience by replacing manual ID input with a dynamic post selector.

## License

    Copyright [2026] [Gabriel Restrepo]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
