# The Office Memory Game Project

## Project Overview

This project is a memory game built with React, inspired by The Office TV show. It's powered by the [TheOfficeAPI](https://github.com/marceloalves/the-office-api-site) for character data and [Giphy](https://giphy.com) for animated images. The primary goal was to enhance my skills in creating modular components, managing application state, and effectively using async functions alongside the useEffect hook.

## Key Features and Implementation

### Modular Components and State Management

- **Modular Components:** Created separate, reusable components.
- **State Management:** Used React's State to keep track of game status and cards, ensuring a seamless and dynamic user experience.

### useEffect, API Integration, and Conditional Rendering

- **API Integration:** Utilized the [TheOfficeAPI](https://github.com/marceloalves/the-office-api-site) to fetch character data, combined with [Giphy](https://giphy.com) to source animated images, enhancing the game's visual appeal.
- **useEffect Hook:** Leveraged useEffect for side effects such as fetching characters and Giphy images, and handling game logic based on state changes.
- **Conditional Rendering:** Implemented conditional rendering to update the UI based on game status, providing feedback to the user and guiding them through the game.

### Game Logic and Handling User Interaction

- **Game Logic:** Developed logic to determine if a card has been clicked before, updating the state accordingly and handling win/lose conditions. Focused on minimizing unnecessary state hooks and utilizing available state/props to determine information.
- **User Interaction:** Ensured smooth user interactions with responsive click handlers and real-time feedback, enhancing the overall gameplay experience.

## Lessons Learned and Future Improvements

- **State and Side Effects:** Gained a deeper understanding of managing state and side effects in React applications, particularly with useEffect and async functions.
- **API and Async Functions:** Improved my skills in integrating third-party APIs and handling asynchronous data fetching.
- **Modular Component Design:** Reinforced the importance of designing modular components for better code reusability and maintainability.
- **Improved Game Mechanics:** Future improvements could include adding difficulty levels, enhancing animations, optimizing performance, and leveraging additional endpoints from [TheOfficeAPI](https://github.com/marceloalves/the-office-api-site) for a richer game experience.

## Deploy

This project is available at [Vercel](https://odin-memory-game-sigma.vercel.app/)
