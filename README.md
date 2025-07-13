# Canvas Editor

A simple web-based canvas editor for creating and animating rectangular shapes.

- Interactive Canvas: Click-to-add rectangles with random properties
- Shape Animation: 360° rotation animations with custom duration
- Project Management: Export and import scene data as JSON
- Responsive Design: Adapts to window resizing
- Color Interaction: Click shapes to change their color randomly

## How to Use

### Adding Shapes

1. Click the "Add Rectangle" button to create a new rectangle
2. Each rectangle appears with random position, rotation, dimensions, and color
3. Rectangles can overlap and will use the full canvas space

### Animating Shapes

1. Enter a duration in seconds in the "Duration" field
2. Click "Play" to rotate all shapes 360° clockwise around their centers
3. Animation respects the specified duration

### Project Management

- Export: Click "Download .json" to save the current scene as a JSON file
- Import: Click "Upload .json" to load a previously exported project

### Canvas Interaction

- Click any shape on the canvas to change its color to a random new color
- The canvas is should be fully responsive and adjust to window resizing

## Technical Details

- Built with HTML5 Canvas API, React 19 and Typescript
- Responsive viewport split between canvas and control panel
- Persistence between page reloads (stores scene in localStorage)

### How to run

- `clone` repository and `cd` into `jitter-test`-dir
- run `yarn` to install packages and `yarn run dev` to start the program
- there are some unit-test that can be run with `yarn test`
