# AliBaba Code Challenge (Where in the world)

This repositry relates to the AliBaba company code challenge before the interview.

You can visit the online deployed site here:


[Online Deployed Version](https://alibaba-code-challenge.vercel.app/).


I tried to do the best practices of React on the codebase and generate clean, readable, reusable and maintainable codes. Also I tried to avoid using and 3rd party library as more as possible. For example I styled elements using pure scss and not UI libraries such as AntDesign, Material UI and ... .


## Implemented features

### All main and normal features are implemented.

## Implemented bonuses

These are the bonuses that I did on my project:

* Toggle the color scheme between light and dark mode without using any 3rd party libraries
* Searching using the keywords Grmany or Grmny should also work
* Add sort functionality for both Population and Country Name
* Make sure styles are loaded whenever they're really needed. e.g., The styles for the details page don't load on the homepage
* Make sure the ratio for the country flags is 4:3 or any other ratio you find suitable
* Add unit tests for components
* Store the filters in the URL query strings and sync it with the component filter object
* Add lazy loading for country images


## Tests
All the components have their own tests. Tests are writen using Jest and ReactTestingLibray. You can run tests using `npm run test` command.

## Server Side Rendering
We haven't any SSR in this project, because I implemented this project using React and its a library that is focused on CSR not SSR. I considered that the project should be implemented with exactly the same mentioned technologies (ReactJS / VueJS) so I didn't use NextJS to implementing SSR, But I'm fimilar and experienced in SSG, SSR and ISR. 